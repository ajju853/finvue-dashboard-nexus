
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Bookmark, BookmarkCheck, Share, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SavedPost = ({ 
  user, 
  username, 
  userAvatar, 
  time, 
  content, 
  images, 
  likes, 
  comments,
  isPro = false,
  saved = true
}: { 
  user: string; 
  username: string; 
  userAvatar: string;
  time: string; 
  content: string; 
  images?: string[]; 
  likes: number; 
  comments: number;
  isPro?: boolean;
  saved?: boolean;
}) => {
  return (
    <Card className="glass-card card-hover mb-6 overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar} alt={user} />
            <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{user}</span>
              {isPro && (
                <Badge variant="secondary" className="bg-finGreen/20 text-finGreen text-xs font-medium">
                  PRO
                </Badge>
              )}
              <span className="text-muted-foreground text-xs">{time}</span>
            </div>
            <div className="text-sm text-muted-foreground">@{username}</div>
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
          <Button variant="ghost" size="sm" className={saved ? "text-finPurple" : ""}>
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </Button>
          <Button variant="ghost" size="sm">
            <Share size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MangaBookmarks = () => {
  return (
    <div className="container max-w-screen-xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Bookmarks</h1>
        <p className="text-muted-foreground">Posts and content you've saved</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search bookmarks..." 
                className="pl-10 bg-secondary/50 border-0"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filter
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-finPurple data-[state=active]:text-white">
                All Saved
              </TabsTrigger>
              <TabsTrigger value="posts" className="data-[state=active]:bg-finPurple data-[state=active]:text-white">
                Posts
              </TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:bg-finPurple data-[state=active]:text-white">
                Media
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <SavedPost 
            user="Julio Langosh"
            username="jlangosh"
            userAvatar="/lovable-uploads/db7868f0-b0c6-4e77-b603-c2f47a3d03fb.png"
            time="2 days ago"
            content="Demon Slayer season finale was absolutely mind-blowing! The animation quality was off the charts. What did everyone think about the ending?"
            images={["/lovable-uploads/3eddecdc-03dc-4284-aefc-e8df3f9278f4.png"]}
            likes={356}
            comments={124}
            isPro={true}
          />
          
          <SavedPost 
            user="Mika Tanaka"
            username="mikatanaka"
            userAvatar="/lovable-uploads/cd3ed2c0-973e-4451-a42e-c4fc768928fa.png"
            time="1 week ago"
            content="Just finished reading Chainsaw Man. Tatsuki Fujimoto's storytelling is absolutely revolutionary. The way he plays with conventional manga tropes while still delivering something utterly original is incredible."
            likes={289}
            comments={78}
          />
          
          <SavedPost 
            user="Anime News Network"
            username="animenewsnetwork"
            userAvatar="/lovable-uploads/ec729614-c163-4c73-8066-ca8131db151e.png"
            time="2 weeks ago"
            content="BREAKING: 'My Hero Academia' manga to receive final arc adaptation as feature film trilogy instead of TV season. Studio Bones promises 'cinematic quality unlike anything seen before in anime adaptations.'"
            images={[
              "/lovable-uploads/e54e8189-5fa3-481d-aa12-2937d30541e0.png", 
              "/lovable-uploads/738b9df4-b4b3-474c-ac28-8fb8b3bab11a.png"
            ]}
            likes={1452}
            comments={573}
            isPro={true}
          />
        </div>
        
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookmarkCheck className="text-finPurple h-5 w-5" />
                Saved Collections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Favorite Series</span>
                  <Badge className="bg-finPurple">12 items</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Art Inspiration</span>
                  <Badge className="bg-finPurple">8 items</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Character Designs</span>
                  <Badge className="bg-finPurple">15 items</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Reading List</span>
                  <Badge className="bg-finPurple">23 items</Badge>
                </div>
                
                <Button variant="link" className="text-finPurple p-0 h-auto mt-2">Create new collection</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recently Viewed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-secondary">
                    <img src="/lovable-uploads/3eddecdc-03dc-4284-aefc-e8df3f9278f4.png" className="w-full h-full object-cover" alt="Thumbnail" />
                  </div>
                  <div>
                    <p className="font-medium">One Piece Chapter 1089</p>
                    <p className="text-xs text-muted-foreground">Viewed 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-center">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-secondary">
                    <img src="/lovable-uploads/ec729614-c163-4c73-8066-ca8131db151e.png" className="w-full h-full object-cover" alt="Thumbnail" />
                  </div>
                  <div>
                    <p className="font-medium">Jujutsu Kaisen Movie</p>
                    <p className="text-xs text-muted-foreground">Viewed yesterday</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-center">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-secondary">
                    <img src="/lovable-uploads/738b9df4-b4b3-474c-ac28-8fb8b3bab11a.png" className="w-full h-full object-cover" alt="Thumbnail" />
                  </div>
                  <div>
                    <p className="font-medium">My Hero Academia News</p>
                    <p className="text-xs text-muted-foreground">Viewed 3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MangaBookmarks;
