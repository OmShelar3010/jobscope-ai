export const runtime = "nodejs"

import { NextResponse } from "next/server"
import mammoth from "mammoth"
import PDFParser from "pdf2json"
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// ─── PDF Parsing ───────────────────────────────────────────────────────────
async function extractPdfText(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser(null, true)

    parser.on("pdfParser_dataReady", () => {
      try {
        const text = (parser as any).getRawTextContent()
        resolve(text)
      } catch {
        reject(new Error("Failed to extract PDF text"))
      }
    })

    parser.on("pdfParser_dataError", (err: any) => {
      reject(new Error(`PDF parse error: ${err?.parserError ?? err}`))
    })

    parser.parseBuffer(buffer)
  })
}

// ─── Skill keyword matching ────────────────────────────────────────────────
const skillCategories: Record<string, string[]> = {
  frontend: ["react", "nextjs", "vue", "angular", "html", "css", "tailwind"],
  backend: ["node", "express", "django", "spring", "php"],
  database: ["mongodb", "mysql", "postgresql", "sql"],
  devops: ["docker", "aws", "kubernetes", "ci/cd"],
  languages: ["python", "java", "c++", "javascript", "typescript"],
}

const skillAliases: Record<string, string[]> = {
  javascript: ["js"],
  typescript: ["ts"],
  postgresql: ["postgres", "pg"],
  node: ["nodejs", "node.js"],
  nextjs: ["next.js"],
  "c++": ["cpp"],
}

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function matchesSkill(text: string, skill: string): boolean {
  const patterns = [skill, ...(skillAliases[skill] ?? [])]
  return patterns.some((p) =>
    new RegExp(`\\b${escapeRegex(p)}\\b`, "i").test(text)
  )
}

function runKeywordAnalysis(text: string) {
  const foundSkills: string[] = []
  const missingSkills: string[] = []
  const categoryScores: Record<string, number> = {}

  for (const [category, skills] of Object.entries(skillCategories)) {
    const found = skills.filter((s) => matchesSkill(text, s))
    categoryScores[category] = Math.round((found.length / skills.length) * 100)
    foundSkills.push(...found)
    missingSkills.push(...skills.filter((s) => !found.includes(s)))
  }

  return { foundSkills, missingSkills, categoryScores }
}

// ─── Groq AI Analysis ─────────────────────────────────────────────────────
interface AiAnalysis {
  overallScore: number
  jobMatchPercent: number
  strengths: string[]
  suggestions: string[]
  missingKeywords: string[]
  tone: string
  summary: string
}

async function analyzeWithGroq(
  resumeText: string,
  jobDescription: string | null
): Promise<AiAnalysis> {
  const jobSection = jobDescription
    ? `Job Description:\n"""\n${jobDescription.slice(0, 2000)}\n"""\n`
    : "No job description was provided.\n"

  const prompt = `You are an expert ATS (Applicant Tracking System) and career coach.

Analyze the resume below against the job description (if provided) and return a JSON object — no markdown, no explanation, just raw JSON.

${jobSection}
Resume:
"""
${resumeText.slice(0, 4000)}
"""

Return this exact JSON shape:
{
  "overallScore": <integer 0-100, honest ATS-readiness score>,
  "jobMatchPercent": <integer 0-100, how well the resume matches the job description; 0 if no JD provided>,
  "strengths": [<up to 4 short bullet strings highlighting what the resume does well>],
  "suggestions": [<up to 5 actionable improvement tips, be specific>],
  "missingKeywords": [<keywords from the JD not found in the resume; empty array if no JD>],
  "tone": "<one of: Professional | Semi-professional | Too casual | Too verbose | Lacks detail>",
  "summary": "<2-sentence plain-English summary of the candidate's profile>"
}

Scoring guide:
- 80-100: Strong resume, well-structured, quantified achievements, good keyword alignment
- 60-79: Decent but missing quantification or some key skills
- 40-59: Needs significant improvement in structure or content
- 0-39: Major gaps, too short, or very poor formatting`

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  })

  const raw = (completion.choices[0]?.message?.content ?? "")
    .replace(/```json|```/g, "")
    .trim()

  return JSON.parse(raw) as AiAnalysis
}

// ─── Final score blending ──────────────────────────────────────────────────
function blendScores(
  aiScore: number,
  categoryScores: Record<string, number>,
  hasNumbers: boolean,
  hasSections: boolean
): number {
  const avgCategory =
    Object.values(categoryScores).reduce((a, b) => a + b, 0) /
    Object.keys(categoryScores).length

  let score = aiScore * 0.6
  score += avgCategory * 0.25
  score += hasNumbers ? 10 : 0
  score += hasSections ? 5 : 0

  return Math.min(100, Math.round(score))
}

// ─── Route Handler ─────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")
    const jobDescription = formData.get("jobDescription")

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let text = ""

    if (file.type === "application/pdf") {
      text = await extractPdfText(buffer)
    } else {
      const data = await mammoth.extractRawText({ buffer })
      text = data.value ?? ""
    }

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract readable text from the file." },
        { status: 422 }
      )
    }

    const jd =
      typeof jobDescription === "string" && jobDescription.length > 0
        ? jobDescription
        : null

    const [keywordResult, aiAnalysis] = await Promise.all([
      Promise.resolve(runKeywordAnalysis(text)),
      analyzeWithGroq(text, jd),
    ])

    const hasNumbers = /\d+/.test(text)
    const hasSections =
      /\beducation\b/i.test(text) ||
      /\bexperience\b/i.test(text) ||
      /\bproject/i.test(text)

    const finalScore = blendScores(
      aiAnalysis.overallScore,
      keywordResult.categoryScores,
      hasNumbers,
      hasSections
    )

    const allMissing = Array.from(
      new Set([...keywordResult.missingSkills, ...aiAnalysis.missingKeywords])
    )

    return NextResponse.json({
      score: finalScore,
      categoryScores: keywordResult.categoryScores,
      foundSkills: keywordResult.foundSkills,
      missingSkills: allMissing,
      suggestions: aiAnalysis.suggestions,
      jobMatchPercent: aiAnalysis.jobMatchPercent,
      strengths: aiAnalysis.strengths,
      tone: aiAnalysis.tone,
      summary: aiAnalysis.summary,
      aiScore: aiAnalysis.overallScore,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}