
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookmarkIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LineChartIcon,
  ListOrderedIcon,
  MessagesSquareIcon,
  BellIcon,
  UserIcon,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, href, active, onClick }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      icon: <HomeIcon size={20} />,
      label: "Overview",
      href: "/",
    },
    {
      icon: <LineChartIcon size={20} />,
      label: "Markets",
      href: "/markets",
    },
    {
      icon: <ListOrderedIcon size={20} />,
      label: "Portfolio",
      href: "/portfolio",
    },
    {
      icon: <BookmarkIcon size={20} />,
      label: "Watchlist",
      href: "/watchlist",
    },
    {
      icon: <MessagesSquareIcon size={20} />,
      label: "News",
      href: "/news",
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border py-4 flex flex-col">
      <div className="px-6 py-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-finPurple">Fin</span>
          <span>Vue</span>
        </h1>
      </div>

      <div className="px-3 py-4 space-y-1">
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

      <div className="mt-auto px-3 py-4">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3 px-3 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 w-full focus-visible:outline-none">
                <Avatar className="h-8 w-8 status-pulse">
                  <AvatarImage src="/lovable-uploads/a997f0ae-ae4e-401b-acaa-1b931c498284.png" alt="User" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start flex-1 text-left">
                  <p className="text-sm font-medium">Alex Kojima</p>
                  <p className="text-xs text-muted-foreground">Premium</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-danger-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
