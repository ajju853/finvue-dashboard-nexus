
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

export function SmartSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (e.defaultPrevented) return;
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full text-sm text-muted-foreground rounded-lg border border-input bg-background hover:bg-accent"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="flex-1 text-left">Search assets, news, or markets...</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search assets, news, or markets..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Trending Assets">
            <CommandItem>
              <span className="font-medium">Bitcoin (BTC)</span>
              <CommandShortcut>$62,834.28</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span className="font-medium">Ethereum (ETH)</span>
              <CommandShortcut>$3,012.64</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span className="font-medium">Apple Inc. (AAPL)</span>
              <CommandShortcut>$181.92</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent Searches">
            <CommandItem>nvidia stock price</CommandItem>
            <CommandItem>fed interest rate news</CommandItem>
            <CommandItem>btc/usd chart</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Jump To">
            <CommandItem>Portfolio Overview</CommandItem>
            <CommandItem>Market Analysis</CommandItem>
            <CommandItem>News Feed</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
