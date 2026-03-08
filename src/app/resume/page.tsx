"use client"

import { useState } from "react"

const toneColors: Record<string, string> = {
    "Professional": "bg-green-100 text-green-800 border-green-300",
    "Semi-professional": "bg-blue-100 text-blue-800 border-blue-300",
    "Too casual": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "Too verbose": "bg-orange-100 text-orange-800 border-orange-300",
    "Lacks detail": "bg-red-100 text-red-800 border-red-300",
}

export default function ResumePage() {
    const [file, setFile] = useState<File | null>(null)
    const [jobDescription, setJobDescription] = useState("")
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handleAnalyze = async () => {
        if (!file) {
            alert("Please upload your resume first.")
            return
        }

        setLoading(true)
        setResult(null)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("jobDescription", jobDescription)

        try {
            const res = await fetch("/api/analyze-resume", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Failed to analyze resume")

            const data = await res.json()
            setResult(data)

            if (data?.score !== undefined) {
                localStorage.setItem("atsScore", data.score.toString())
            }
        } catch (error) {
            console.error(error)
            alert("Something went wrong. Check console.")
        } finally {
            setLoading(false)
        }
    }

    const scoreColor =
        result?.score >= 75
            ? "text-green-600"
            : result?.score >= 50
                ? "text-yellow-500"
                : "text-red-500"

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Resume Analyzer</h1>

            {/* File Upload */}
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
                className="w-full border p-3 rounded mb-6"
                rows={4}
            />

            {/* Analyze Button */}
            <button
                onClick={handleAnalyze}
                disabled={!file || loading}
                className={`px-8 py-3 rounded font-semibold transition
          ${!file || loading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
                {loading ? "Analyzing..." : "Start Analysis"}
            </button>

            {/* RESULTS */}
            {result && (
                <div className="mt-10 space-y-6">

                    {/* ── Score Row ───────────────────────────────────── */}
                    <div className="flex flex-wrap gap-6 items-center">
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wide">ATS Score</p>
                            <p className={`text-4xl font-bold ${scoreColor}`}>{result.score}%</p>
                        </div>

                        {result.jobMatchPercent > 0 && (
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Job Match</p>
                                <p className="text-4xl font-bold text-blue-600">{result.jobMatchPercent}%</p>
                            </div>
                        )}

                        {result.tone && (
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Tone</p>
                                <span className={`px-3 py-1 rounded-full border text-sm font-medium ${toneColors[result.tone] ?? "bg-gray-100 text-gray-700 border-gray-300"}`}>
                                    {result.tone}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* ── AI Summary ──────────────────────────────────── */}
                    {result.summary && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-1">
                                Candidate Summary
                            </h2>
                            <p className="text-gray-700">{result.summary}</p>
                        </div>
                    )}

                    {/* ── Strengths ───────────────────────────────────── */}
                    {result.strengths?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">✅ Strengths</h2>
                            <ul className="space-y-2">
                                {result.strengths.map((s: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-1 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">{s}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* ── Skill Category Coverage ─────────────────────── */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Skill Category Coverage</h2>
                        {Object.entries(result.categoryScores || {}).map(
                            ([category, value]: any) => (
                                <div key={category} className="mb-3">
                                    <div className="flex justify-between mb-1">
                                        <p className="capitalize text-sm">{category}</p>
                                        <p className="text-sm text-gray-500">{value}%</p>
                                    </div>
                                    <div className="w-full bg-gray-200 h-3 rounded">
                                        <div
                                            className={`h-3 rounded transition-all ${value >= 70 ? "bg-green-500" :
                                                value >= 40 ? "bg-yellow-400" : "bg-red-400"
                                                }`}
                                            style={{ width: `${value}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* ── Missing Skills ──────────────────────────────── */}
                    {result.missingSkills?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">❌ Missing Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {result.missingSkills.map((skill: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-red-50 border border-red-200 text-red-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Suggestions ─────────────────────────────────── */}
                    {result.suggestions?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">💡 Improvement Suggestions</h2>
                            <ul className="space-y-2">
                                {result.suggestions.map((tip: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-yellow-500 mt-0.5">→</span>
                                        <span className="text-gray-700">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            )}
        </div>
    )
}