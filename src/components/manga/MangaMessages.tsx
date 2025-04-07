
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Phone, Video, Info, Smile, Image, Send } from 'lucide-react';

interface MessageProps {
  content: string;
  time: string;
  isMine?: boolean;
}

const Message = ({ content, time, isMine = false }: MessageProps) => {
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isMine ? 'bg-finPurple text-white' : 'bg-secondary'} p-3 rounded-2xl rounded-br-none`}>
        <p className="text-sm">{content}</p>
        <p className={`text-xs mt-1 ${isMine ? 'text-white/70' : 'text-muted-foreground'}`}>{time}</p>
      </div>
    </div>
  );
};

interface ContactProps {
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isActive?: boolean;
  isOnline?: boolean;
  onClick: () => void;
}

const Contact = ({ name, avatar, lastMessage, time, unread = 0, isActive = false, isOnline = false, onClick }: ContactProps) => {
  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-secondary/50 ${isActive ? 'bg-secondary' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-finGreen border-2 border-background"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <span className="font-medium truncate">{name}</span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
      </div>
      
      {unread > 0 && (
        <div className="flex-shrink-0 h-5 min-w-5 rounded-full bg-finPurple text-white text-xs flex items-center justify-center">
          {unread}
        </div>
      )}
    </div>
  );
};

const MangaMessages = () => {
  const [activeChat, setActiveChat] = useState(0);
  
  const contacts = [
    {
      id: 0,
      name: "Mika Tanaka",
      avatar: "/lovable-uploads/cd3ed2c0-973e-4451-a42e-c4fc768928fa.png",
      lastMessage: "Did you see the latest chapter?",
      time: "5m",
      unread: 3,
      isOnline: true
    },
    {
      id: 1,
      name: "Kento Yamada",
      avatar: "/lovable-uploads/db7868f0-b0c6-4e77-b603-c2f47a3d03fb.png",
      lastMessage: "The artwork is amazing!",
      time: "1h",
      unread: 0,
      isOnline: true
    },
    {
      id: 2,
      name: "Yui Nakamura",
      avatar: "/lovable-uploads/e54e8189-5fa3-481d-aa12-2937d30541e0.png",
      lastMessage: "Thanks for the recommendation",
      time: "2h",
      unread: 0,
      isOnline: false
    },
    {
      id: 3,
      name: "Takashi Sato",
      avatar: "/lovable-uploads/ec729614-c163-4c73-8066-ca8131db151e.png",
      lastMessage: "Did you get my manga collection file?",
      time: "1d",
      unread: 1,
      isOnline: false
    },
    {
      id: 4,
      name: "Anime Club",
      avatar: "/lovable-uploads/3eddecdc-03dc-4284-aefc-e8df3f9278f4.png",
      lastMessage: "Hiroshi: When is the next meeting?",
      time: "2d",
      unread: 0,
      isOnline: false
    }
  ];
  
  const currentChat = contacts[activeChat];
  
  return (
    <div className="container max-w-screen-xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">Stay connected with your manga friends</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6">
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-10 bg-secondary/50 border-0"
              />
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full bg-transparent justify-around mb-2 px-3">
                <TabsTrigger 
                  value="all" 
                  className="flex-1 data-[state=active]:bg-secondary data-[state=active]:shadow-none"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="unread" 
                  className="flex-1 data-[state=active]:bg-secondary data-[state=active]:shadow-none"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="m-0">
                <div className="px-3 pb-3 max-h-[calc(100vh-230px)] overflow-y-auto">
                  {contacts.map((contact) => (
                    <Contact 
                      key={contact.id}
                      name={contact.name}
                      avatar={contact.avatar}
                      lastMessage={contact.lastMessage}
                      time={contact.time}
                      unread={contact.unread}
                      isActive={activeChat === contact.id}
                      isOnline={contact.isOnline}
                      onClick={() => setActiveChat(contact.id)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="unread" className="m-0">
                <div className="px-3 pb-3">
                  {contacts.filter(c => c.unread > 0).map((contact) => (
                    <Contact 
                      key={contact.id}
                      name={contact.name}
                      avatar={contact.avatar}
                      lastMessage={contact.lastMessage}
                      time={contact.time}
                      unread={contact.unread}
                      isActive={activeChat === contact.id}
                      isOnline={contact.isOnline}
                      onClick={() => setActiveChat(contact.id)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="glass-card overflow-hidden flex flex-col">
          <CardHeader className="pb-3 border-b flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentChat.avatar} alt={currentChat.name} />
                  <AvatarFallback>{currentChat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{currentChat.name}</h3>
                  <p className="text-xs text-finGreen">{currentChat.isOnline ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                  <Phone size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                  <Video size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                  <Info size={18} />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col">
            <div className="text-center my-4">
              <p className="text-xs text-muted-foreground bg-secondary inline-block px-3 py-1 rounded-full">Today</p>
            </div>
            
            {activeChat === 0 ? (
              <>
                <Message 
                  content="Hey there! Did you see the latest One Piece chapter?" 
                  time="10:05 AM" 
                  isMine={false} 
                />
                <Message 
                  content="Not yet! No spoilers please 🙅‍♂️" 
                  time="10:07 AM" 
                  isMine={true} 
                />
                <Message 
                  content="Don't worry, I won't spoil anything. But it's AMAZING!" 
                  time="10:08 AM" 
                  isMine={false} 
                />
                <Message 
                  content="I can't wait to read it tonight" 
                  time="10:09 AM" 
                  isMine={true} 
                />
                <Message 
                  content="The artwork in this chapter is spectacular. Oda really outdid himself" 
                  time="10:12 AM" 
                  isMine={false} 
                />
                <Message 
                  content="Check out this panel (no spoilers)" 
                  time="10:13 AM" 
                  isMine={false} 
                />
                <Message 
                  content="Wow! The detail is incredible!" 
                  time="10:14 AM" 
                  isMine={true} 
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select a message to view the conversation</p>
              </div>
            )}
          </CardContent>
          
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                <Smile size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                <Image size={18} />
              </Button>
              <Input 
                placeholder="Type a message..." 
                className="bg-secondary/50 border-0"
              />
              <Button className="rounded-full aspect-square p-0 bg-finPurple hover:bg-finPurple/90">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MangaMessages;
