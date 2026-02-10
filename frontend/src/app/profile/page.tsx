"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';
import ResumeUpload from '../../components/ResumeUpload';

export default function Profile() {
    const { user, loading, login } = useAuth(); // Using login to update user state
    const router = useRouter();

    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (user && user.skills) {
            setSkills(user.skills);
        }
    }, [user, loading, router]);

    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            if (!user) return;

            const { data } = await api.put('/users/profile', {
                skills: skills,
                // We can add name/email update logic here too if needed
            });

            // Update context
            const token = localStorage.getItem('token');
            if (token) {
                login(token, data); // Refresh user in context
            }

            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile', error);
            setMessage('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Profile</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">Personal Info</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-600"><span className="font-bold">Name:</span> {user.name}</p>
                    <p className="text-gray-600"><span className="font-bold">Email:</span> {user.email}</p>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Skills</h2>
                <ResumeUpload onUploadSuccess={(extractedSkills) => {
                    setSkills([...skills, ...extractedSkills.filter(s => !skills.includes(s))]);
                }} />
                <p className="text-sm text-gray-500 mb-4 mt-4">Add skills manually or upload a resume above.</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                        >
                            {skill}
                            <button
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                    {skills.length === 0 && <span className="text-gray-400 italic">No skills added yet.</span>}
                </div>

                <form onSubmit={handleAddSkill} className="flex gap-2">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a new skill (e.g., React, Python)"
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Add
                    </button>
                </form>
            </div>

            <div className="flex items-center justify-between">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`bg-green-600 text-white px-6 py-2 rounded-md font-bold transition ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                >
                    {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
                {message && (
                    <span className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </span>
                )}
            </div>
        </div>
    );
}
