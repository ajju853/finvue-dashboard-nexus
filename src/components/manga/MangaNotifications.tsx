
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, Heart, MessageSquare, UserPlus, AtSign, AlertCircle, Settings } from 'lucide-react';

type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'system';

interface NotificationProps {
  type: NotificationType;
  user?: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  time: string;
  read?: boolean;
  postImage?: string;
}

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case 'like':
      return <Heart className="text-finPurple h-4 w-4" />;
    case 'comment':
      return <MessageSquare className="text-finBlue h-4 w-4" />;
    case 'follow':
      return <UserPlus className="text-finGreen h-4 w-4" />;
    case 'mention':
      return <AtSign className="text-finPurple-light h-4 w-4" />;
    case 'system':
      return <AlertCircle className="text-neutral h-4 w-4" />;
  }
};

const Notification = ({ type, user, content, time, read = false, postImage }: NotificationProps) => {
  return (
    <div className={`p-4 border-b last:border-b-0 ${read ? 'opacity-70' : 'bg-accent/10'}`}>
      <div className="flex gap-3">
        {user ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{user?.name || "MangaVerse"}</span>
            <div className="bg-secondary rounded-full p-1">
              <NotificationIcon type={type} />
            </div>
            <span className="text-muted-foreground text-xs">{time}</span>
          </div>
          
          <p className="text-sm">
            {content}
          </p>
          
          {!read && (
            <div className="w-2 h-2 rounded-full bg-finPurple absolute top-4 right-4"></div>
          )}
        </div>
        
        {postImage && (
          <div className="flex-shrink-0 h-14 w-14 rounded-md overflow-hidden bg-secondary">
            <img src={postImage} className="w-full h-full object-cover" alt="Post thumbnail" />
          </div>
        )}
      </div>
    </div>
  );
};

const MangaNotifications = () => {
  return (
    <div className="container max-w-screen-xl mx-auto py-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your activity</p>
        </div>
        
        <Button variant="outline" className="gap-2">
          <Settings size={16} />
          Notification Settings
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-4 bg-secondary/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-finPurple data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="mentions" className="data-[state=active]:bg-finPurple data-[state=active]:text-white">
                Mentions
              </TabsTrigger>
              <TabsTrigger value="likes" className="data-[state=active]:bg-finPurple data-[state=active]:text-white">
                Likes
              </TabsTrigger>
              <TabsTrigger value="follows" className="data-[state=active]:bg-finPurple data-[state=active]:text-white">
                Follows
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-0">
              <Notification 
                type="like"
                user={{
                  name: "Mika Tanaka",
                  username: "mikatanaka",
                  avatar: "/lovable-uploads/cd3ed2c0-973e-4451-a42e-c4fc768928fa.png"
                }}
                content="liked your post about One Piece Chapter 1089"
                time="5 minutes ago"
                postImage="/lovable-uploads/3eddecdc-03dc-4284-aefc-e8df3f9278f4.png"
              />
              
              <Notification 
                type="follow"
                user={{
                  name: "Kento Yamada",
                  username: "kentoyamada",
                  avatar: "/lovable-uploads/db7868f0-b0c6-4e77-b603-c2f47a3d03fb.png"
                }}
                content="started following you"
                time="1 hour ago"
              />
              
              <Notification 
                type="comment"
                user={{
                  name: "Yui Nakamura",
                  username: "yuinakamura",
                  avatar: "/lovable-uploads/e54e8189-5fa3-481d-aa12-2937d30541e0.png"
                }}
                content="commented on your post: 'Thanks for the recommendation! I'll check it out.'"
                time="2 hours ago"
                postImage="/lovable-uploads/ec729614-c163-4c73-8066-ca8131db151e.png"
              />
              
              <Notification 
                type="mention"
                user={{
                  name: "Takashi Sato",
                  username: "takashisato",
                  avatar: "/lovable-uploads/ec729614-c163-4c73-8066-ca8131db151e.png"
                }}
                content="mentioned you in a comment: 'Hey @charlene51, did you get my manga collection file?'"
                time="1 day ago"
              />
              
              <Notification 
                type="system"
                content="Your account has been verified! You now have access to premium features."
                time="2 days ago"
                read={true}
              />
              
              <Notification 
                type="like"
                user={{
                  name: "Anime Club",
                  username: "animeclub",
                  avatar: "/lovable-uploads/3eddecdc-03dc-4284-aefc-e8df3f9278f4.png"
                }}
                content="liked your comment on their post"
                time="3 days ago"
                read={true}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Notification Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Heart className="text-finPurple h-5 w-5" />
                    <span>Likes</span>
                  </div>
                  <Badge className="bg-finPurple">24</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="text-finBlue h-5 w-5" />
                    <span>Comments</span>
                  </div>
                  <Badge className="bg-finBlue">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <UserPlus className="text-finGreen h-5 w-5" />
                    <span>New Followers</span>
                  </div>
                  <Badge className="bg-finGreen">15</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <AtSign className="text-finPurple-light h-5 w-5" />
                    <span>Mentions</span>
                  </div>
                  <Badge className="bg-finPurple-light">3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">Your post about <span className="font-medium">Demon Slayer Season 4</span> is trending with <span className="text-finPurple font-medium">76 likes</span>.</p>
                <p className="text-sm">Your fan art received <span className="text-finPurple font-medium">12 new comments</span> in the last 24 hours.</p>
                <p className="text-sm">You gained <span className="text-finGreen font-medium">32 new followers</span> this week.</p>
                
                <Button variant="link" className="text-finPurple p-0 h-auto mt-2">View activity dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MangaNotifications;
