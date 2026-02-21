export const runtime = "nodejs"

import { NextResponse } from "next/server"
import mammoth from "mammoth"
import PDFParser from "pdf2json"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")
    const jobDescription = formData.get("jobDescription")

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let text = ""

    if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer()
      text = Buffer.from(arrayBuffer).toString("utf8")
    } else {
      const data = await mammoth.extractRawText({ buffer })
      text = data.value || ""
    }
    console.log("Extracted text length:", text.length)
    console.log("Extracted text preview:", text.slice(0, 300))
    // 🔥 keep your existing analysis logic below

    const cleanText = text.toLowerCase()

    // ✅ Skill Categories
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
      "c++": ["cpp"]
    }
    function escapeRegex(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    }
    const matchesSkill = (skill: string): boolean => {
      const patterns = [skill, ...(skillAliases[skill] || [])]

      return patterns.some((pattern) => {
        const safePattern = escapeRegex(pattern)
        return new RegExp(`\\b${safePattern}\\b`, "i").test(text)
      })
    }

    const foundSkills: string[] = []
    const missingSkills: string[] = []
    const categoryScores: Record<string, number> = {}

    Object.entries(skillCategories).forEach(([category, skills]) => {
      const found = skills.filter((skill) => matchesSkill(skill))
      const percent = Math.round((found.length / skills.length) * 100)

      categoryScores[category] = percent
      foundSkills.push(...found)
      missingSkills.push(...skills.filter((s) => !found.includes(s)))
    })

    // ✅ Section detection
    const hasEducation = /\beducation\b/i.test(text)
    const hasExperience = /\bexperience\b/i.test(text)
    const hasProjects = /\bproject\b/i.test(text)
    const hasNumbers = /\d+/.test(text)

    // ✅ Job Matching
    let jobMatchPercent = 0

    if (typeof jobDescription === "string" && jobDescription.length > 0) {
      const jobWords = jobDescription
        .toLowerCase()
        .split(/\W+/)
        .filter((word) => word.length > 3)

      const resumeWords = cleanText.split(/\W+/)

      const matched = jobWords.filter((word) =>
        resumeWords.includes(word)
      )

      jobMatchPercent =
        jobWords.length > 0
          ? Math.round((matched.length / jobWords.length) * 100)
          : 0
    }

    // ✅ ATS Scoring
    let score = 0

    const averageCategoryScore =
      Object.values(categoryScores).reduce((a, b) => a + b, 0) /
      Object.keys(categoryScores).length

    score += averageCategoryScore * 0.4
    score += jobMatchPercent * 0.3

    let sectionScore = 0
    if (hasEducation) sectionScore += 5
    if (hasExperience) sectionScore += 5
    if (hasProjects) sectionScore += 5
    score += sectionScore

    if (hasNumbers) score += 15

    score = Math.min(100, Math.round(score))

    const suggestions: string[] = []

    if (!hasNumbers)
      suggestions.push("Add measurable achievements with numbers.")

    if (!hasProjects)
      suggestions.push("Include a Projects section.")

    if (jobMatchPercent < 50 && jobDescription)
      suggestions.push("Improve alignment with job description.")

    if (averageCategoryScore < 40)
      suggestions.push("Add more relevant technical skills.")

    if (text.length < 600)
      suggestions.push("Resume content is too short.")

    return NextResponse.json({
      score,
      categoryScores,
      foundSkills,
      missingSkills,
      suggestions,
      jobMatchPercent
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    )
  }
}