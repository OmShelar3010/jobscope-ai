"use client"

import { useState } from "react"

export default function ResumePage() {
    const [file, setFile] = useState<File | null>(null)
    const [jobDescription, setJobDescription] = useState("")
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handleAnalyze = async () => {
        if (!file) return

        setLoading(true)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("jobDescription", jobDescription)

        const res = await fetch("/api/analyze-resume", {
            method: "POST",
            body: formData,
        })

        const data = await res.json()
        setResult(data)
        setLoading(false)
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Resume Analyzer</h1>

            {/* Upload */}
            <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4"
            />

            {/* Job Description */}
            <textarea
                placeholder="Paste Job Description (optional but recommended)"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full border p-3 rounded mb-4"
                rows={4}
            />

            <button
                onClick={handleAnalyze}
                className="px-6 py-2 bg-primary text-white rounded"
            >
                {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

            {/* Results */}
            {result && (
                <div className="mt-8 space-y-6">

                    <div className="text-2xl font-semibold">
                        ATS Score: {result.score}%
                    </div>

                    {/* Skill Category Percentage */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Skill Category Coverage
                        </h2>
                        {Object.entries(result.categoryScores || {}).map(
                            ([category, value]: any) => (
                                <div key={category} className="mb-2">
                                    <p className="capitalize">{category}</p>
                                    <div className="w-full bg-gray-200 h-3 rounded">
                                        <div
                                            className="bg-primary h-3 rounded"
                                            style={{ width: `${value}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* Missing Skills */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Missing Skills
                        </h2>
                        <ul className="list-disc ml-6">
                            {result.missingSkills?.map(
                                (skill: string, i: number) => (
                                    <li key={i}>{skill}</li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Suggestions */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Improvement Suggestions
                        </h2>
                        <ul className="list-disc ml-6">
                            {result.suggestions?.map(
                                (tip: string, i: number) => (
                                    <li key={i}>{tip}</li>
                                )
                            )}
                        </ul>
                    </div>

                </div>
            )}
        </div>
    )
}
