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
import { LoginIconButton } from '@/components/LoginIconButton';
import { DeleteProfileButton } from '@/components/DeleteProfileButton';

export default function Home() {
  const [farmerProfile] = useLocalStorage<FarmerProfile | null>('farmerProfile', null);
  const { t } = useLanguage();

  return (
    <Layout title={t('appTitle')}>
      {/* Login/Signup icon at top right */}
      <LoginIconButton />
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
      </div>
    </Layout>
  );
}