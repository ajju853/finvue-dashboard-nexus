
import React from 'react';
import { Star, TrendingUp, TrendingDown, Bell, BellOff, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface WatchlistItemProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  notifications: boolean;
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({
  symbol,
  name,
  price,
  change,
  notifications
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(notifications);
  
  return (
    <div className="p-3 border-b border-border last:border-0 hover:bg-secondary/40 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-finPurple text-finPurple" />
          <span className="font-semibold">{symbol}</span>
        </div>
        <Switch 
          checked={notificationsEnabled} 
          onCheckedChange={setNotificationsEnabled}
          size="sm"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{name}</span>
        <div className="flex flex-col items-end">
          <span className="font-medium">${price.toLocaleString()}</span>
          <span 
            className={cn(
              "text-xs flex items-center gap-0.5",
              change >= 0 ? "text-success-500" : "text-danger-500"
            )}
          >
            {change >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )} 
            {Math.abs(change).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export function Watchlist() {
  const watchlistItems: WatchlistItemProps[] = [
    { symbol: "AAPL", name: "Apple Inc.", price: 181.92, change: 0.32, notifications: true },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 410.34, change: -0.87, notifications: true },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.52, change: 1.24, notifications: false },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.15, change: 0.64, notifications: true },
    { symbol: "TSLA", name: "Tesla Inc.", price: 217.45, change: -1.56, notifications: false },
    { symbol: "BTC", name: "Bitcoin", price: 62834.28, change: 2.14, notifications: true },
    { symbol: "ETH", name: "Ethereum", price: 3012.64, change: 0.89, notifications: false },
  ];

  return (
    <div className="hidden lg:block w-80 min-h-screen border-l border-border">
      <div className="p-4 sticky top-0 bg-background z-10 border-b border-border">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Star className="h-5 w-5 text-finPurple" />
          Watchlist
        </h2>
        <div className="relative">
          <Input
            placeholder="Search watchlist..."
            className="pl-8"
          />
          <Plus className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div className="divide-y divide-border">
        {watchlistItems.map((item) => (
          <WatchlistItem key={item.symbol} {...item} />
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add New Symbol
        </Button>
      </div>
    </div>
  );
}
