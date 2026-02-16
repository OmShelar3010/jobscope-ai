"use client";

import { Button } from "@/components/Button";

// Dummy Notification Data
const NOTIFICATIONS = [
    {
        id: 1,
        type: "job",
        content: "New job alert: 'Senior React Developer' at TechCorp matches your preferences.",
        time: "1h",
        read: false,
        icon: "💼", // Simple icon placeholder
        action: "View Job"
    },
    {
        id: 2,
        type: "view",
        content: "5 people viewed your profile today.",
        time: "3h",
        read: true,
        icon: "👁️",
        action: null
    },
    {
        id: 3,
        type: "connection",
        content: "James Miller accepted your connection request.",
        time: "5h",
        read: true,
        icon: "👥",
        action: "Message"
    },
    {
        id: 4,
        type: "post",
        content: "Sarah Williams posted: 'Excited to announce my new role at TechFlow!'",
        time: "1d",
        read: true,
        icon: "📝",
        action: "View Post"
    },
    {
        id: 5,
        type: "recommendation",
        content: "You appeared in 12 searches this week.",
        time: "2d",
        read: true,
        icon: "🔍",
        action: null
    },
    {
        id: 6,
        type: "event",
        content: "Reminder: 'React Summit 2026' starts tomorrow.",
        time: "2d",
        read: true,
        icon: "📅",
        action: "View Event"
    },
    {
        id: 7,
        type: "skill",
        content: "Hiring trends for 'Next.js' are up 15%. Add it to your profile.",
        time: "3d",
        read: true,
        icon: "📈",
        action: "Update Profile"
    }
];

export default function NotificationsPage() {
    return (
        <div className="bg-[#f3f2ef] min-h-screen pt-6 pb-12">
            <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Sidebar - Notification Settings */}
                <aside className="hidden md:block md:col-span-3 lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <h3 className="font-semibold text-gray-900 mb-4">Manage your Notifications</h3>
                        <div className="text-sm font-semibold text-primary cursor-pointer hover:underline mb-2">
                            View Settings
                        </div>
                    </div>
                </aside>

                {/* Main Content - Feed */}
                <main className="col-span-12 md:col-span-9 lg:col-span-7">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

                        {/* Filter Tabs */}
                        <div className="flex gap-4 px-4 py-3 border-b border-gray-200 overflow-x-auto">
                            <button className="px-3 py-1 bg-green-700 text-white rounded-full text-sm font-semibold whitespace-nowrap">All</button>
                            <button className="px-3 py-1 border border-gray-500 text-gray-600 rounded-full text-sm font-semibold hover:bg-gray-100 whitespace-nowrap">My posts</button>
                            <button className="px-3 py-1 border border-gray-500 text-gray-600 rounded-full text-sm font-semibold hover:bg-gray-100 whitespace-nowrap">Mentions</button>
                        </div>

                        {/* Notification List */}
                        <div className="divide-y divide-gray-100">
                            {NOTIFICATIONS.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 flex gap-4 hover:bg-[#edf3f8] cursor-pointer transition-colors ${!notification.read ? 'bg-[#e2f0fe]' : 'bg-white'}`}
                                >
                                    {/* Icon / Avatar placeholder */}
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl border border-gray-200">
                                        {notification.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-900 leading-snug">
                                            {notification.content}
                                        </div>
                                        {notification.action && (
                                            <Button variant="outline" className="mt-2 rounded-full border-primary text-primary hover:bg-blue-50 py-1 px-4 text-xs font-semibold h-8">
                                                {notification.action}
                                            </Button>
                                        )}
                                    </div>

                                    {/* Time & Options */}
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        {!notification.read && (
                                            <div className="w-2.5 h-2.5 bg-primary rounded-full mt-1"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </main>

                {/* Right Sidebar - Ads */}
                <aside className="hidden lg:block lg:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20 text-center">
                        <span className="text-xs text-gray-400 mb-2 block">Ad</span>
                        <div className="w-full h-48 bg-gray-100 mb-2 flex items-center justify-center text-gray-400 text-sm">
                            [Ad View]
                        </div>
                        <p className="text-sm text-gray-600 px-4">
                            Master your skills with premium courses on LinkedIn Learning.
                        </p>
                    </div>
                    <footer className="mt-4 text-center text-xs text-gray-500 space-y-1">
                        <p>JobScope Corporation © 2026</p>
                    </footer>
                </aside>

            </div>
        </div>
    );
}
