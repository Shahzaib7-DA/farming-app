import { useState } from 'react';
import { Plus, Calendar, Upload } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { ActivityLog, FarmerProfile } from '@/types/farmer';
import { toast } from '@/hooks/use-toast';

export default function Activities() {
  const [activities, setActivities] = useLocalStorage<ActivityLog[]>('activities', []);
  const [farmerProfile] = useLocalStorage<FarmerProfile | null>('farmerProfile', null);
  const [newActivity, setNewActivity] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isOnline = useNetworkStatus();

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newActivity.trim()) {
      toast({
        title: "Empty Activity",
        description: "Please enter an activity description",
        variant: "destructive"
      });
      return;
    }

    if (!farmerProfile) {
      toast({
        title: "Profile Required",
        description: "Please setup your farmer profile first",
        variant: "destructive"
      });
      return;
    }

    const activity: ActivityLog = {
      id: Date.now().toString(),
      farmerId: farmerProfile.id,
      activity: newActivity.trim(),
      date: new Date(),
      synced: isOnline // If online, mark as synced immediately
    };

    setActivities(prev => [activity, ...prev]);
    setNewActivity('');
    setIsDialogOpen(false);
    
    toast({
      title: "Activity Added",
      description: `Activity ${isOnline ? 'saved and synced' : 'saved locally'}`,
      variant: "default"
    });
  };

  const simulateSync = () => {
    const unsyncedActivities = activities.filter(activity => !activity.synced);
    
    if (unsyncedActivities.length === 0) {
      toast({
        title: "All Synced",
        description: "All activities are already synced",
        variant: "default"
      });
      return;
    }

    // Simulate syncing
    setActivities(prev => 
      prev.map(activity => ({ ...activity, synced: true }))
    );
    
    toast({
      title: "Sync Complete",
      description: `${unsyncedActivities.length} activities synced to cloud`,
      variant: "default"
    });
  };

  const unsyncedCount = activities.filter(activity => !activity.synced).length;

  return (
    <Layout title="Farm Activities">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Activity Log</h2>
          <div className="flex items-center gap-3">
            {unsyncedCount > 0 && isOnline && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={simulateSync}
                className="text-warning border-warning/20"
              >
                <Upload className="mr-2 h-4 w-4" />
                Sync ({unsyncedCount})
              </Button>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Farm Activity</DialogTitle>
                  <DialogDescription>
                    Record your daily farming activities for better tracking
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddActivity} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity Description</Label>
                    <Input
                      id="activity"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      placeholder="e.g., Applied Urea fertilizer, Watered fields, Harvested paddy..."
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      Add Activity
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Sync Status */}
        {unsyncedCount > 0 && (
          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-warning">
                    {unsyncedCount} activities pending sync
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isOnline 
                      ? 'Click sync to upload to cloud' 
                      : 'Will sync automatically when online'
                    }
                  </p>
                </div>
                {isOnline && (
                  <Button variant="outline" size="sm" onClick={simulateSync}>
                    Sync Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Activities List */}
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <Card key={activity.id} className="relative">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">
                        {activity.activity}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          {new Date(activity.date).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      activity.synced 
                        ? 'bg-success/10 text-success' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {activity.synced ? 'Synced' : 'Local'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle className="text-muted-foreground">No Activities Yet</CardTitle>
              <CardDescription>
                Start logging your farming activities to track your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Activity
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}