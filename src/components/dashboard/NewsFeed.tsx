
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Newspaper, TrendingUp, Zap, Bookmark, Share2, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  category: string;
  isHot?: boolean;
  type: 'market' | 'global' | 'alert';
  bookmarked?: boolean;
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
  const [items, setItems] = useState<NewsItem[]>(newsItems);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const filteredNews = activeTab === 'all' 
    ? items 
    : items.filter(item => item.type === activeTab);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Bookmark handling
  const handleBookmark = (id: number) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      )
    );
    
    const item = items.find(item => item.id === id);
    const action = item?.bookmarked ? 'removed from' : 'added to';
    
    toast({
      title: `Article ${action} bookmarks`,
      description: item?.bookmarked 
        ? "The article has been removed from your bookmarks"
        : "The article has been saved to your bookmarks",
      duration: 3000,
    });
  };
  
  // Share handling
  const handleShare = (title: string) => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share article",
      description: "Sharing options would appear here",
      duration: 3000,
    });
  };
  
  return (
    <Card className="glass-card card-hover mt-6 overflow-hidden border-none shadow-lg relative backdrop-blur-md bg-white/60 dark:bg-darkBg/60">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-finPurple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-finBlue/10 rounded-full blur-3xl pointer-events-none" />
      
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-finPurple" />
            News & Alerts
            <Badge variant="outline" className="ml-1 bg-finPurple/10 text-finPurple border-finPurple/20">
              {filteredNews.length}
            </Badge>
          </CardTitle>
          <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
            <TabsList className="p-1 bg-secondary/70 backdrop-blur-sm">
              <TabsTrigger value="all" className="data-[state=active]:bg-white/80 dark:data-[state=active]:bg-darkBg/80">All</TabsTrigger>
              <TabsTrigger value="market" className="data-[state=active]:bg-white/80 dark:data-[state=active]:bg-darkBg/80">Market</TabsTrigger>
              <TabsTrigger value="alert" className="data-[state=active]:bg-white/80 dark:data-[state=active]:bg-darkBg/80">Alerts</TabsTrigger>
              <TabsTrigger value="global" className="data-[state=active]:bg-white/80 dark:data-[state=active]:bg-darkBg/80">Global</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col border-b border-border pb-4 last:border-0 last:pb-0 animate-pulse">
                <div className="h-5 bg-secondary/80 rounded-md w-[85%] mb-2"></div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="h-3 bg-secondary/60 rounded-md w-[15%]"></div>
                  <div className="h-2 w-2 rounded-full bg-secondary/60"></div>
                  <div className="h-3 bg-secondary/60 rounded-md w-[10%]"></div>
                  <div className="h-2 w-2 rounded-full bg-secondary/60"></div>
                  <div className="h-3 bg-secondary/60 rounded-md w-[12%]"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
            {filteredNews.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "flex flex-col border-b border-border pb-4 last:border-0 last:pb-0 hover:bg-secondary/30 p-2 rounded-lg transition-all duration-300 group",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-medium line-clamp-2 group-hover:text-finPurple cursor-pointer transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    {item.isHot && (
                      <Badge variant="outline" className="bg-danger-500/10 text-danger-500 border-danger-500/20 animate-pulse">
                        <Zap className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <div className="flex items-center text-muted-foreground">
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
                      item.category === 'Earnings' && "bg-warning/10 text-warning",
                      item.category === 'M&A' && "bg-info/10 text-info",
                      item.category === 'Commodities' && "bg-secondary/80 text-muted-foreground"
                    )}>
                      {item.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            onClick={() => handleBookmark(item.id)}
                            className={cn(
                              "p-1 rounded-full hover:bg-secondary/80",
                              item.bookmarked && "text-finPurple"
                            )}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            onClick={() => handleShare(item.title)}
                            className="p-1 rounded-full hover:bg-secondary/80"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share article</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-1 rounded-full hover:bg-secondary/80">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Read full article</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
