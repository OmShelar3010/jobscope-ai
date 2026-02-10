"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [newJobCount, setNewJobCount] = useState(0);

    useEffect(() => {
        const socket = io('http://localhost:5000');
        socket.on('new-job', () => {
            setNewJobCount(prev => prev + 1);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-blue-400">
                            JobScope AI
                        </Link>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/jobs" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium relative" onClick={() => setNewJobCount(0)}>
                                Jobs
                                {newJobCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {newJobCount}
                                    </span>
                                )}
                            </Link>
                            {user && (
                                <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 space-x-4">
                            {user ? (
                                <>
                                    <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Login
                                    </Link>
                                    <Link href="/register" className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
