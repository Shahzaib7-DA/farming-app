import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { StatusIndicator } from './StatusIndicator';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DarkModeSwitch } from './DarkModeSwitch';
import { useLanguage } from '@/hooks/useLanguage';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🌾</span>
              </div>
              <div>
                <h1 className="font-bold text-foreground">{t('appTitle')}</h1>
                {title && <p className="text-sm text-muted-foreground">{title}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <DarkModeSwitch />
              <StatusIndicator />
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      <Navigation />
    </div>
  );
}