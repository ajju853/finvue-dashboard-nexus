
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateData = (days: number) => {
  const data = [];
  const baseValue = 160000;
  let currentValue = baseValue;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    // Add some randomness to the value
    const change = (Math.random() - 0.43) * baseValue * 0.015;
    currentValue += change;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(currentValue * 100) / 100,
      fullDate: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
  }
  
  return data;
};

const dataSets = {
  '7d': generateData(7),
  '1m': generateData(30),
  '3m': generateData(90),
  '1y': generateData(365),
  'all': generateData(1825) // 5 years
};

export function PerformanceChart() {
  const [timeFrame, setTimeFrame] = useState<string>('1m');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const formatDate = (date: string) => {
    return date;
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/90 border border-border p-3 rounded-lg shadow-md backdrop-blur-sm">
          <p className="text-sm font-medium mb-1">{payload[0].payload.fullDate}</p>
          <p className="text-base font-semibold text-finPurple">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const getChartColor = () => {
    const start = dataSets[timeFrame as keyof typeof dataSets][0].value;
    const end = dataSets[timeFrame as keyof typeof dataSets][dataSets[timeFrame as keyof typeof dataSets].length - 1].value;
    return start <= end ? "#9b87f5" : "#EF4444";
  };
  
  return (
    <Card className="glass-card card-hover mt-6">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <CardTitle className="text-xl font-medium">Portfolio Performance</CardTitle>
          <ToggleGroup type="single" value={timeFrame} onValueChange={(value) => value && setTimeFrame(value)}>
            <ToggleGroupItem value="7d" className="text-xs">7D</ToggleGroupItem>
            <ToggleGroupItem value="1m" className="text-xs">1M</ToggleGroupItem>
            <ToggleGroupItem value="3m" className="text-xs">3M</ToggleGroupItem>
            <ToggleGroupItem value="1y" className="text-xs">1Y</ToggleGroupItem>
            <ToggleGroupItem value="all" className="text-xs">ALL</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataSets[timeFrame as keyof typeof dataSets]}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={getChartColor()} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 5000', 'dataMax + 5000']}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={getChartColor()}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{ r: 6, fill: getChartColor(), stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
