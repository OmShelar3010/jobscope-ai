"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/Card";
import { Button } from "@/components/Button";
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
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your job search and profile.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/jobs">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium leading-none">Name</p>
                <p className="text-sm text-muted-foreground">{profile?.name || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Bio</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{profile?.bio || "No bio added yet."}</p>
              </div>
              <Button variant="outline" className="w-full" onClick={() => router.push("/profile")}>Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder for Job Applications Stats or similar */}
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Track your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No active applications found.</p>
            <Button variant="ghost" className="w-full mt-4" onClick={() => router.push("/jobs")}>Start Applying</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
