"use client";

import { useState, useEffect } from 'react';
import api from '../../utils/api';
import JobCard from '../../components/JobCard';
import { Job } from '../../types';

export default function Jobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await api.get('/jobs');
                setJobs(data);
            } catch (error) {
                console.error('Failed to fetch jobs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div className="text-center mt-20">Loading jobs...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Latest Job Openings</h1>

            {jobs.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-600">No jobs available at the moment.</p>
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
