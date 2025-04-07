
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowDown, ArrowUp, MoreHorizontal, Star, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const generateChartData = (trend: 'up' | 'down', volatility = 1) => {
  const data = [];
  const factor = trend === 'up' ? 1 : -1;
  
  for (let i = 0; i < 20; i++) {
    data.push({
      value: 100 + factor * (Math.random() * volatility * 15 + i * factor * volatility)
    });
  }
  
  return data;
};

const assets = [
  { 
    id: 1, 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    price: 62834.28, 
    change: 2.14, 
    entryPrice: 58452.66,
    profit: 7.49,
    amount: 0.8542,
    value: 53670.24,
    allocation: 29.08,
    chartData: generateChartData('up', 1.5),
    type: 'crypto',
    starred: true
  },
  { 
    id: 2, 
    name: 'Apple Inc.', 
    symbol: 'AAPL', 
    price: 181.92, 
    change: 0.32, 
    entryPrice: 148.75,
    profit: 22.30,
    amount: 75,
    value: 13644.00,
    allocation: 7.39,
    chartData: generateChartData('up'),
    type: 'stock',
    starred: true
  },
  { 
    id: 3, 
    name: 'Tesla Inc.', 
    symbol: 'TSLA', 
    price: 217.45, 
    change: -1.56, 
    entryPrice: 245.33,
    profit: -11.36,
    amount: 35,
    value: 7610.75,
    allocation: 4.12,
    chartData: generateChartData('down'),
    type: 'stock',
    starred: false
  },
  { 
    id: 4, 
    name: 'Ethereum', 
    symbol: 'ETH', 
    price: 3012.64, 
    change: 0.89, 
    entryPrice: 2285.92,
    profit: 31.79,
    amount: 6.35,
    value: 19130.26,
    allocation: 10.36,
    chartData: generateChartData('up'),
    type: 'crypto',
    starred: true
  },
  { 
    id: 5, 
    name: 'Microsoft Corp.', 
    symbol: 'MSFT', 
    price: 410.34, 
    change: -0.87, 
    entryPrice: 312.87,
    profit: 31.15,
    amount: 28,
    value: 11489.52,
    allocation: 6.22,
    chartData: generateChartData('up'),
    type: 'stock',
    starred: false
  },
  { 
    id: 6, 
    name: 'Vanguard S&P 500 ETF', 
    symbol: 'VOO', 
    price: 470.11, 
    change: 0.43, 
    entryPrice: 380.26,
    profit: 23.63,
    amount: 35,
    value: 16453.85,
    allocation: 8.91,
    chartData: generateChartData('up', 0.5),
    type: 'etf',
    starred: false
  },
];

export function AssetsTable() {
  const [sortField, setSortField] = React.useState<string>('allocation');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const sortedAssets = [...assets].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });
  
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />;
  };
  
  return (
    <Card className="glass-card card-hover mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">
                  <span className="sr-only">Star</span>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center">
                    Asset {getSortIcon('name')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort('price')}>
                  <div className="flex items-center justify-end">
                    Price {getSortIcon('price')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort('change')}>
                  <div className="flex items-center justify-end">
                    24h {getSortIcon('change')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort('profit')}>
                  <div className="flex items-center justify-end">
                    P&L% {getSortIcon('profit')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort('value')}>
                  <div className="flex items-center justify-end">
                    Value {getSortIcon('value')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort('allocation')}>
                  <div className="flex items-center justify-end">
                    % of Portfolio {getSortIcon('allocation')}
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell text-right">Trend</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <Button variant="ghost" size="icon" className={asset.starred ? "text-finPurple" : "text-muted-foreground"}>
                      <Star className={cn("h-4 w-4", asset.starred && "fill-finPurple")} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-white text-xs",
                        asset.type === 'crypto' ? "bg-finPurple" : 
                        asset.type === 'stock' ? "bg-finBlue" : "bg-finGreen"
                      )}>
                        {asset.symbol.slice(0, 1)}
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    asset.change >= 0 ? "text-success-500" : "text-danger-500"
                  )}>
                    <div className="flex items-center justify-end gap-1">
                      {asset.change >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {Math.abs(asset.change)}%
                    </div>
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    asset.profit >= 0 ? "text-success-500" : "text-danger-500"
                  )}>
                    {asset.profit >= 0 ? "+" : ""}{asset.profit}%
                  </TableCell>
                  <TableCell className="text-right">
                    ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right">
                    {asset.allocation.toFixed(2)}%
                  </TableCell>
                  <TableCell className="hidden md:table-cell p-0">
                    <div className="h-[40px] w-[80px] mx-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={asset.chartData}>
                          <defs>
                            <linearGradient id={`gradient-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop 
                                offset="5%" 
                                stopColor={asset.change >= 0 ? "#10B981" : "#EF4444"} 
                                stopOpacity={0.3} 
                              />
                              <stop 
                                offset="95%" 
                                stopColor={asset.change >= 0 ? "#10B981" : "#EF4444"} 
                                stopOpacity={0} 
                              />
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={asset.change >= 0 ? "#10B981" : "#EF4444"} 
                            fill={`url(#gradient-${asset.id})`} 
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Buy More</DropdownMenuItem>
                        <DropdownMenuItem>Sell</DropdownMenuItem>
                        <DropdownMenuItem>Set Alert</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
