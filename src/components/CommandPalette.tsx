import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { defaultCommands } from '@/hooks/useCommandPalette';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Calendar,
  FileText,
  LifeBuoy,
  Clock,
  Zap,
} from 'lucide-react';

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  navigation: <ArrowRight className="w-4 h-4" />,
  action: <Zap className="w-4 h-4" />,
  booking: <Calendar className="w-4 h-4" />,
  policy: <FileText className="w-4 h-4" />,
  support: <LifeBuoy className="w-4 h-4" />,
};

const categoryLabels: Record<string, string> = {
  navigation: 'Navigation',
  action: 'Quick Actions',
  booking: 'Bookings',
  policy: 'Policies',
  support: 'Help & Support',
};

export default function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('cmdPaletteRecents');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  // Ctrl+K / Cmd+K keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
      // ESC to close
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const handleSelect = (cmd: any) => {
    const search = cmd.title;
    const recents = [search, ...recentSearches.filter((s) => s !== search)].slice(0, 5);
    setRecentSearches(recents);
    localStorage.setItem('cmdPaletteRecents', JSON.stringify(recents));

    setOpen(false);
    setTimeout(() => cmd.execute(), 100);
  };

  // Group commands by category
  const groupedCommands = defaultCommands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) {
        acc[cmd.category] = [];
      }
      acc[cmd.category].push(cmd);
      return acc;
    },
    {} as Record<string, typeof defaultCommands>
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search hotels, bookings, help... (⌘K)" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recentSearches.map((search) => (
                <CommandItem
                  key={search}
                  onSelect={() => {
                    const cmd = defaultCommands.find((c) => c.title === search);
                    if (cmd) handleSelect(cmd);
                  }}
                  className="cursor-pointer"
                >
                  <Clock className="mr-2 h-4 w-4 opacity-50" />
                  <span>{search}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Grouped Commands */}
        {Object.entries(groupedCommands).map(([category, commands]) => (
          <div key={category}>
            <CommandGroup heading={categoryLabels[category]}>
              {commands.map((cmd) => (
                <CommandItem key={cmd.id} onSelect={() => handleSelect(cmd)} className="cursor-pointer">
                  <span className="mr-2 h-4 w-4">{categoryIcons[category]}</span>
                  <div className="flex-1">
                    <div className="font-medium">{cmd.title}</div>
                    {cmd.description && <div className="text-xs text-muted-foreground mt-0.5">{cmd.description}</div>}
                  </div>
                  {cmd.keywords && <Badge variant="outline" className="ml-2 text-xs">{cmd.keywords[0]}</Badge>}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </div>
        ))}

        {/* Keyboard Shortcuts Hint */}
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          <p>💡 Tip: Use ↑↓ to navigate, Enter to select, ESC to close</p>
        </div>
      </CommandList>
    </CommandDialog>
  );
}
