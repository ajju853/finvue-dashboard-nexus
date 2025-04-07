
import React from 'react';
import { ArrowDown, ArrowUp, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Stocks', value: 42 },
  { name: 'Crypto', value: 28 },
  { name: 'ETFs', value: 18 },
  { name: 'Cash', value: 12 },
];

const COLORS = ['#9b87f5', '#0EA5E9', '#4ADE80', '#8E9196'];

export function PortfolioSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <Card className="glass-card card-hover col-span-1 md:col-span-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium flex items-center justify-between">
            <span>Portfolio Value</span>
            <span className="text-sm font-normal text-muted-foreground">Last updated: Today, 4:30 PM</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold">$184,593.23</h2>
              <div className="flex items-center text-success-500">
                <ArrowUp className="h-4 w-4" />
                <span className="font-medium">2.4%</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="text-success-500 font-medium">+$4,320.82 (24h)</span>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Today's Change</p>
                <div className="mt-1 flex items-center">
                  <span className="text-xl font-medium">+$1,248.32</span>
                  <span className="ml-2 text-success-500 flex items-center">
                    <ArrowUp className="h-4 w-4" />
                    <span>0.68%</span>
                  </span>
                </div>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">This Month</p>
                <div className="mt-1 flex items-center">
                  <span className="text-xl font-medium">+$7,592.14</span>
                  <span className="ml-2 text-success-500 flex items-center">
                    <ArrowUp className="h-4 w-4" />
                    <span>4.3%</span>
                  </span>
                </div>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">All Time</p>
                <div className="mt-1 flex items-center">
                  <span className="text-xl font-medium">+$35,148.95</span>
                  <span className="ml-2 text-success-500 flex items-center">
                    <ArrowUp className="h-4 w-4" />
                    <span>23.5%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card card-hover col-span-1 md:col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Allocation']}
                  contentStyle={{
                    backgroundColor: 'rgba(22, 22, 22, 0.8)',
                    borderRadius: '0.5rem',
                    border: 'none',
                    color: 'white',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
