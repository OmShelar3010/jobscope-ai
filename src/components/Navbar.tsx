"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GooeyNav from "@/components/GooeyNav";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

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

  const items = [
    { label: "Home", href: "/" },
    { label: "Jobs", href: "/jobs" },
    { label: "Recommended", href: "/recommended" },
    { label: "Profile", href: "/profile" },
  ];

  const activeIndex =
    items.findIndex((item) => item.href === pathname) !== -1
      ? items.findIndex((item) => item.href === pathname)
      : 0;

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white rounded-md w-9 h-9 flex items-center justify-center font-bold">
            JS
          </div>
          <span className="font-semibold text-slate-800 hidden sm:block">
            JobScope AI
          </span>
        </Link>

        {/* Gooey Navigation */}
        <GooeyNav items={items} initialActiveIndex={activeIndex} />

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt="User"
                />
              </div>
              <span className="text-sm text-slate-600 hover:text-black">
                Logout
              </span>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
