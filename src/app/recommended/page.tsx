"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import JobCard from "@/components/JobCard";
import NewsWidget from "@/components/NewsWidget";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    posted_at: string;
    redirect_url: string;  // ✅ ADD THIS
}


export default function RecommendedPage() {
    const [skills, setSkills] = useState("");
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleClick = async () => {
        if (!skills) return alert("Enter skills first");

        setLoading(true);
        setHasSearched(true);

        try {
            const res = await fetch("/api/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ skills }),
            });

            const data = await res.json();
            if (data.jobs) {
                const formattedJobs = data.jobs.map((job: any) => ({
                    id: job.id,
                    title: job.title,
                    company: job.company?.display_name || "Unknown Company",
                    location: job.location?.display_name || "Unknown Location",
                    description: job.description || "",
                    posted_at: job.created || new Date().toISOString(),
                    redirect_url: job.redirect_url || "#",  // ✅ ADD THIS LINE
                }));


                setJobs(formattedJobs);
            } else {
                setJobs([]);
            }

        } catch (error) {
            console.error(error);
            alert("Failed to fetch recommendations");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f3f2ef] min-h-screen pt-6">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Sidebar - Profile */}
                    <aside className="hidden md:block md:col-span-3 lg:col-span-2">
                        <Sidebar />
                    </aside>

                    {/* Center Column - Feed */}
                    <main className="col-span-12 md:col-span-9 lg:col-span-7 space-y-4">
                        {/* Search/Post Input Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                </div>
                                <div className="flex-1">
                                    <div className="relative">
                                        <input
                                            className="w-full border border-gray-300 rounded-full px-5 py-3 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white font-semibold text-gray-600 cursor-pointer text-left"
                                            placeholder="What skills make you unique? (e.g. React, Python)"
                                            value={skills}
                                            onChange={(e) => setSkills(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center mt-3 px-2">
                                        <div className="flex gap-4">
                                            {/* Media/Event buttons preserved */}
                                            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded transition-colors text-sm font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" /></svg>
                                                Media
                                            </button>
                                            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded transition-colors text-sm font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-orange-400"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg>
                                                Event
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleClick}
                                            disabled={loading || !skills}
                                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-1.5 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Searching..." : "Find Jobs"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between my-4 px-1">
                            <div className="w-full h-[1px] bg-gray-300"></div>
                            <span className="px-2 text-xs text-gray-500 font-medium whitespace-nowrap">Sort by: <span className="font-bold text-gray-900 cursor-pointer">Relevance</span></span>
                        </div>

                        {/* Results Feed */}
                        <div className="space-y-3">
                            {hasSearched && jobs.length === 0 && !loading && (
                                <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
                                    <p className="text-gray-500">No jobs found matching your skills.</p>
                                </div>
                            )}

                            {jobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    id={job.id}
                                    title={job.title}
                                    company={job.company}
                                    location={job.location}
                                    type="Full-time"
                                    postedAt={new Date(job.posted_at).toLocaleDateString()}
                                    redirectUrl={job.redirect_url}   // ✅ ADD THIS
                                />

                            ))}

                            {!hasSearched && (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">Enter your skills above to see AI-recommended jobs.</p>
                                </div>
                            )}
                        </div>

                    </main>

                    {/* Right Column - Widgets */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-4">
                        <NewsWidget />

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20">
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <span className="text-gray-400 text-xs">Ad</span>
                                <span className="text-gray-400">•••</span>
                            </div>
                            <div className="text-center text-sm">
                                <p className="text-gray-500">Unlock your full potential with Premium.</p>
                                <div className="flex justify-center my-4">
                                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-amber-500"><path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" /></svg>
                                    </div>
                                </div>
                                <p className="text-gray-900 mb-4 px-4">See who's viewed your profile in the last 90 days.</p>
                                <button className="border border-primary text-primary font-semibold py-1.5 px-4 rounded-full hover:bg-blue-50 transition-colors w-full">
                                    Try for Free
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
