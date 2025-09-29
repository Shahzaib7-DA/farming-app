import { DeleteProfileButton } from '@/components/DeleteProfileButton';
import { Link } from 'react-router-dom';
import { MessageCircle, User, FileText, TrendingUp, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import HeroSwiper from '@/components/HeroSwiper';
import MarketInfoCarousel from '@/components/MarketInfoCarousel';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useLanguage } from '@/hooks/useLanguage';
import { FarmerProfile } from '@/types/farmer';
import React from 'react';

import { MovingLine } from '@/components/MovingLine';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

import { Note } from '@/components/Note';

function Home() {
  const [farmerProfile] = useLocalStorage<FarmerProfile | null>('farmerProfile', null);
  const { t } = useLanguage();
  const isOnline = useNetworkStatus();

  // Note summary popup state
  const [note, setNote] = React.useState<null | { type: 'market' | 'pest' | 'weather' | 'scheme', message: string }>(null);

  React.useEffect(() => {
    function handleSummaryEvent(e: any) {
      const { summaryEn, summaryMl, summaryKey } = e.detail || {};
      if (!summaryKey) return;
      let type: 'market' | 'pest' | 'weather' | 'scheme' = 'market';
      if (summaryKey === 'market') type = 'market';
      else if (summaryKey === 'pest') type = 'pest';
      else if (summaryKey === 'weather') type = 'weather';
      else if (summaryKey === 'schemes') type = 'scheme';
      setNote({ type, message: summaryEn + "\n\n" + summaryMl });
    }
    window.addEventListener("ask-assistant-summary", handleSummaryEvent);
    return () => window.removeEventListener("ask-assistant-summary", handleSummaryEvent);
  }, []);

  return (
    <Layout title={t('appTitle')}>
      {/* Show Note summary popup if present */}
      {note && (
        <Note
          type={note.type}
          message={note.message}
          onClose={() => setNote(null)}
          duration={15000}
        />
      )}
      {/* MovingLine only when offline, between header and delete profile button */}
      {!isOnline && <MovingLine isOffline={!isOnline} />}
      <div className="space-y-8">
        {/* Delete profile button for user to clear farm profile and activities */}
        <div className="flex justify-end">
          <DeleteProfileButton />
        </div>
        {/* Modern Swiper Hero Banner */}
        <HeroSwiper />
        {/* Enhanced Profile Status */}
        {farmerProfile ? (
          <div className="animate-fade-in">
            <Card className="relative overflow-hidden border-success/20 bg-gradient-to-br from-card to-success/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-success" />
                  </div>
                  {t('yourProfile')}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-3">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {t('name')}
                    </span>
                    <span className="font-semibold">{farmerProfile.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      {t('district')}
                    </span>
                    <span className="font-semibold">{farmerProfile.district}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-success rounded-full"></span>
                      {t('primaryCrop')}
                    </span>
                    <span className="font-semibold">{farmerProfile.crop}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="animate-scale-in">
            <Card className="border-warning/30 bg-gradient-to-br from-warning/5 to-warning/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-warning/20 rounded-full -translate-y-12 -translate-x-12"></div>
              <CardHeader className="relative">
                <CardTitle className="text-warning flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center animate-pulse">
                    <User className="h-5 w-5 text-warning" />
                  </div>
                  {t('setupRequired')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('setupDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Button asChild className="w-full bg-gradient-to-r from-warning to-warning/80 hover:from-warning/90 hover:to-warning/70 text-warning-foreground shadow-lg hover:shadow-warning/25 transition-all duration-300 hover:scale-[1.02]">
                  <Link to="/profile" className="flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    {t('setupNow')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Quick Actions */}
        <div className="grid gap-6 animate-fade-in">
          <Card className="group hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:scale-[1.02] border-accent/20 bg-gradient-to-br from-card to-accent/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <MessageCircle className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <div className="text-lg font-bold">Ask Agricultural Query</div>
                  <div className="text-sm text-muted-foreground">Get instant expert advice</div>
                </div>
              </CardTitle>
              <CardDescription className="text-base">
                Get instant answers to your farming questions, even offline. Our AI assistant is trained on agricultural best practices.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button asChild variant="outline" className="w-full border-accent/30 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:shadow-lg">
                <Link to="/query" className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Start Asking Questions
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] border-primary/20 bg-gradient-to-br from-card to-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <FileText className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <div className="text-lg font-bold">Log Farm Activities</div>
                  <div className="text-sm text-muted-foreground">Track your farming progress</div>
                </div>
              </CardTitle>
              <CardDescription className="text-base">
                Track your daily farming activities for better insights and personalized recommendations based on your farming patterns.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button asChild variant="outline" className="w-full border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg">
                <Link to="/activities" className="flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  Manage Activities
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Market Info & Alerts Carousel */}
        <MarketInfoCarousel />

        {/* Crop Disease Detection Coming Soon */}
        <div className="mt-10 animate-fade-in">
          <Card className="group relative overflow-hidden border-2 border-pink-400/30 bg-gradient-to-br from-pink-100/70 to-pink-200/30 dark:from-pink-900/60 dark:to-pink-950/80 shadow-xl hover:shadow-pink-400/20 transition-all duration-300 hover:scale-[1.03]">
            {/* Decorative Blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300/20 dark:bg-pink-800/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-400/20 dark:bg-pink-900/40 rounded-full blur-2xl animate-pulse" />
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3">
                <div className="w-14 h-14 bg-pink-200/40 dark:bg-pink-900/60 rounded-xl flex items-center justify-center group-hover:bg-pink-200/60 dark:group-hover:bg-pink-800/80 transition-colors duration-300 shadow-lg">
                  <TrendingUp className="h-7 w-7 text-pink-500 dark:text-pink-300 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <div className="text-xl font-extrabold tracking-tight text-pink-700 dark:text-pink-200 flex items-center">Crop Disease Detection <span className='ml-2 px-2 py-1 text-xs rounded-full bg-pink-500 dark:bg-pink-700 text-white shadow-md animate-bounce'>Coming Soon</span></div>
                  <div className="text-sm text-pink-700/80 dark:text-pink-200/80">Detect diseases with just one photo click</div>
                </div>
              </CardTitle>
              <CardDescription className="text-base mt-2 text-pink-900 dark:text-pink-100/90 font-medium">
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5 text-pink-400 dark:text-pink-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a9 9 0 11-6.32-2.59" /></svg>
                  Snap a photo of your crop and instantly detect diseases using AI.
                </span>
                <br />
                <span className="inline-flex items-center gap-2 mt-1">
                  <svg className="w-5 h-5 text-pink-400 dark:text-pink-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                  Early detection helps you take action fast and protect your yield.
                </span>
                <br />
                <span className="font-bold text-pink-500 dark:text-pink-300">Coming Soon!</span>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Home;