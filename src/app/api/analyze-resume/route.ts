export const runtime = "nodejs";

import { NextResponse } from "next/server"
import pdf from "pdf-parse"
import mammoth from "mammoth"
import stringSimilarity from "string-similarity"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const jobDescription = formData.get("jobDescription") as string

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let text = ""

    if (file.type === "application/pdf") {
      const data = await pdf(buffer)
      text = data.text
    } else {
      const data = await mammoth.extractRawText({ buffer })
      text = data.value
    }

    const lowerText = text.toLowerCase()

    // 🔥 SKILL CATEGORIES
    const skillCategories = {
      frontend: ["react", "nextjs", "vue", "angular", "html", "css", "tailwind"],
      backend: ["node", "express", "django", "spring", "php"],
      database: ["mongodb", "mysql", "postgresql", "sql"],
      devops: ["docker", "aws", "kubernetes", "ci/cd"],
      languages: ["python", "java", "c++", "javascript", "typescript"],
    }

    let foundSkills: string[] = []
    let missingSkills: string[] = []
    let categoryScores: any = {}

    Object.entries(skillCategories).forEach(([category, skills]) => {
      const found = skills.filter(skill => lowerText.includes(skill))
      const percent = Math.round((found.length / skills.length) * 100)

      categoryScores[category] = percent

      foundSkills.push(...found)
      missingSkills.push(...skills.filter(s => !found.includes(s)))
    })

    // 🔥 SECTION CHECK
    const hasEducation = lowerText.includes("education")
    const hasExperience = lowerText.includes("experience")
    const hasProjects = lowerText.includes("project")

    // 🔥 ACHIEVEMENTS (numbers detection)
    const hasNumbers = /\d+/.test(text)

    // 🔥 JOB MATCH %
    let jobMatchPercent = 0
    if (jobDescription) {
      jobMatchPercent = Math.round(
        stringSimilarity.compareTwoStrings(
          lowerText,
          jobDescription.toLowerCase()
        ) * 100
      )
    }

    // 🔥 ATS SCORE CALCULATION
    let score = 0

    const averageCategoryScore =
      Object.values(categoryScores).reduce(
        (a: number, b: any) => a + b,
        0
      ) / Object.keys(categoryScores).length

    score += averageCategoryScore * 0.5 // 50%
    if (hasNumbers) score += 15
    if (hasEducation) score += 5
    if (hasExperience) score += 5
    if (hasProjects) score += 5
    score += jobMatchPercent * 0.2 // 20%

    score = Math.min(100, Math.round(score))

    // 🔥 SUGGESTION ENGINE
    const suggestions: string[] = []

    if (!hasNumbers)
      suggestions.push("Add measurable achievements with numbers (%, users, revenue, etc).")

    if (!hasProjects)
      suggestions.push("Include a dedicated Projects section.")

    if (jobMatchPercent < 50 && jobDescription)
      suggestions.push("Improve skill alignment with job description keywords.")

    if (averageCategoryScore < 40)
      suggestions.push("Add more relevant technical skills.")

    if (text.length < 600)
      suggestions.push("Resume content is too short. Add more detailed experience.")

    return NextResponse.json({
      score,
      categoryScores,
      missingSkills,
      suggestions,
      jobMatchPercent
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
