
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TradingViewWidget } from '@/components/dashboard/TradingViewWidget';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { Bell, ArrowUpRight, ArrowDownRight, TrendingUp, BarChart3 } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Market data for UI display
const marketData = {
  crypto: [
    { name: 'Bitcoin', symbol: 'BINANCE:BTCUSDT', price: '$64,892.31', change: '+2.45%', direction: 'up' },
    { name: 'Ethereum', symbol: 'BINANCE:ETHUSDT', price: '$3,146.78', change: '+1.87%', direction: 'up' },
    { name: 'Solana', symbol: 'BINANCE:SOLUSDT', price: '$143.57', change: '-0.65%', direction: 'down' },
  ],
  stocks: [
    { name: 'S&P 500', symbol: 'FOREXCOM:SPXUSD', price: '$5,234.21', change: '+0.34%', direction: 'up' },
    { name: 'NASDAQ', symbol: 'NASDAQ:NDX', price: '$18,423.67', change: '+0.78%', direction: 'up' },
    { name: 'Dow Jones', symbol: 'DJ:DJI', price: '$38,671.45', change: '-0.12%', direction: 'down' },
  ],
  forex: [
    { name: 'EUR/USD', symbol: 'FOREXCOM:EURUSD', price: '1.0842', change: '+0.14%', direction: 'up' },
    { name: 'GBP/USD', symbol: 'FOREXCOM:GBPUSD', price: '1.2645', change: '-0.23%', direction: 'down' },
    { name: 'USD/JPY', symbol: 'FOREXCOM:USDJPY', price: '151.67', change: '+0.32%', direction: 'up' },
  ],
  commodities: [
    { name: 'Gold', symbol: 'FOREXCOM:XAUUSD', price: '$2,321.45', change: '+0.67%', direction: 'up' },
    { name: 'Silver', symbol: 'FOREXCOM:XAGUSD', price: '$27.34', change: '+1.24%', direction: 'up' },
    { name: 'Crude Oil', symbol: 'NYMEX:CL', price: '$78.23', change: '-0.91%', direction: 'down' },
  ],
};

const Markets = () => {
  const [activeTab, setActiveTab] = useState('crypto');
  const [selectedAsset, setSelectedAsset] = useState({
    crypto: 'BINANCE:BTCUSDT',
    stocks: 'FOREXCOM:SPXUSD',
    forex: 'FOREXCOM:EURUSD',
    commodities: 'FOREXCOM:XAUUSD'
  });
  const [timeframe, setTimeframe] = useState('D');

  // Get current assets for the active tab
  const currentAssets = marketData[activeTab as keyof typeof marketData];
  
  // Handle asset selection
  const handleAssetSelect = (value: string) => {
    setSelectedAsset({
      ...selectedAsset,
      [activeTab]: value
    });
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-finPurple to-finBlue bg-clip-text text-transparent">Markets</h1>
            <p className="text-muted-foreground">Track and analyze market movements in real-time</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px] h-9 bg-secondary/50 backdrop-blur-sm border-none shadow-sm">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Minute</SelectItem>
                <SelectItem value="5">5 Minutes</SelectItem>
                <SelectItem value="15">15 Minutes</SelectItem>
                <SelectItem value="30">30 Minutes</SelectItem>
                <SelectItem value="60">1 Hour</SelectItem>
                <SelectItem value="D">1 Day</SelectItem>
                <SelectItem value="W">1 Week</SelectItem>
                <SelectItem value="M">1 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {currentAssets.map((asset, index) => (
            <Card 
              key={index} 
              className="glass-card card-hover cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              onClick={() => handleAssetSelect(asset.symbol)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">{asset.name}</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">{asset.price}</p>
                  <div className={`flex items-center gap-1 ${asset.direction === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {asset.direction === 'up' ? 
                      <ArrowUpRight className="h-4 w-4" /> : 
                      <ArrowDownRight className="h-4 w-4" />
                    }
                    <span className="font-medium">{asset.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <TabsList className="h-9 p-1 bg-secondary/60 backdrop-blur-sm">
              <TabsTrigger value="crypto" className="text-xs sm:text-sm">Crypto</TabsTrigger>
              <TabsTrigger value="stocks" className="text-xs sm:text-sm">Stocks</TabsTrigger>
              <TabsTrigger value="forex" className="text-xs sm:text-sm">Forex</TabsTrigger>
              <TabsTrigger value="commodities" className="text-xs sm:text-sm">Commodities</TabsTrigger>
            </TabsList>
            
            <Select value={selectedAsset[activeTab as keyof typeof selectedAsset]} onValueChange={handleAssetSelect}>
              <SelectTrigger className="w-full sm:w-[220px] h-9 bg-secondary/50 backdrop-blur-sm border-none shadow-sm">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                {marketData[activeTab as keyof typeof marketData].map((asset, index) => (
                  <SelectItem key={index} value={asset.symbol}>
                    {asset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {Object.keys(marketData).map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <Card className="glass-card card-hover overflow-hidden border border-white/10 dark:border-white/5">
                <CardHeader className="pb-2 flex flex-row justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-finPurple-light to-finBlue bg-clip-text text-transparent">
                      {marketData[tab as keyof typeof marketData].find(a => a.symbol === selectedAsset[tab as keyof typeof selectedAsset])?.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Live Chart • {timeframe === 'D' ? 'Daily' : timeframe === 'W' ? 'Weekly' : timeframe === 'M' ? 'Monthly' : `${timeframe}min`}</span>
                    </CardDescription>
                  </div>
                  <Bell className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                </CardHeader>
                <CardContent className="p-0 h-[700px]">
                  <TradingViewWidget 
                    symbol={selectedAsset[tab as keyof typeof selectedAsset]} 
                    theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
                    interval={timeframe}
                    style="candles"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Markets;
