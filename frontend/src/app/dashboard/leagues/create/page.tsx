"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sidebar } from "@/components/sidebar";

export default function CreateLeaguePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ea_email: "",
    ea_password: "",
    logo_url: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert("League created successfully!");
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating league:", error);
      alert("Failed to create league. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Create New League</h1>
          
          <Card className="max-w-2xl mx-auto bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">League Details</CardTitle>
              <CardDescription className="text-slate-400">
                Enter the details for your new Madden league
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">League Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter league name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo_url" className="text-white">Logo URL (Optional)</Label>
                  <Input
                    id="logo_url"
                    name="logo_url"
                    placeholder="https://example.com/logo.png"
                    value={formData.logo_url}
                    onChange={handleChange}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ea_email" className="text-white">EA Account Email</Label>
                  <Input
                    id="ea_email"
                    name="ea_email"
                    type="email"
                    placeholder="Enter EA account email"
                    value={formData.ea_email}
                    onChange={handleChange}
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ea_password" className="text-white">EA Account Password</Label>
                  <Input
                    id="ea_password"
                    name="ea_password"
                    type="password"
                    placeholder="Enter EA account password"
                    value={formData.ea_password}
                    onChange={handleChange}
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-400">
                    Your EA credentials are encrypted and only used to sync league data
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create League"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
