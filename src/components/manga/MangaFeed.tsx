
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Image, MessageSquare, Heart, Bookmark, Share, Smile, ImageIcon, MapPin } from 'lucide-react';

const CreatePost = () => {
  return (
    <Card className="glass-card card-hover mb-6">
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/lovable-uploads/738b9df4-b4b3-474c-ac28-8fb8b3bab11a.png" alt="User" />
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input 
              placeholder="What's happening in your manga world?" 
              className="bg-secondary/50 border-0 text-sm focus-visible:ring-finPurple"
            />
            <div className="flex justify-between mt-3">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-finPurple">
                  <Image size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-finPurple">
                  <Smile size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-finPurple">
                  <MapPin size={18} />
                </Button>
              </div>
              <Button className="rounded-full bg-finPurple hover:bg-finPurple/90 px-5">Share!</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Post = ({ 
  user, username, time, content, images, likes, comments, isPro = false
}: { 
  user: string; 
  username: string; 
  time: string; 
  content: string; 
  images?: string[]; 
  likes: number; 
  comments: number;
  isPro?: boolean;
}) => {
  return (
    <Card className="glass-card card-hover mb-6 overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user} alt="User" />
            <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{username}</span>
              {isPro && (
                <Badge variant="secondary" className="bg-finGreen/20 text-finGreen text-xs font-medium">
                  PRO
                </Badge>
              )}
              <span className="text-muted-foreground text-xs">{time}</span>
            </div>
            <div className="text-sm text-muted-foreground">@{username.toLowerCase().replace(/\s+/g, '')}</div>
          </div>
        </div>
        
        <p className="text-sm mb-4">{content}</p>
        
        {images && images.length > 0 && (
          <div className={`grid ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mb-4`}>
            {images.map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden aspect-video bg-secondary">
                <img src={img} alt={`Post image ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-between text-muted-foreground text-sm pt-2 border-t">
          <Button variant="ghost" size="sm" className="gap-1">
            <Heart size={16} /> {likes}
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageSquare size={16} /> {comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Bookmark size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const TrendingItem = ({ rank, title, posts }: { rank: number; title: string; posts: number }) => {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center gap-2">
        <span className="text-finPurple font-semibold">#{rank}</span>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground">{posts.toLocaleString()} posts</p>
    </div>
  );
};

const FollowSuggestion = ({ name, username, avatar }: { name: string; username: string; avatar: string }) => {
  return (
    <div className="flex items-center justify-between mb-3 last:mb-0">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-muted-foreground">@{username}</div>
        </div>
      </div>
      <Button size="sm" variant="outline" className="rounded-full h-8 text-xs px-3 border-finPurple text-finPurple hover:bg-finPurple/10">
        Follow
      </Button>
    </div>
  );
};

const MangaFeed = () => {
  return (
    <div className="container max-w-screen-xl mx-auto py-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">MangaVerse Feed</h1>
        
        <Tabs defaultValue="popular" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
            <TabsTrigger value="popular" className="data-[state=active]:bg-finPurple data-[state=active]:text-white">
              ✨ Popular
            </TabsTrigger>
            <TabsTrigger value="mySeries" className="data-[state=active]:bg-finPurple data-[state=active]:text-white">
              🌟 My Series
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <CreatePost />
        
        <Post 
          user="/lovable-uploads/db7868f0-b0c6-4e77-b603-c2f47a3d03fb.png"
          username="Julio Langosh"
          time="about 4 hours ago"
          content="Pecto ago astrum derelinquo. Adstringo ubi abstergo excepturi sum vallum cupiditate turba temperantia. Thalassinus villa illum vulgo crapula labore sequi somniculosus vinitor."
          images={[
            "/lovable-uploads/3eddecdc-03dc-4284-aefc-e8df3f9278f4.png", 
            "/lovable-uploads/ec729614-c163-4c73-8066-ca8131db151e.png"
          ]}
          likes={42}
          comments={15}
          isPro={true}
        />
        
        <Post 
          user="/lovable-uploads/cd3ed2c0-973e-4451-a42e-c4fc768928fa.png"
          username="Mika Tanaka"
          time="8 hours ago"
          content="Just finished reading the latest chapter of One Piece! Oda's artwork is absolutely mind-blowing. The level of detail and storytelling is unmatched!"
          likes={128}
          comments={37}
        />
        
        <Post 
          user="/lovable-uploads/738b9df4-b4b3-474c-ac28-8fb8b3bab11a.png"
          username="Travis Mante"
          time="1 day ago"
          content="Working on a new fan-art for Attack on Titan's finale. The series has been such an incredible journey!"
          images={["/lovable-uploads/e54e8189-5fa3-481d-aa12-2937d30541e0.png"]}
          likes={256}
          comments={42}
        />
      </div>
      
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Trends for you</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendingItem rank={1} title="One Piece Chapter 1089" posts={128942} />
            <TrendingItem rank={2} title="Attack on Titan Finale" posts={98721} />
            <TrendingItem rank={3} title="Jujutsu Kaisen Movie" posts={87432} />
            <TrendingItem rank={4} title="Demon Slayer Season 4" posts={76543} />
            <TrendingItem rank={5} title="My Hero Academia" posts={62198} />
            
            <Button variant="link" className="text-finPurple p-0 h-auto mt-2">Show more</Button>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Who to follow</CardTitle>
          </CardHeader>
          <CardContent>
            <FollowSuggestion 
              name="Elsa Lubowitz" 
              username="elsa85" 
              avatar="/lovable-uploads/db7868f0-b0c6-4e77-b603-c2f47a3d03fb.png" 
            />
            <FollowSuggestion 
              name="Carla Brown" 
              username="mangaqueen" 
              avatar="/lovable-uploads/cd3ed2c0-973e-4451-a42e-c4fc768928fa.png" 
            />
            <FollowSuggestion 
              name="Alex Chen" 
              username="mangaartist" 
              avatar="/lovable-uploads/738b9df4-b4b3-474c-ac28-8fb8b3bab11a.png" 
            />
            
            <Button variant="link" className="text-finPurple p-0 h-auto mt-2">Show more</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MangaFeed;
