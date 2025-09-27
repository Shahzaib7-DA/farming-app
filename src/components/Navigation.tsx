import { Link, useLocation } from 'react-router-dom';
import { User, MessageCircle, FileText, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Sprout, label: 'Home' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/query', icon: MessageCircle, label: 'Ask Query' },
  { href: '/activities', icon: FileText, label: 'Activities' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="border-t border-border bg-card">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}