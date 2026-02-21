"use client"

import { useState } from "react"

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

            if (!res.ok) {
                throw new Error("Failed to analyze resume")
            }

            const data = await res.json()
            setResult(data)

            // ✅ SAVE ATS SCORE FOR DASHBOARD
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

            {/* START BUTTON */}
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

                    <div className="text-2xl font-semibold">
                        ATS Score: {result.score}%
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Skill Category Coverage
                        </h2>

                        {Object.entries(result.categoryScores || {}).map(
                            ([category, value]: any) => (
                                <div key={category} className="mb-3">
                                    <p className="capitalize mb-1">{category}</p>
                                    <div className="w-full bg-gray-200 h-3 rounded">
                                        <div
                                            className="bg-blue-600 h-3 rounded"
                                            style={{ width: `${value}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>

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