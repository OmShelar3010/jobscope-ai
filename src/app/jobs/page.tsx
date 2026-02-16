"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";

export default function Jobs() {
  const [skills, setSkills] = useState("");
  // const [jobs, setJobs] = useState<string[]>([]); // Previously string array, now we need structured objects
  // const [history, setHistory] = useState<{ skills: string; jobs: string[] }[]>([]);

  // Dummy data for visual verification
  const DUMMY_JOBS = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      postedAt: "2h ago",
      logoUrl: "https://logo.clearbit.com/google.com"
    },
    {
      id: "2",
      title: "Frontend Developer (React)",
      company: "StartUp Flow",
      location: "New York, NY (Hybrid)",
      type: "Full-time",
      postedAt: "5h ago",
      logoUrl: "https://logo.clearbit.com/airbnb.com"
    },
    {
      id: "3",
      title: "Product Designer",
      company: "Creative Studio",
      location: "Remote",
      type: "Contract",
      postedAt: "1d ago",
      logoUrl: "https://logo.clearbit.com/spotify.com"
    },
    {
      id: "4",
      title: "Backend Engineer",
      company: "FinTech Sol",
      location: "Chicago, IL",
      type: "Full-time",
      postedAt: "2d ago",
      logoUrl: "https://logo.clearbit.com/stripe.com"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f2ef] pt-6 pb-12">
      <div className="container-custom">
        {/* Search Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:flex-1 relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 absolute left-3 top-3 text-gray-500">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="Search by title, skill, or company"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-semibold text-gray-700"
              />
            </div>
            <div className="w-full md:flex-1 relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 absolute left-3 top-3 text-gray-500">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="City, state, or zip code"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-semibold text-gray-700"
              />
            </div>
            <button className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors w-full md:w-auto">
              Search
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['Date Posted', 'Experience Level', 'Company', 'Remote', 'Easy Apply'].map((filter) => (
              <button key={filter} className="whitespace-nowrap px-4 py-1.5 border border-gray-400 rounded-full text-gray-600 font-semibold text-sm hover:bg-gray-100 hover:border-gray-500 transition-colors">
                {filter} ▼
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters / Recommendations */}
          <div className="hidden lg:block lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Job Seeker Guidance</h3>
              <p className="text-sm text-gray-500 mb-4">Recommended based on your activity</p>
              <div className="text-sm font-semibold text-primary cursor-pointer hover:underline mb-2">
                I want to improve my resume
              </div>
              <div className="text-sm font-semibold text-gray-500">
                Explore our curated guide of expert led courses
              </div>
            </div>
          </div>

          {/* Main Content - Job List */}
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-xl text-gray-800">Top job picks for you</h2>
                <p className="text-sm text-gray-500">Based on your profile and search history</p>
              </div>

              <div className="divide-y divide-gray-200">
                {DUMMY_JOBS.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
