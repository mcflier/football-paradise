"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// WebSocket message type
interface WebSocketMessage {
  type: string;
  message: string;
  timestamp: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [notifications, setNotifications] = useState<WebSocketMessage[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [latestNotification, setLatestNotification] = useState<WebSocketMessage | null>(null);

  useEffect(() => {
    // For demo purposes, we'll simulate WebSocket messages
    // In a real implementation, this would connect to a real WebSocket server
    const simulateWebSocket = () => {
      // Simulate connection established
      console.log("WebSocket connection established (simulated)");
      
      // Simulate receiving a message after 3 seconds
      setTimeout(() => {
        const message: WebSocketMessage = {
          type: "league_created",
          message: "New league 'Digital Football Paradise Demo' created successfully!",
          timestamp: new Date().toISOString()
        };
        
        handleWebSocketMessage(message);
      }, 3000);
    };
    
    simulateWebSocket();
    
    // Cleanup function
    return () => {
      if (socket) {
        socket.close();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleWebSocketMessage = (message: WebSocketMessage) => {
    // setNotifications(prev => [...prev, message]);
    setLatestNotification(message);
    setShowNotification(true);
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <header className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                asChild
              >
                <Link href="/dashboard/leagues/create">
                  Create New League
                </Link>
              </Button>
            </div>
          </div>
        </header>
        
        {/* WebSocket notification */}
        {showNotification && latestNotification && (
          <div className="fixed top-4 right-4 z-50 max-w-md">
            <Card className="bg-indigo-600 border-indigo-500 text-white shadow-lg animate-slide-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Notification</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{latestNotification.message}</p>
              </CardContent>
            </Card>
          </div>
        )}
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
