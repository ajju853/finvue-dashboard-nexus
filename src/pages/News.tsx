
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { NewsFeed } from '@/components/dashboard/NewsFeed';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Clock } from 'lucide-react';

// Mock additional news data
const featuredNews = [
  {
    id: 101,
    title: 'Fed Chair Powell signals continued rate cuts amid improving inflation outlook',
    source: 'The Wall Street Journal',
    time: '2h ago',
    category: 'Economy',
    content: 'Federal Reserve Chair Jerome Powell indicated that the central bank is likely to continue cutting interest rates as inflation shows signs of returning to the 2% target level, though he cautioned the pace would be data-dependent.'
  },
  {
    id: 102,
    title: 'Nvidia unveils next-generation AI chips, shares surge 8%',
    source: 'Reuters',
    time: '4h ago',
    category: 'Technology',
    content: 'Nvidia Corp unveiled its latest generation of AI processors at its annual developer conference, with CEO Jensen Huang claiming performance improvements of up to 30x for certain workloads compared to previous models.'
  }
];

const News = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">News & Insights</h1>
        <p className="text-muted-foreground">Stay informed with the latest financial news</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {featuredNews.map((article) => (
          <Card key={article.id} className="glass-card card-hover">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl font-medium">{article.title}</CardTitle>
                <Badge variant="outline" className="ml-2 bg-primary/10 border-primary/20">
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
            <CardContent>
              <p className="text-muted-foreground">{article.content}</p>
              <div className="mt-4">
                <Badge variant="secondary" className="bg-finBlue/10 text-finBlue">
                  {article.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <NewsFeed />
    </DashboardLayout>
  );
};

export default News;
