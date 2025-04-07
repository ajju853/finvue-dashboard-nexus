
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SmartSearch } from '@/components/dashboard/SmartSearch';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { AssetsTable } from '@/components/dashboard/AssetsTable';
import { NewsFeed } from '@/components/dashboard/NewsFeed';
import { QuickTradeWidget } from '@/components/dashboard/QuickTradeWidget';
import { TradingViewWidget } from '@/components/dashboard/TradingViewWidget';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Index = () => {
  useEffect(() => {
    // Check for system dark mode preference and set initial theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-4">
        <SmartSearch />
      </div>
      
      <PortfolioSummary />
      
      <PerformanceChart />
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card card-hover h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Market Chart</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[400px]">
              <div className="w-full h-full">
                <TradingViewWidget 
                  symbol="BINANCE:BTCUSDT" 
                  theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <QuickTradeWidget />
        </div>
      </div>
      
      <AssetsTable />
      
      <NewsFeed />
    </DashboardLayout>
  );
};

export default Index;
