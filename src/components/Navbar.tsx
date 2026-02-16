"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 h-[52px]">
      <div className="container-custom h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex-shrink-0">
            <span className="sr-only">JobScope AI</span>
            <div className="bg-primary text-white rounded-md w-9 h-9 flex items-center justify-center font-bold text-xl">
              in
            </div>
          </Link>
          <div className="relative hidden md:block ml-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-[#eef3f8] text-sm rounded-md py-1.5 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center h-full gap-6 sm:gap-8">
          <NavItem href="/" icon={<HomeIcon />} label="Home" active />
          <NavItem href="/network" icon={<UsersIcon />} label="My Network" />
          <NavItem href="/jobs" icon={<BriefcaseIcon />} label="Jobs" />
          <NavItem href="/messaging" icon={<MessageIcon />} label="Messaging" />
          <NavItem href="/notifications" icon={<BellIcon />} label="Notifications" />
          <NavItem href="/recommended" icon={<LightBulbIcon />} label="Recommended" />

          <div className="flex flex-col items-center justify-center h-full border-l pl-6 ml-2 cursor-pointer group relative">
            {user ? (
              <div className="flex flex-col items-center" onClick={handleLogout}>
                <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="User" />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5 group-hover:text-black flex items-center gap-0.5">
                  Me <ChevronDownIcon />
                </span>
              </div>
            ) : (
              <Link href="/login" className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <UserIcon />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5 group-hover:text-black">
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center justify-center h-full min-w-[50px] sm:min-w-[80px] border-b-2 ${active ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'} transition-colors`}>
      <div className="text-current">
        {icon}
      </div>
      <span className="text-[10px] sm:text-xs mt-0.5 hidden sm:block">{label}</span>
    </Link>
  );
}

// Icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z" /></svg>
);
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z" /></svg>
);
const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V22h-4.6l-1.63-2.61A2 2 0 0117.43 18H20v-4zM8.59 18H6.57L4.95 22H2v-9.38A4 4 0 005 14zM12 22h-3.66l1.63-2.61A2 2 0 0111.62 18h.76z" /></svg>
);
const MessageIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 4H8a7 7 0 000 14h4v4l8.16-8.16A6 6 0 0116 4zM8 16a5 5 0 010-10h8a4 4 0 010 8H80z" /></svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22 19h-8.28a2 2 0 11-3.44 0H2L3.6 17.3c.12-.13 2.4-2.84 2.4-10.3a6 6 0 0112 0c0 7.46 2.28 10.17 2.4 10.3zM8 7a4 4 0 018 0c0 6.64 1.76 8.94 2.15 9.45l-12.3 0c.4-.5 2.15-2.8 2.15-9.45z" /></svg>
);
const LightBulbIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" /></svg>
);
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 15.25a.74.74 0 01-.53-.22l-5-5A.75.75 0 017.53 9L12 13.44 16.47 9a.75.75 0 011.06 1l-5 5a.74.74 0 01-.53.25z" /></svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 4a4 4 0 100 8 4 4 0 000-8zM4 20a6 6 0 0112 0h-1a5 5 0 00-10 0z" /></svg>
);
