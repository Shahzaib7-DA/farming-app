// NEW DEPENDENCIES: axios, date-fns
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { Plus, Calendar, Upload, Trash2, Edit, Send } from 'lucide-react';
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

type ActivityItem = ActivityLog; // date is Date

export default function Activities() {
  const [activities, setActivities] = useLocalStorage<ActivityItem[]>('activities', []);
  const [farmerProfile] = useLocalStorage<FarmerProfile | null>('farmerProfile', null);
  const [newActivity, setNewActivity] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isOnline = useNetworkStatus();

  // UI state for edit
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useLocalStorage<string | null>('activities_last_synced_at', null);

  // Unsynced count
  const unsyncedCount = useMemo(() => activities.filter(a => !a.synced).length, [activities]);

  // --- Helpers ---
  const createActivityObject = useCallback((text: string, farmerId: string | null, synced: boolean): ActivityItem => {
    return {
      id: Date.now().toString(),
      farmerId: farmerId ?? 'unknown',
      activity: text,
      date: new Date(), // store as Date
      synced
    };
  }, []);

  // Format date for display (India timezone)
  const formatDate = (date: Date) => {
    try {
      return format(date, 'dd MMM yyyy, hh:mm a'); // e.g., 28 Sep 2025, 04:30 PM
    } catch {
      return String(date);
    }
  };

  // Add or Update activity
  const handleAddOrUpdateActivity = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newActivity.trim()) {
      toast({ title: 'Empty Activity', description: 'Please enter an activity description', variant: 'destructive' });
      return;
    }
    if (!farmerProfile) {
      toast({ title: 'Profile Required', description: 'Please setup your farmer profile first', variant: 'destructive' });
      return;
    }

    if (editingActivity) {
      // Update existing
      setActivities(prev => prev.map(a => (a.id === editingActivity.id ? { ...a, activity: newActivity.trim() } : a)));
      setEditingActivity(null);
      setNewActivity('');
      setIsDialogOpen(false);
      toast({ title: 'Activity Updated', description: 'Your activity was updated locally', variant: 'default' });
      return;
    }

    const activity = createActivityObject(newActivity.trim(), farmerProfile.id, !!isOnline);
    // Optimistic add
    setActivities(prev => [activity, ...prev]);
    setNewActivity('');
    setIsDialogOpen(false);

    toast({ title: 'Activity Added', description: `Activity ${isOnline ? 'saved and synced' : 'saved locally'}`, variant: 'default' });

    // If online, try sync automatically
    if (isOnline) {
      // auto-trigger sync in background (non-blocking)
      void syncUnsyncedActivities();
    }
  }, [newActivity, farmerProfile, editingActivity, isOnline, createActivityObject, setActivities]);

  // Delete
  const handleDelete = useCallback((id: string) => {
    if (!confirm('Delete this activity?')) return;
    setActivities(prev => prev.filter(a => a.id !== id));
    toast({ title: 'Deleted', description: 'Activity removed', variant: 'default' });
  }, [setActivities]);

  // Edit
  const handleEdit = useCallback((item: ActivityItem) => {
    setEditingActivity(item);
    setNewActivity(item.activity);
    setIsDialogOpen(true);
  }, []);

  // Simulated backend sync function
  const syncUnsyncedActivities = useCallback(async () => {
    const unsynced = activities.filter(a => !a.synced);
    if (unsynced.length === 0) {
      toast({ title: 'All Synced', description: 'All activities are already synced', variant: 'default' });
      return;
    }
    setIsSyncing(true);
    try {
      // Replace with your real API endpoint. Do not put secrets in frontend.
      // Example: await axios.post('/api/sync-activities', { activities: unsynced });
      await axios.post('/api/sync-activities', { activities: unsynced });

      setActivities(prev => prev.map(a => ({ ...a, synced: true })));
      const now = new Date().toISOString();
      setLastSyncedAt(now);
      toast({ title: 'Sync Complete', description: `${unsynced.length} activities synced to cloud`, variant: 'default' });
    } catch (err) {
      console.error(err);
      toast({ title: 'Sync Failed', description: 'Could not sync now. Will retry later.', variant: 'destructive' });
      // Do not flip synced flag; keep unsynced to retry later
    } finally {
      setIsSyncing(false);
    }
  }, [activities, setActivities, setLastSyncedAt]);

  // Auto-sync immediately when coming online
  useEffect(() => {
    if (isOnline && activities.some(a => !a.synced)) {
      void syncUnsyncedActivities();
    }
  }, [isOnline, activities, syncUnsyncedActivities]);

  // SMS send placeholder (calls server endpoint which uses MSG91)
  const sendActivityViaSMS = useCallback(async (text: string) => {
    if (!farmerProfile) {
      toast({ title: 'No Profile', description: 'Set farmer profile to send SMS', variant: 'destructive' });
      return;
    }
    try {
      // Backend endpoint should handle MSG91 auth & sending
      await axios.post('/api/send-sms', {
        to: farmerProfile.phone, // add phone to FarmerProfile type
        message: text
      });
      toast({ title: 'SMS Sent', description: 'Message sent via SMS gateway', variant: 'default' });
    } catch (err) {
      console.error(err);
      toast({ title: 'SMS Failed', description: 'Unable to send SMS right now', variant: 'destructive' });
    }
  }, [farmerProfile]);

  // small helper to show last synced info
  const lastSyncedText = lastSyncedAt ? `Last synced: ${format(parseISO(lastSyncedAt), 'dd MMM yyyy, hh:mm a')}` : 'Never synced';

  // render
  return (
    <Layout title="Farm Activities">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Activity Log</h2>
          <div className="flex items-center gap-3">
            {unsyncedCount > 0 && isOnline && !isSyncing && (
              <Button variant="outline" size="sm" onClick={syncUnsyncedActivities} className="text-warning border-warning/20">
                <Upload className="mr-2 h-4 w-4" />
                Sync ({unsyncedCount})
              </Button>
            )}
            {isSyncing && (
              <Button variant="ghost" size="sm" className="opacity-80">
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </Button>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {editingActivity ? 'Edit Activity' : 'Add Activity'}
                </Button>
              </DialogTrigger>
              <DialogContent aria-labelledby="activity-dialog-title" role="dialog">
                <DialogHeader>
                  <DialogTitle id="activity-dialog-title">{editingActivity ? 'Edit Activity' : 'Log Farm Activity'}</DialogTitle>
                  <DialogDescription>
                    Record your daily farming activities for better tracking
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddOrUpdateActivity} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity Description</Label>
                    <Input
                      id="activity"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      placeholder="e.g., Applied Urea fertilizer, Watered fields, Harvested paddy..."
                      aria-required
                    />
                  </div>

                  {/* optional: file upload */}
                  <div>
                    <Label>Attach Photo (optional)</Label>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-2"
                      onChange={() => {
                        // placeholder: implement file upload to Firebase Storage in future
                        toast({ title: 'Upload Placeholder', description: 'File upload will be implemented in next iteration', variant: 'default' });
                      }}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      {editingActivity ? 'Update' : 'Add Activity'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); setEditingActivity(null); setNewActivity(''); }}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Sync Status */}
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-warning">
                  {unsyncedCount} activities pending sync
                </p>
                <p className="text-sm text-muted-foreground">{isOnline ? lastSyncedText : 'Offline — will sync when online'}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-400'}`} aria-hidden />
                <p className="text-xs text-muted-foreground mt-1">{isOnline ? 'Online' : 'Offline'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <Card key={activity.id} className="relative">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">{activity.activity}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(activity.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          {activity.synced ? <span className="text-xs text-success">Synced</span> : <span className="text-xs text-muted-foreground">Local</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(activity)} aria-label="Edit Activity">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(activity.id)} aria-label="Delete Activity">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className={`px-2 py-1 rounded-full text-xs ${activity.synced ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                        {activity.synced ? 'Synced' : 'Local'}
                      </div>

                      <Button variant="outline" size="sm" onClick={() => sendActivityViaSMS(activity.activity)}>
                        <Send className="mr-1 h-3 w-3" /> SMS
                      </Button>
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
              <CardDescription>Start logging your farming activities to track your progress</CardDescription>
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
