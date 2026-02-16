"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData.user;

      if (!currentUser) return;

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
    };

    loadProfile();
  }, []);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-blue-700 text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>

        <input
          className="w-full p-2 mb-4 rounded bg-white/20 placeholder-white outline-none"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full p-2 mb-6 rounded bg-white/20 placeholder-white outline-none"
          placeholder="Your bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button
          onClick={saveProfile}
          className="w-full bg-white text-green-700 font-semibold p-2 rounded hover:bg-gray-200 transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
