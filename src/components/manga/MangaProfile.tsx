
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Edit, MessageSquare, Heart, Bookmark, Share, Image } from 'lucide-react';

const Post = ({ 
  content, images, likes, comments, time 
}: { 
  content: string; 
  images?: string[]; 
  likes: number; 
  comments: number; 
  time: string;
}) => {
  return (
    <Card className="glass-card card-hover mb-6 overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/lovable-uploads/738b9df4-b4b3-474c-ac28-8fb8b3bab11a.png" alt="Travis Mante" />
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Travis Mante</span>
              <span className="text-muted-foreground text-xs">{time}</span>
            </div>
            <div className="text-sm text-muted-foreground">@charlene51</div>
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

const MangaProfile = () => {
  return (
    <div className="container max-w-screen-xl mx-auto py-6">
      <div className="relative mb-8">
        <div className="h-48 bg-gradient-to-r from-finPurple/80 to-finBlue/80 rounded-xl overflow-hidden">
          <div className="w-full h-full bg-[url('/lovable-uploads/e54e8189-5fa3-481d-aa12-2937d30541e0.png')] bg-cover bg-center opacity-50"></div>
        </div>
        
        <div className="absolute -bottom-16 left-8 p-1 bg-background rounded-full">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src="/lovable-uploads/738b9df4-b4b3-474c-ac28-8fb8b3bab11a.png" alt="Travis Mante" />
            <AvatarFallback className="text-4xl">TM</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="absolute top-4 right-4">
          <Button className="bg-background/20 backdrop-blur-sm hover:bg-background/30">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>
      
      <div className="mt-16 px-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Travis Mante</h1>
            <p className="text-muted-foreground">@charlene51</p>
            <p className="mt-2 max-w-lg">Manga enthusiast | Digital artist | Cat lover 🐱 | Joined April 2023</p>
            
            <div className="flex gap-6 mt-4">
              <div>
                <span className="font-bold">607</span>
                <span className="text-muted-foreground ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold">84,676</span>
                <span className="text-muted-foreground ml-1">Followers</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Badge className="bg-finPurple text-white">Otaku Level 9000</Badge>
              <Badge variant="outline" className="border-finGreen text-finGreen">Premium Member</Badge>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger 
              value="posts" 
              className="flex-1 data-[state=active]:bg-finPurple data-[state=active]:text-white"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="flex-1 data-[state=active]:bg-finPurple data-[state=active]:text-white"
            >
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="likes" 
              className="flex-1 data-[state=active]:bg-finPurple data-[state=active]:text-white"
            >
              Likes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-6 max-w-3xl">
            <Post 
              content="Thesaurus allatus astrum deinde acceptus adeptio abundans certe caecus. Deserunt aer nulla sto vestrum blanditiis. Porro repellendus absum vito tollo suppellex alioqui."
              time="7 days ago"
              likes={156}
              comments={32}
              images={["/lovable-uploads/db7868f0-b0c6-4e77-b603-c2f47a3d03fb.png"]}
            />
            
            <Post 
              content="Just finished a manga binge reading session! My eyes are tired but my soul is happy. What series should I start next? Looking for something with great character development."
              time="2 weeks ago"
              likes={268}
              comments={47}
            />
            
            <Post 
              content="Working on this manga-inspired digital art piece. Any feedback from fellow artists appreciated!"
              time="3 weeks ago"
              likes={384}
              comments={79}
              images={[
                "/lovable-uploads/ec729614-c163-4c73-8066-ca8131db151e.png",
                "/lovable-uploads/3eddecdc-03dc-4284-aefc-e8df3f9278f4.png"
              ]}
            />
          </TabsContent>
          
          <TabsContent value="media" className="mt-6">
            <div className="grid grid-cols-3 gap-4 max-w-4xl">
              {[
                "/lovable-uploads/db7868f0-b0c6-4e77-b603-c2f47a3d03fb.png",
                "/lovable-uploads/ec729614-c163-4c73-8066-ca8131db151e.png",
                "/lovable-uploads/3eddecdc-03dc-4284-aefc-e8df3f9278f4.png",
                "/lovable-uploads/e54e8189-5fa3-481d-aa12-2937d30541e0.png",
                "/lovable-uploads/cd3ed2c0-973e-4451-a42e-c4fc768928fa.png",
                "/lovable-uploads/738b9df4-b4b3-474c-ac28-8fb8b3bab11a.png"
              ].map((img, idx) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-secondary relative group">
                  <img src={img} alt={`Media ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-3 text-white">
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>{Math.floor(Math.random() * 500) + 50}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={16} />
                        <span>{Math.floor(Math.random() * 100) + 5}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="likes" className="mt-6">
            <div className="text-center py-12">
              <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Liked Posts Yet</h3>
              <p className="text-muted-foreground">Posts you like will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MangaProfile;
