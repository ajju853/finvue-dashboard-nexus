
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  SearchIcon, 
  MessageSquareIcon, 
  Bell, 
  BookmarkIcon, 
  UserIcon, 
  SettingsIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MangaThemeToggle } from './MangaThemeToggle';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ href, icon, label, active }: NavItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3 mb-1 font-medium transition-all",
          active ? 
            "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : 
            "hover:bg-secondary hover:text-foreground"
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const NewPostButton = () => {
  return (
    <Button className="w-full bg-gradient-to-r from-finPurple to-finBlue hover:opacity-90 transition-opacity shadow-md">
      <span className="mr-2">+</span> New Post
    </Button>
  );
};

export function MangaLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentPath = "/mangaverse" + location.pathname.replace("/mangaverse", "");
  
  const navItems = [
    { href: "/mangaverse", icon: <HomeIcon size={20} />, label: "Home" },
    { href: "/mangaverse/explore", icon: <SearchIcon size={20} />, label: "Explore" },
    { href: "/mangaverse/notifications", icon: <Bell size={20} />, label: "Notifications" },
    { href: "/mangaverse/messages", icon: <MessageSquareIcon size={20} />, label: "Messages" },
    { href: "/mangaverse/bookmarks", icon: <BookmarkIcon size={20} />, label: "Bookmarks" },
    { href: "/mangaverse/profile", icon: <UserIcon size={20} />, label: "Profile" },
    { href: "/mangaverse/settings", icon: <SettingsIcon size={20} />, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border py-4 flex flex-col">
        <div className="px-4 py-2">
          <Link to="/mangaverse">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-finPurple to-finBlue">
              MangaVerse
            </h1>
          </Link>
        </div>

        <div className="px-3 py-4 flex-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={currentPath === item.href}
            />
          ))}
        </div>

        <div className="px-3 py-4 mt-auto">
          <div className="space-y-4">
            <NewPostButton />
            <div className="px-3 py-2">
              <MangaThemeToggle />
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar className="h-8 w-8 status-pulse">
                <AvatarImage src="/lovable-uploads/738b9df4-b4b3-474c-ac28-8fb8b3bab11a.png" alt="User" />
                <AvatarFallback>TM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start flex-1 text-left">
                <p className="text-sm font-medium">Travis Mante</p>
                <p className="text-xs text-muted-foreground">@charlene51</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 min-h-screen">
        {children}
      </div>
    </div>
  );
}
