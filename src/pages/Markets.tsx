
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TradingViewWidget } from '@/components/dashboard/TradingViewWidget';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Markets = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Markets</h1>
        <p className="text-muted-foreground">Track and analyze market movements</p>
      </div>
      
      <Tabs defaultValue="crypto" className="mb-6">
        <TabsList>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="crypto" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            <Card className="glass-card card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">Bitcoin / USD</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[600px]">
                <TradingViewWidget 
                  symbol="BINANCE:BTCUSDT" 
                  theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="stocks" className="mt-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">S&P 500</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[600px]">
              <TradingViewWidget 
                symbol="FOREXCOM:SPXUSD" 
                theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forex" className="mt-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">EUR/USD</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[600px]">
              <TradingViewWidget 
                symbol="FOREXCOM:EURUSD" 
                theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="commodities" className="mt-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Gold</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[600px]">
              <TradingViewWidget 
                symbol="FOREXCOM:XAUUSD" 
                theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Markets;
