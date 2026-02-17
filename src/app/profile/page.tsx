"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData.user;

      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (data) {
        setName(data.name || "");
        setBio(data.bio || "");
      }
      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const saveProfile = async () => {
    if (!user) return;

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name,
      bio,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Profile saved!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-blue-600 font-semibold animate-pulse">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Edit Profile</h1>
            <p className="text-slate-500 mt-1">
              Update your personal information and bio.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-slate-600 hover:text-blue-600 font-medium transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-800 bg-white"
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bio
              </label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-32 text-slate-800 bg-white resize-none"
                placeholder="Tell us a little about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t border-gray-50 flex justify-end">
              <button
                onClick={saveProfile}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
