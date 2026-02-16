import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [user, setUser] = useState<{ email?: string; id: string } | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        getUser();
    }, []);

    if (!user) return null;

    return (
        <div className="space-y-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-14 bg-slate-200 relative">
                    {/* Banner Image Placeholder */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden bg-white">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Profile" />
                        </div>
                    </div>
                </div>

                <div className="pt-10 pb-4 px-4 text-center border-b border-gray-200">
                    <Link href="/profile" className="hover:underline decoration-1">
                        <h3 className="font-semibold text-gray-900">User Name</h3>{/* Replace with real name if available */}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1 truncate">Software Engineer | React & Node.js Enthusiast</p>
                </div>

                <div className="py-3 px-3 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-500">Profile viewers</span>
                        <span className="text-xs font-semibold text-primary">42</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-xs font-semibold text-gray-500">Post impressions</span>
                        <span className="text-xs font-semibold text-primary">158</span>
                    </div>
                </div>

                <div className="py-3 px-3 hover:bg-gray-50 transition-colors cursor-pointer text-xs flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400">
                        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm3 9a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0-4a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-gray-700">My Items</span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hidden md:block">
                <div className="text-xs font-semibold text-gray-600 mb-2">Recent</div>
                <div className="space-y-1">
                    {['React Developers', 'Remote Jobs', 'Tech News', 'Next.js Group'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500 hover:bg-gray-100 p-1 rounded cursor-pointer">
                            <span className="font-bold text-gray-400">#</span>
                            <span className="truncate font-semibold">{item}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-3 pt-2 border-t border-gray-200 text-xs font-semibold text-primary cursor-pointer hover:underline">
                    Discover more
                </div>
            </div>
        </div>
    );
}
