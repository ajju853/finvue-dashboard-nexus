
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const watchlistItems = [
  { symbol: "AAPL", name: "Apple Inc.", price: 181.92, change: 0.32, notifications: true },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 410.34, change: -0.87, notifications: true },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.52, change: 1.24, notifications: false },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.15, change: 0.64, notifications: true },
  { symbol: "TSLA", name: "Tesla Inc.", price: 217.45, change: -1.56, notifications: false },
  { symbol: "BTC", name: "Bitcoin", price: 62834.28, change: 2.14, notifications: true },
  { symbol: "ETH", name: "Ethereum", price: 3012.64, change: 0.89, notifications: false },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 103.28, change: 1.75, notifications: false },
  { symbol: "JPM", name: "JPMorgan Chase", price: 196.62, change: -0.42, notifications: true },
  { symbol: "V", name: "Visa Inc.", price: 275.31, change: 0.23, notifications: false },
];

const WatchlistPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Watchlist</h1>
        <p className="text-muted-foreground">Track your favorite assets</p>
      </div>
      
      <Card className="glass-card card-hover">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-xl font-medium flex items-center gap-2">
              <Star className="h-5 w-5 text-finPurple" />
              Watched Assets
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Add symbol..."
                className="pl-8"
              />
              <Plus className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlistItems.map((item) => (
              <div 
                key={item.symbol} 
                className="p-4 border border-border rounded-lg hover:bg-secondary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-finPurple text-finPurple" />
                    <span className="font-semibold">{item.symbol}</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 px-2">
                    {item.notifications ? 
                      <span className="text-xs">Notifications On</span> : 
                      <span className="text-xs">Add Notification</span>
                    }
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">${item.price.toLocaleString()}</span>
                    <span 
                      className={cn(
                        "text-xs flex items-center gap-0.5",
                        item.change >= 0 ? "text-success-500" : "text-danger-500"
                      )}
                    >
                      {item.change >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )} 
                      {Math.abs(item.change).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default WatchlistPage;
