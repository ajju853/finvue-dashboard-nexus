
import React from 'react';
import { Sidebar } from './Sidebar';
import { Watchlist } from './Watchlist';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64 flex">
        <main className="flex-1 p-6 max-w-6xl">
          {children}
        </main>
        <Watchlist />
      </div>
    </div>
  );
}
