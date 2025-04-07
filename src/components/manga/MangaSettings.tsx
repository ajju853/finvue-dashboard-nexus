
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon, Bell, Globe, Lock, Shield, Eye, UserCircle, Palette } from 'lucide-react';

const SettingsSection = ({ 
  icon, 
  title, 
  children 
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode;
}) => {
  return (
    <Card className="glass-card mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const SettingsItem = ({ 
  label, 
  description, 
  children 
}: { 
  label: string; 
  description?: string; 
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between items-center py-4 border-b last:border-b-0">
      <div>
        <h3 className="font-medium">{label}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
};

const MangaSettings = () => {
  return (
    <div className="container max-w-screen-xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your MangaVerse experience!</p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <SettingsSection icon={<UserCircle className="h-5 w-5 text-finPurple" />} title="Account">
          <SettingsItem label="Username">
            <Input value="manga_lover42" className="max-w-[320px]" />
          </SettingsItem>
          
          <SettingsItem label="Email">
            <Input value="user@example.com" className="max-w-[320px]" />
          </SettingsItem>
          
          <SettingsItem label="Password">
            <Button variant="outline" className="bg-secondary border-0">Change Password</Button>
          </SettingsItem>
        </SettingsSection>
        
        <SettingsSection icon={<Palette className="h-5 w-5 text-finPurple" />} title="Appearance">
          <SettingsItem 
            label="Dark Mode" 
            description="Switch between light and dark themes"
          >
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-finPurple" />
              <Switch />
              <Moon className="h-4 w-4 text-finPurple" />
            </div>
          </SettingsItem>
          
          <SettingsItem 
            label="High Contrast" 
            description="Increase contrast for better readability"
          >
            <Switch />
          </SettingsItem>
          
          <SettingsItem 
            label="Animations" 
            description="Enable or disable UI animations"
          >
            <Switch defaultChecked />
          </SettingsItem>
        </SettingsSection>
        
        <SettingsSection icon={<Bell className="h-5 w-5 text-finPurple" />} title="Notifications">
          <SettingsItem 
            label="Push Notifications" 
            description="Receive notifications even when you're not using the app"
          >
            <Switch defaultChecked />
          </SettingsItem>
          
          <SettingsItem 
            label="New Followers" 
            description="Get notified when someone follows you"
          >
            <Switch defaultChecked />
          </SettingsItem>
          
          <SettingsItem 
            label="Post Likes" 
            description="Get notified when someone likes your post"
          >
            <Switch defaultChecked />
          </SettingsItem>
          
          <SettingsItem 
            label="Comments" 
            description="Get notified when someone comments on your post"
          >
            <Switch defaultChecked />
          </SettingsItem>
          
          <SettingsItem 
            label="Direct Messages" 
            description="Get notified when you receive a message"
          >
            <Switch defaultChecked />
          </SettingsItem>
        </SettingsSection>
        
        <SettingsSection icon={<Privacy className="h-5 w-5 text-finPurple" />} title="Privacy">
          <SettingsItem 
            label="Private Account" 
            description="Only approved followers can see your posts"
          >
            <Switch />
          </SettingsItem>
          
          <SettingsItem 
            label="Activity Status" 
            description="Allow others to see when you're online"
          >
            <Switch defaultChecked />
          </SettingsItem>
          
          <SettingsItem 
            label="Read Receipts" 
            description="Show when you've read messages"
          >
            <Switch defaultChecked />
          </SettingsItem>
          
          <SettingsItem 
            label="Data Sharing" 
            description="Allow collection of usage data to improve services"
          >
            <Switch defaultChecked />
          </SettingsItem>
        </SettingsSection>
      </div>
    </div>
  );
};

// We need to create a simple Privacy icon since it's not in lucide-react
const Privacy = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    <circle cx="12" cy="16" r="1"></circle>
  </svg>
);

export default MangaSettings;
