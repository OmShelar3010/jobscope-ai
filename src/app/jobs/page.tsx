"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (search = "developer", loc = "india") => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/jobs?what=${search}&where=${loc}`
      );
      const data = await res.json();

      const formattedJobs = data.map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.company.display_name,
        location: job.location.display_name,
        type: job.contract_type || "Full-time",
        postedAt: job.created ? "Recently" : "",
        logoUrl: `https://logo.clearbit.com/${job.company.display_name
          .toLowerCase()
          .replace(/\s+/g, "")}.com`,
        redirect_url: job.redirect_url,
      }));

      setJobs(formattedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    fetchJobs(keyword || "developer", location || "india");
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] pt-6 pb-12">
      <div className="container-custom">

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">

            {/* Keyword Input */}
            <div className="w-full md:flex-1 relative">
              <input
                type="text"
                placeholder="Search by title, skill, or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md font-semibold text-gray-700"
              />
            </div>

            {/* Location Input */}
            <div className="w-full md:flex-1 relative">
              <input
                type="text"
                placeholder="City, state, or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md font-semibold text-gray-700"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-primary text-white font-bold py-2 px-6 rounded-full"
            >
              Search
            </button>
          </div>
        </div>

        {/* Job List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800">
              Top job picks for you
            </h2>
          </div>

          {loading && (
            <div className="p-4 text-center">Loading jobs...</div>
          )}

          <div className="divide-y divide-gray-200">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}