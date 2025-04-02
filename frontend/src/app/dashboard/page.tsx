"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Welcome to Digital Football Paradise</h1>
          <p className="text-slate-400">Hello, {session?.user?.name || "User"}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Your Leagues</CardTitle>
              <CardDescription className="text-slate-400">Manage your Madden leagues</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">You don't have any leagues yet.</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Create New League</Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Player Analysis</CardTitle>
              <CardDescription className="text-slate-400">AI-powered insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Analyze player performance with AI.</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Analyze Players</Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>DFS Contests</CardTitle>
              <CardDescription className="text-slate-400">Skill-based contests</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">No active contests available.</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Browse Contests</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
