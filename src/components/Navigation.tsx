import { Link, useLocation } from 'react-router-dom';
import { User, MessageCircle, FileText, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

export function Navigation() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { href: '/home', icon: Sprout, label: t('home') },
    { href: '/profile', icon: User, label: t('profile') },
    { href: '/query', icon: MessageCircle, label: t('query') },
    { href: '/activities', icon: FileText, label: t('activities') },
  ];

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