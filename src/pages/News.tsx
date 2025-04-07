
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { NewsFeed } from '@/components/dashboard/NewsFeed';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Clock, TrendingUp, BookmarkPlus, ArrowRight, MessageSquare, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TradingViewWidget } from '@/components/dashboard/TradingViewWidget';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Mock additional news data
const featuredNews = [
  {
    id: 101,
    title: 'Fed Chair Powell signals continued rate cuts amid improving inflation outlook',
    source: 'The Wall Street Journal',
    time: '2h ago',
    category: 'Economy',
    content: 'Federal Reserve Chair Jerome Powell indicated that the central bank is likely to continue cutting interest rates as inflation shows signs of returning to the 2% target level, though he cautioned the pace would be data-dependent.',
    readTime: '4 min read',
    views: 1280,
    comments: 34
  },
  {
    id: 102,
    title: 'Nvidia unveils next-generation AI chips, shares surge 8%',
    source: 'Reuters',
    time: '4h ago',
    category: 'Technology',
    content: 'Nvidia Corp unveiled its latest generation of AI processors at its annual developer conference, with CEO Jensen Huang claiming performance improvements of up to 30x for certain workloads compared to previous models.',
    readTime: '3 min read',
    views: 962,
    comments: 21
  }
];

// Market highlights data
const marketHighlights = [
  { name: 'S&P 500', value: '5,246.55', change: '+0.52%', isPositive: true },
  { name: 'Nasdaq', value: '16,384.47', change: '+0.85%', isPositive: true },
  { name: 'Bitcoin', value: '$64,580.27', change: '-1.23%', isPositive: false },
  { name: 'Gold', value: '$2,329.80', change: '+0.37%', isPositive: true },
];

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('featured');
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <DashboardLayout>
      <div className="mb-6 relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-40 w-80 h-80 bg-finPurple/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-finBlue/5 rounded-full blur-3xl pointer-events-none" />
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          News & Insights
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Stay informed with the latest financial news, market trends, and expert analysis to make informed investment decisions.
        </p>
        
        {/* Market highlights */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-8 bg-secondary/80 rounded-lg w-[120px] animate-pulse"></div>
            ))
          ) : (
            marketHighlights.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-secondary/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="font-medium">{item.name}</span>
                <Separator orientation="vertical" className="h-4" />
                <span>{item.value}</span>
                <span className={cn(
                  "text-xs font-medium",
                  item.isPositive ? "text-success" : "text-danger-500"
                )}>
                  {item.change}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Featured Articles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-finPurple" />
              Featured Stories
            </h2>
            <Tabs 
              defaultValue="featured" 
              className="w-auto"
              onValueChange={setActiveSection}
            >
              <TabsList className="bg-secondary/50 backdrop-blur-sm">
                <TabsTrigger value="featured">
                  Featured
                </TabsTrigger>
                <TabsTrigger value="trending">
                  Trending
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse glass-card border-none">
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-secondary/80 rounded-md w-[85%] mb-2"></div>
                    <div className="h-3 bg-secondary/60 rounded-md w-[60%]"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-24 bg-secondary/40 rounded-md w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredNews.map((article, index) => (
                <Card 
                  key={article.id} 
                  className="glass-card card-hover border-none shadow-md relative overflow-hidden group animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-finPurple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardHeader className="pb-2 relative z-10">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl font-medium group-hover:text-finPurple transition-colors">
                        {article.title}
                      </CardTitle>
                      <Badge variant="outline" className="ml-2 bg-primary/10 border-primary/20 animate-fade-in">
                        Featured
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span className="font-medium">{article.source}</span>
                      <div className="mx-2 h-1 w-1 rounded-full bg-border" />
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.time}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground">{article.content}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Badge variant="secondary" className={cn(
                        article.category === 'Technology' && "bg-finBlue/10 text-finBlue",
                        article.category === 'Economy' && "bg-finGreen/10 text-finGreen"
                      )}>
                        {article.category}
                      </Badge>
                      <Badge variant="outline" className="bg-transparent">
                        {article.readTime}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-3 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 relative z-10">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{article.comments}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary group-hover:bg-white/20">
                        Read more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-8">
            <NewsFeed />
          </div>
        </div>
        
        {/* Market summary and financial chart */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-finBlue" />
            Market Summary
          </h2>
          
          <Card className="glass-card card-hover border-none shadow-md overflow-hidden h-[500px]">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center bg-secondary/20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <TradingViewWidget 
                symbol="FOREXCOM:SPXUSD"
                widgetType="chart"
                theme="light"
                style="area"
                height={500}
                autosize={false}
              />
            )}
          </Card>
          
          <Card className="glass-card card-hover border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <BookmarkPlus className="h-4 w-4 text-finPurple" />
                Recommended
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-6 bg-secondary/60 rounded-md w-full animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/40 transition-colors">
                    <span className="font-medium">Tech Sector Analysis</span>
                    <Badge variant="outline" className="bg-finBlue/10 text-finBlue">New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/40 transition-colors">
                    <span className="font-medium">Crypto Market Outlook</span>
                    <Badge variant="outline" className="bg-finPurple/10 text-finPurple">Popular</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/40 transition-colors">
                    <span className="font-medium">Interest Rates Impact</span>
                    <Badge variant="outline" className="bg-warning/10 text-warning">Analysis</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default News;
