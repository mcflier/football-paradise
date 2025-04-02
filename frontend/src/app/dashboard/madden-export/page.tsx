"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sidebar } from "@/components/sidebar";

export default function MaddenExportPage() {
  const [leagueId, setLeagueId] = useState("");
  const [exportUrl, setExportUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerateUrl = () => {
    if (!leagueId) return;
    
    setIsGenerating(true);
    
    // In a real implementation, this would call the backend API
    // For now, we'll just simulate a delay and generate a URL
    setTimeout(() => {
      const baseUrl = window.location.origin;
      const generatedUrl = `${baseUrl}/api/madden-export`;
      setExportUrl(generatedUrl);
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopyUrl = () => {
    if (!exportUrl) return;
    
    navigator.clipboard.writeText(exportUrl);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleOpenCompanionApp = () => {
    // This would ideally open the Madden Companion App
    // Since we can't directly open apps, we'll provide instructions
    alert("Please open the Madden Companion App on your device and use the Export League option. Then paste the URL you copied.");
  };

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Madden Companion App Export</h1>
          
          <Card className="max-w-2xl mx-auto bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Export League Data</CardTitle>
              <CardDescription className="text-slate-400">
                Generate a URL to use with the Madden Companion App
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="league-id" className="text-white">League ID</Label>
                <Input
                  id="league-id"
                  placeholder="Enter your Madden league ID"
                  value={leagueId}
                  onChange={(e) => setLeagueId(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <p className="text-xs text-slate-400">
                  This is the ID of your Madden league in the game
                </p>
              </div>
              
              <Button 
                onClick={handleGenerateUrl}
                disabled={!leagueId || isGenerating}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isGenerating ? "Generating..." : "Generate Export URL"}
              </Button>
              
              {exportUrl && (
                <div className="space-y-4 pt-4 border-t border-slate-700">
                  <div className="space-y-2">
                    <Label className="text-white">Your Export URL</Label>
                    <div className="flex">
                      <Input
                        value={exportUrl}
                        readOnly
                        className="bg-slate-700 border-slate-600 text-white rounded-r-none"
                      />
                      <Button 
                        onClick={handleCopyUrl}
                        className={`rounded-l-none ${isCopied ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                      >
                        {isCopied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-white font-medium">Instructions:</h3>
                    <ol className="text-slate-400 space-y-2 list-decimal pl-5">
                      <li>Copy the URL above</li>
                      <li>Open the Madden Companion App on your device</li>
                      <li>Select your league</li>
                      <li>Tap on &quot;Export League&quot;</li>
                      <li>Paste the URL and tap &quot;Export&quot;</li>
                      <li>Select the data you want to export</li>
                    </ol>
                  </div>
                  
                  <Button 
                    onClick={handleOpenCompanionApp}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    Open Madden Companion App
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-center text-sm text-slate-400 border-t border-slate-700 pt-4">
              The Madden Companion App allows you to export league data from your Madden NFL game
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
