"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";

// Dummy data for People You May Know
const PEOPLE = [
    { id: 1, name: "Sarah Williams", role: "Product Manager at TechFlow", mutual: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { id: 2, name: "James Miller", role: "Software Engineer at Google", mutual: 12, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
    { id: 3, name: "Emily Johnson", role: "HR Specialist at Amazon", mutual: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
    { id: 4, name: "Michael Brown", role: "Frontend Developer", mutual: 8, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
    { id: 5, name: "David Wilson", role: "Data Scientist at Netflix", mutual: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
    { id: 6, name: "Emma Jones", role: "UX Designer at Airbnb", mutual: 15, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
    { id: 7, name: "Daniel Garcia", role: "Full Stack Dev", mutual: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel" },
    { id: 8, name: "Olivia Martinez", role: "Recruiter at LinkedIn", mutual: 20, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia" },
];

export default function NetworkPage() {
    return (
        <div className="bg-[#f3f2ef] min-h-screen pt-6 pb-12">
            <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Sidebar - Manage my network */}
                <aside className="md:col-span-4 lg:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <h3 className="px-4 py-3 text-base font-semibold text-gray-700 border-b border-gray-200">
                            Manage my network
                        </h3>
                        <div className="py-2">
                            {['Connections', 'Contacts', 'Following & Followers', 'Groups', 'Events', 'Pages', 'Newsletters', 'Hashtags'].map((item) => (
                                <div key={item} className="px-6 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center text-gray-600 font-semibold text-sm group">
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500 group-hover:text-gray-700">
                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                        </svg>
                                        {item}
                                    </div>
                                    <span className="text-gray-500 font-normal">{Math.floor(Math.random() * 500)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 p-4 text-center">
                            <Link href="#" className="text-primary font-semibold text-sm hover:underline">
                                Show less
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="md:col-span-8 lg:col-span-9 space-y-4">

                    {/* Invitations Block - Placeholder */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-between items-center">
                        <span className="font-semibold text-gray-600">No pending invitations</span>
                        <span className="font-semibold text-gray-500 text-sm cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">Manage</span>
                    </div>

                    {/* People You May Know Grid */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-base font-semibold text-gray-800">People you may know</h2>
                            <button className="text-sm font-semibold text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">See all</button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {PEOPLE.map((person) => (
                                <div key={person.id} className="relative bg-white rounded-lg border border-gray-200 flex flex-col items-center pb-4 hover:shadow-md transition-shadow">

                                    {/* Banner & Avatar */}
                                    <div className="w-full h-16 bg-slate-200 rounded-t-lg relative mb-8">
                                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                                            <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden bg-white">
                                                <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <button className="absolute top-2 right-2 w-6 h-6 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="px-3 text-center w-full flex-1 flex flex-col">
                                        <Link href="#" className="font-semibold text-gray-900 hover:underline hover:text-primary truncate block w-full mb-1">
                                            {person.name}
                                        </Link>
                                        <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5em] mb-4">
                                            {person.role}
                                        </p>

                                        <div className="text-xs text-gray-500 mb-4 flex items-center justify-center gap-1">
                                            {person.mutual > 0 && (
                                                <>
                                                    <span className="inline-flex items-center justify-center w-4 h-4 text-[8px] font-bold bg-gray-200 rounded-full text-gray-600">∞</span>
                                                    {person.mutual} mutual connections
                                                </>
                                            )}
                                        </div>

                                        <div className="mt-auto w-full">
                                            <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-blue-50 hover:border-blue-800 hover:text-blue-800 font-semibold py-1">
                                                Connect
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
