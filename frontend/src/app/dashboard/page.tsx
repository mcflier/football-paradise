"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface League {
  id: string;
  name: string;
  logo_url?: string;
  last_sync?: string;
}

export default function DashboardPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching leagues from API
    const fetchLeagues = async () => {
      try {
        // In a real implementation, this would call the backend API
        // For now, we'll just simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setLeagues([]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching leagues:", error);
        setIsLoading(false);
      }
    };
    
    fetchLeagues();
  }, []);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Your Leagues</CardTitle>
            <CardDescription className="text-slate-400">Manage your Madden leagues</CardDescription>
          </CardHeader>
          <CardContent>
            {leagues.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">You don&apos;t have any leagues yet.</p>
                <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link href="/dashboard/leagues/create">Create New League</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {leagues.map(league => (
                  <div key={league.id} className="p-4 bg-slate-700 rounded-md">
                    <h3 className="font-medium text-white">{league.name}</h3>
                    {league.last_sync && (
                      <p className="text-xs text-slate-400">Last synced: {new Date(league.last_sync).toLocaleString()}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Player Analysis</CardTitle>
            <CardDescription className="text-slate-400">AI-powered insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-slate-400 mb-4">Analyze player performance with AI.</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700" disabled={leagues.length === 0}>
                Analyze Players
              </Button>
              {leagues.length === 0 && (
                <p className="text-xs text-slate-500 mt-2">Create a league first to enable analysis</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">DFS Contests</CardTitle>
            <CardDescription className="text-slate-400">Skill-based contests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-slate-400 mb-4">No active contests available.</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700" disabled={leagues.length === 0}>
                Browse Contests
              </Button>
              {leagues.length === 0 && (
                <p className="text-xs text-slate-500 mt-2">Create a league first to enable contests</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">Latest updates from your leagues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-slate-400">No recent activity to display.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Live Games</CardTitle>
            <CardDescription className="text-slate-400">Currently streaming games</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-slate-400">No live games currently streaming.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
