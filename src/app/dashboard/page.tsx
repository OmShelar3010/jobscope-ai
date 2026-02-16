// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";
// import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/Card";
// import { Button } from "@/components/Button";
// import Link from "next/link";

// export default function Dashboard() {
//   const [user, setUser] = useState<{ email?: string } | null>(null);
//   const [profile, setProfile] = useState<{ name?: string; bio?: string } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadData = async () => {
//       const { data: authData } = await supabase.auth.getUser();
//       const currentUser = authData.user;

//       if (!currentUser) {
//         router.push("/login");
//         return;
//       }

//       setUser(currentUser);

//       const { data } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", currentUser.id)
//         .single();

//       setProfile(data);
//       setLoading(false);
//     };

//     loadData();
//   }, [router]);

//   if (loading) {
//     return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
//   }

//   return (
//     <div className="container py-10 space-y-8">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//           <p className="text-muted-foreground">Manage your job search and profile.</p>
//         </div>
//         <div className="flex gap-4">
//           <Link href="/jobs">
//             <Button>Browse Jobs</Button>
//           </Link>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile</CardTitle>
//             <CardDescription>Your personal information</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm font-medium leading-none">Name</p>
//                 <p className="text-sm text-muted-foreground">{profile?.name || "Not set"}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium leading-none">Email</p>
//                 <p className="text-sm text-muted-foreground">{user?.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium leading-none">Bio</p>
//                 <p className="text-sm text-muted-foreground whitespace-pre-wrap">{profile?.bio || "No bio added yet."}</p>
//               </div>
//               <Button variant="outline" className="w-full" onClick={() => router.push("/profile")}>Edit Profile</Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Placeholder for Job Applications Stats or similar */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Applications</CardTitle>
//             <CardDescription>Track your job applications</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">No active applications found.</p>
//             <Button variant="ghost" className="w-full mt-4" onClick={() => router.push("/jobs")}>Start Applying</Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [profile, setProfile] = useState<{ name?: string; bio?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
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

      setProfile(data);
      setLoading(false);
    };

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-blue-600 font-semibold animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, {profile?.name || "User"} 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Here’s an overview of your JobScope AI activity.
          </p>
        </div>

        <Link
          href="/jobs"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-sm transition"
        >
          Browse Jobs
        </Link>
      </div>

      {/* STATS SECTION */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Profile Views" value="42" />
        <StatCard title="Applications" value="0" />
        <StatCard title="AI Match Score" value="78%" />
        <StatCard title="Saved Jobs" value="3" />
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* PROFILE CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Profile Overview
          </h2>

          <div className="space-y-4">
            <InfoItem label="Name" value={profile?.name || "Not set"} />
            <InfoItem label="Email" value={user?.email || ""} />
            <InfoItem
              label="Bio"
              value={profile?.bio || "No bio added yet."}
            />
          </div>

          <button
            onClick={() => router.push("/profile")}
            className="mt-6 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* ACTIVITY CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Applications
          </h2>

          <p className="text-slate-500 text-sm">
            You haven’t applied to any jobs yet.
          </p>

          <button
            onClick={() => router.push("/jobs")}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Start Applying
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className="text-sm text-slate-500 mt-1 whitespace-pre-wrap">
        {value}
      </p>
    </div>
  );
}
