
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrendingItem = ({ 
  rank, title, posts, isRising = false 
}: { 
  rank: number; 
  title: string; 
  posts: string | number; 
  isRising?: boolean;
}) => {
  return (
    <Card className="glass-card card-hover mb-4 overflow-hidden border-0 shadow-sm transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-3">
            <span className="text-2xl font-bold text-finPurple">#{rank}</span>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">{typeof posts === 'number' ? posts.toLocaleString() : posts} posts</p>
            </div>
          </div>
          {isRising && (
            <Badge className="bg-finGreen text-white">↑ Rising</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MangaExplore = () => {
  return (
    <div className="container max-w-screen-xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Explore MangaVerse</h1>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search for manga, users, or topics..." 
            className="pl-10 py-6 text-lg rounded-full bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-finPurple shadow-sm"
          />
        </div>
        
        <Tabs defaultValue="trending" className="mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-xl mx-auto">
            <TabsTrigger 
              value="trending" 
              className="data-[state=active]:bg-finPurple data-[state=active]:text-white transition-all duration-200"
            >
              📈 Trending
            </TabsTrigger>
            <TabsTrigger 
              value="people" 
              className="data-[state=active]:bg-finPurple data-[state=active]:text-white transition-all duration-200"
            >
              👥 People
            </TabsTrigger>
            <TabsTrigger 
              value="manga" 
              className="data-[state=active]:bg-finPurple data-[state=active]:text-white transition-all duration-200"
            >
              📚 Manga
            </TabsTrigger>
            <TabsTrigger 
              value="news" 
              className="data-[state=active]:bg-finPurple data-[state=active]:text-white transition-all duration-200"
            >
              📰 News
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TrendingItem rank={1} title="One Piece Chapter 1089" posts="128K" isRising={true} />
              <TrendingItem rank={2} title="Attack on Titan Finale" posts="98K" />
              <TrendingItem rank={3} title="Jujutsu Kaisen Movie" posts="87K" isRising={true} />
              <TrendingItem rank={4} title="Demon Slayer Season 4" posts="76K" />
              <TrendingItem rank={5} title="My Hero Academia" posts="62K" />
              <TrendingItem rank={6} title="Dragon Ball Super" posts="58K" />
              <TrendingItem rank={7} title="Chainsaw Man Part 2" posts="51K" isRising={true} />
              <TrendingItem rank={8} title="Spy x Family Season 2" posts="47K" />
              <TrendingItem rank={9} title="Berserk New Chapter" posts="42K" />
              <TrendingItem rank={10} title="Tokyo Revengers Finale" posts="39K" />
            </div>
          </TabsContent>
          
          <TabsContent value="people" className="mt-6 animate-fade-in">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">People Tab Content</h3>
              <p className="text-muted-foreground">Find and connect with manga enthusiasts</p>
            </div>
          </TabsContent>
          
          <TabsContent value="manga" className="mt-6 animate-fade-in">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Manga Tab Content</h3>
              <p className="text-muted-foreground">Discover popular manga series and chapters</p>
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="mt-6 animate-fade-in">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">News Tab Content</h3>
              <p className="text-muted-foreground">Latest updates from the manga world</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MangaExplore;
