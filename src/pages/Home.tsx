import { Link } from 'react-router-dom';
import { MessageCircle, User, FileText, TrendingUp, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FarmerProfile } from '@/types/farmer';

export default function Home() {
  const [farmerProfile] = useLocalStorage<FarmerProfile | null>('farmerProfile', null);

  return (
    <Layout title="Agricultural Assistant">
      <div className="space-y-8">
        {/* Enhanced Welcome Slideshow */}
        <div className="relative overflow-hidden rounded-3xl">
          <Carousel className="w-full">
            <CarouselContent>
              {/* Slide 1: Welcome to KrishiSakhi */}
              <CarouselItem>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-success/15 rounded-3xl"></div>
                  
                  {/* Floating Creative Elements */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute top-16 right-12 w-8 h-8 bg-gradient-to-br from-success/40 to-accent/40 rounded-full animate-bounce opacity-70"></div>
                  <div className="absolute bottom-12 left-16 w-12 h-12 bg-gradient-to-br from-primary/30 to-success/30 rounded-full animate-pulse opacity-50"></div>
                  <div className="absolute bottom-8 right-8 w-6 h-6 bg-gradient-to-br from-accent/50 to-primary/50 rounded-full animate-bounce opacity-80"></div>
                  
                  {/* Floating Icons */}
                  <div className="absolute top-20 right-20 text-2xl animate-bounce opacity-30">🌱</div>
                  <div className="absolute bottom-20 left-20 text-xl animate-pulse opacity-40">🚜</div>
                  <div className="absolute top-32 left-32 text-lg animate-bounce opacity-35">☀️</div>
                  
                  <div className="relative text-center space-y-6 py-16 px-6 backdrop-blur-[1px]">
                    {/* Enhanced Central Icon with Ripple Effect */}
                    <div className="relative mx-auto w-28 h-28">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full animate-ping opacity-20"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-accent to-success rounded-full animate-pulse opacity-30"></div>
                      <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-xl shadow-primary/20 animate-bounce-gentle border-2 border-white/20">
                        <span className="text-4xl animate-pulse filter drop-shadow-lg">🌾</span>
                      </div>
                    </div>
                    
                    <div className="animate-fade-in space-y-4 relative">
                      {/* Decorative Lines */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
                      
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%] relative">
                        {farmerProfile ? `Welcome back, ${farmerProfile.name}!` : 'Welcome to KrishiSakhi'}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary via-accent to-success rounded-full opacity-30"></div>
                      </h2>
                      
                      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed relative bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                        {farmerProfile 
                          ? `Your intelligent farming companion for ${farmerProfile.crop} cultivation in ${farmerProfile.district}` 
                          : 'Your intelligent agricultural assistant - empowering farmers with smart solutions'
                        }
                      </p>
                      
                      {farmerProfile && (
                        <div className="animate-scale-in">
                          <div className="relative inline-flex items-center justify-center gap-2 bg-success/15 text-success px-6 py-3 rounded-full text-base font-medium border border-success/30 backdrop-blur-sm shadow-lg shadow-success/10">
                            <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-success/5 rounded-full"></div>
                            <div className="relative flex items-center gap-2">
                              <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow-sm shadow-success/50"></div>
                              <span className="bg-gradient-to-r from-success to-success/80 bg-clip-text text-transparent font-semibold">Profile Active - Ready to Assist</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Decorative Bottom Line */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-success to-transparent opacity-40"></div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 2: Ask Query */}
              <CarouselItem>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/15 rounded-3xl"></div>
                  <div className="relative text-center space-y-6 py-16 px-6">
                    <div className="animate-bounce-gentle mx-auto w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-xl">
                      <MessageCircle className="h-12 w-12 text-white animate-pulse" />
                    </div>
                    <div className="animate-fade-in space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                        Ask Agricultural Queries
                      </h2>
                      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Get instant expert advice on crop diseases, pest control, soil health, and farming techniques. Our AI is trained on agricultural best practices.
                      </p>
                      <Button asChild className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:scale-105 px-8 py-3 text-lg">
                        <Link to="/query" className="flex items-center gap-3">
                          <MessageCircle className="h-5 w-5" />
                          Start Asking Questions
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3: Log Activities */}
              <CarouselItem>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-success/20 via-primary/10 to-success/15 rounded-3xl"></div>
                  <div className="relative text-center space-y-6 py-16 px-6">
                    <div className="animate-bounce-gentle mx-auto w-24 h-24 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center shadow-xl">
                      <FileText className="h-12 w-12 text-white animate-pulse" />
                    </div>
                    <div className="animate-fade-in space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-success via-primary to-success bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                        Track Farm Activities
                      </h2>
                      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Log your daily farming activities, track progress, and get personalized recommendations based on your farming patterns and practices.
                      </p>
                      <Button asChild className="bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90 text-white shadow-lg hover:shadow-success/25 transition-all duration-300 hover:scale-105 px-8 py-3 text-lg">
                        <Link to="/activities" className="flex items-center gap-3">
                          <FileText className="h-5 w-5" />
                          Manage Activities
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 4: Market Prices & Schemes */}
              <CarouselItem>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-warning/20 via-primary/10 to-warning/15 rounded-3xl"></div>
                  <div className="relative text-center space-y-6 py-16 px-6">
                    <div className="animate-bounce-gentle mx-auto w-24 h-24 bg-gradient-to-br from-warning to-primary rounded-full flex items-center justify-center shadow-xl">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-6 w-6 text-white" />
                        <Volume2 className="h-6 w-6 text-white animate-pulse" />
                      </div>
                    </div>
                    <div className="animate-fade-in space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warning via-primary to-warning bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                        Market Prices & Schemes
                      </h2>
                      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Stay updated with latest market prices for your crops and discover government schemes that can benefit your farming operations.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button className="bg-gradient-to-r from-warning to-primary hover:from-warning/90 hover:to-primary/90 text-white shadow-lg hover:shadow-warning/25 transition-all duration-300 hover:scale-105 px-6 py-3">
                          <TrendingUp className="h-5 w-5 mr-2" />
                          View Market Prices
                        </Button>
                        <Button variant="outline" className="border-warning/30 hover:bg-warning hover:text-warning-foreground transition-all duration-300 px-6 py-3">
                          <Volume2 className="h-5 w-5 mr-2" />
                          Latest Schemes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            {/* Custom Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <CarouselPrevious className="relative left-0 transform-none bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white" />
              <CarouselNext className="relative right-0 transform-none bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white" />
            </div>
          </Carousel>
        </div>

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
                  Your Farm Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-3">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Name
                    </span>
                    <span className="font-semibold">{farmerProfile.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      District
                    </span>
                    <span className="font-semibold">{farmerProfile.district}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-success rounded-full"></span>
                      Primary Crop
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
                  Setup Required
                </CardTitle>
                <CardDescription className="text-base">
                  Complete your farmer profile to unlock personalized agricultural assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Button asChild className="w-full bg-gradient-to-r from-warning to-warning/80 hover:from-warning/90 hover:to-warning/70 text-warning-foreground shadow-lg hover:shadow-warning/25 transition-all duration-300 hover:scale-[1.02]">
                  <Link to="/profile" className="flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    Setup Profile Now
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

        {/* Market Prices */}
        <Card className="relative overflow-hidden border-success/20 bg-gradient-to-br from-card to-success/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <span className="text-success font-bold text-lg">₹</span>
              </div>
              Latest Market Prices
            </CardTitle>
            <CardDescription>
              Current market rates for major crops in your region
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search crops..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-success/50 focus:border-success"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const items = document.querySelectorAll('.crop-item') as NodeListOf<HTMLElement>;
                  items.forEach(item => {
                    const cropName = item.querySelector('.crop-name')?.textContent?.toLowerCase();
                    if (cropName?.includes(searchTerm)) {
                      item.style.display = 'flex';
                    } else {
                      item.style.display = 'none';
                    }
                  });
                }}
              />
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {[
                { name: 'Rice (Paddy)', price: '2,850', unit: 'per quintal', trend: 'up' },
                { name: 'Wheat', price: '2,100', unit: 'per quintal', trend: 'down' },
                { name: 'Sugarcane', price: '350', unit: 'per quintal', trend: 'up' },
                { name: 'Cotton', price: '6,200', unit: 'per quintal', trend: 'up' },
                { name: 'Turmeric', price: '8,500', unit: 'per quintal', trend: 'down' },
                { name: 'Onion', price: '1,200', unit: 'per quintal', trend: 'up' },
                { name: 'Tomato', price: '2,800', unit: 'per quintal', trend: 'down' },
                { name: 'Potato', price: '1,800', unit: 'per quintal', trend: 'up' }
              ].map((crop, index) => (
                <div key={index} className="crop-item flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50 hover:bg-background/80 transition-colors">
                  <div>
                    <div className="crop-name font-medium text-foreground">{crop.name}</div>
                    <div className="text-sm text-muted-foreground">{crop.unit}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">₹{crop.price}</div>
                    <div className={`text-xs flex items-center gap-1 ${crop.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                      <span>{crop.trend === 'up' ? '↗' : '↘'}</span>
                      {crop.trend === 'up' ? '+2.5%' : '-1.8%'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}