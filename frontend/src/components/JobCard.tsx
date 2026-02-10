import React from 'react';
import { Job } from '../types';

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-lg text-gray-600 font-medium">{job.company}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {job.salary || 'Salary not specified'}
                </span>
            </div>

            <div className="mb-4">
                <p className="text-gray-500 text-sm mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {job.location}
                </p>
                <p className="text-gray-700 line-clamp-3">{job.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {job.skills && job.skills.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-100"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            <div className="mt-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default JobCard;
