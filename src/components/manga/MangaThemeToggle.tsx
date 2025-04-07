
import React from 'react';
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';

export function MangaThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="w-full justify-between items-center"
      size="sm"
    >
      <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
      {theme === "light" ? (
        <Sun size={16} className="text-finPurple" />
      ) : (
        <Moon size={16} className="text-finPurple" />
      )}
    </Button>
  );
}
