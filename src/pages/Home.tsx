import { Link } from 'react-router-dom';
import { MessageCircle, User, FileText } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FarmerProfile } from '@/types/farmer';

export default function Home() {
  const [farmerProfile] = useLocalStorage<FarmerProfile | null>('farmerProfile', null);

  return (
    <Layout title="Agricultural Assistant">
      <div className="space-y-8">
        {/* Enhanced Welcome Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-success/10 rounded-3xl"></div>
          <div className="relative text-center space-y-6 py-12 px-6">
            <div className="animate-bounce-gentle mx-auto w-20 h-20 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl animate-pulse">🌾</span>
            </div>
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                {farmerProfile ? `Welcome back, ${farmerProfile.name}!` : 'Welcome to KrishiSakhi'}
              </h2>
              <p className="text-lg text-muted-foreground mt-3 max-w-md mx-auto">
                {farmerProfile 
                  ? `Ready to assist with your ${farmerProfile.crop} farming in ${farmerProfile.district}` 
                  : 'Your intelligent offline-capable agricultural assistant'
                }
              </p>
            </div>
            {farmerProfile && (
              <div className="animate-scale-in flex items-center justify-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium border border-success/20 max-w-fit mx-auto">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Profile Active
              </div>
            )}
          </div>
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