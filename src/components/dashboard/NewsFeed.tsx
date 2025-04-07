
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Newspaper, TrendingUp, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  category: string;
  isHot?: boolean;
  type: 'market' | 'global' | 'alert';
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Fed announces 25 basis point rate cut, signaling easing cycle',
    source: 'Bloomberg',
    time: '32m ago',
    category: 'Economy',
    isHot: true,
    type: 'market'
  },
  {
    id: 2,
    title: 'Apple unveils new AR glasses at developer conference',
    source: 'TechCrunch',
    time: '1h ago',
    category: 'Technology',
    type: 'global'
  },
  {
    id: 3,
    title: 'Bitcoin breaks $65K resistance level, targets new all-time high',
    source: 'CoinDesk',
    time: '3h ago',
    category: 'Crypto',
    isHot: true,
    type: 'market'
  },
  {
    id: 4,
    title: 'Tesla earnings beat estimates, shares up 7% after hours',
    source: 'Reuters',
    time: '4h ago',
    category: 'Earnings',
    type: 'alert'
  },
  {
    id: 5,
    title: 'Amazon to acquire AI startup for $3.2 billion',
    source: 'Wall Street Journal',
    time: '5h ago',
    category: 'M&A',
    type: 'global'
  },
  {
    id: 6,
    title: 'Microsoft quarterly revenue tops $50 billion for first time',
    source: 'CNBC',
    time: '8h ago',
    category: 'Earnings',
    type: 'alert'
  },
  {
    id: 7,
    title: 'Oil prices drop as OPEC+ increases production target',
    source: 'Financial Times',
    time: '10h ago',
    category: 'Commodities',
    type: 'market'
  }
];

export function NewsFeed() {
  const [activeTab, setActiveTab] = React.useState('all');
  
  const filteredNews = activeTab === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.type === activeTab);
  
  return (
    <Card className="glass-card card-hover mt-6">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-finPurple" />
            News & Alerts
          </CardTitle>
          <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="alert">Alerts</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {filteredNews.map((item) => (
            <div key={item.id} className="flex flex-col border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex items-start justify-between">
                <h3 className="font-medium line-clamp-2 hover:text-finPurple cursor-pointer transition-colors">
                  {item.title}
                </h3>
                {item.isHot && (
                  <Badge variant="outline" className="ml-2 bg-danger-500/10 text-danger-500 border-danger-500/20">
                    <Zap className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <span className="font-medium">{item.source}</span>
                <div className="mx-2 h-1 w-1 rounded-full bg-border" />
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.time}
                </div>
                <div className="mx-2 h-1 w-1 rounded-full bg-border" />
                <Badge variant="secondary" className={cn(
                  "text-xs",
                  item.category === 'Technology' && "bg-finBlue/10 text-finBlue",
                  item.category === 'Crypto' && "bg-finPurple/10 text-finPurple",
                  item.category === 'Economy' && "bg-finGreen/10 text-finGreen",
                  item.category === 'Earnings' && "bg-warning/10 text-warning"
                )}>
                  {item.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
