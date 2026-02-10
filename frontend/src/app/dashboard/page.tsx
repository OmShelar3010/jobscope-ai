"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import JobCard from '../../components/JobCard';
import { Job } from '../../types';
import Link from 'next/link';

export default function Dashboard() {
    const { user, loading } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchRecommendedJobs = async () => {
                try {
                    const { data } = await api.get('/jobs/recommended');
                    setJobs(data);
                } catch (error) {
                    console.error('Failed to fetch jobs', error);
                } finally {
                    setFetching(false);
                }
            };

            fetchRecommendedJobs();
        } else if (!loading) {
            // Redirect handled by AuthContext/Protected Route usually, but safely here:
            setFetching(false);
        }
    }, [user, loading]);

    if (loading || fetching) {
        return <div className="text-center mt-20 text-gray-600">Loading your personalized feed...</div>;
    }

    if (!user) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold mb-4">Please log in to view your dashboard.</h2>
                <Link href="/login" className="text-blue-500 hover:underline">Go to Login</Link>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 mt-2">Here are some jobs picked just for you based on your skills.</p>
            </div>

            {jobs.length === 0 ? (
                <div className="text-center bg-white p-10 rounded-lg shadow">
                    <p className="text-xl text-gray-600 mb-4">No recommendations found yet.</p>
                    <p className="mb-6">Try adding more skills to your profile to get better matches.</p>
                    <Link href="/profile" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                        Update Profile
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
}
