import { Link } from 'react-router-dom';
import { MessageCircle, User, FileText, Wifi } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FarmerProfile } from '@/types/farmer';

export default function Home() {
  const [farmerProfile] = useLocalStorage<FarmerProfile | null>('farmerProfile', null);

  return (
    <Layout title="Agricultural Assistant">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">🌾</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {farmerProfile ? `Welcome back, ${farmerProfile.name}!` : 'Welcome to AgriAssist'}
            </h2>
            <p className="text-muted-foreground">
              Your offline-capable agricultural assistant
            </p>
          </div>
        </div>

        {/* Profile Status */}
        {farmerProfile ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{farmerProfile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">District:</span>
                <span className="font-medium">{farmerProfile.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Crop:</span>
                <span className="font-medium">{farmerProfile.crop}</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="text-warning">Setup Required</CardTitle>
              <CardDescription>
                Please complete your farmer profile to get personalized assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Setup Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid gap-4">
          <Card className="hover:bg-accent/5 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-accent" />
                Ask Agricultural Query
              </CardTitle>
              <CardDescription>
                Get instant answers to your farming questions, even offline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/query">Start Asking</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent/5 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Log Farm Activities
              </CardTitle>
              <CardDescription>
                Track your daily farming activities for better insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/activities">View Activities</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-success" />
              Offline Capability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Works completely offline with local database
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Enhanced responses when online
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Automatic sync when connection is restored
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}