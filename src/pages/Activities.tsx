// NEW DEPENDENCIES: axios, date-fns
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { Plus, Calendar, Upload, Trash2, Edit, Send } from 'lucide-react';
import { Info } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SummaryRecommendations } from '@/components/ui/summary-recommendations';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { ActivityLog, FarmerProfile } from '@/types/farmer';
import { toast } from '@/hooks/use-toast';

type ActivityItem = ActivityLog; // date is Date

export default function Activities() {
  // --- HOOKS & STATE (must be at the top) ---
  const [activities, setActivities] = useLocalStorage<ActivityItem[]>("activities", []);
  const [farmerProfile] = useLocalStorage<FarmerProfile | null>("farmerProfile", null);
  const [newActivity, setNewActivity] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isOnline = useNetworkStatus();
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useLocalStorage<string | null>("activities_last_synced_at", null);
  const unsyncedCount = useMemo(() => activities.filter((a) => !a.synced).length, [activities]);
  const createActivityObject = useCallback((text: string, farmerId: string | null, synced: boolean): ActivityItem => {
    return {
      id: Date.now().toString(),
      farmerId: farmerId ?? "unknown",
      activity: text,
      date: new Date(),
      synced,
    };
  }, []);
  const formatDate = (date: Date) => {
    try {
      return format(date, "dd MMM yyyy, hh:mm a");
    } catch {
      return String(date);
    }
  };

  // --- HANDLERS ---
  function syncUnsyncedActivities() {
    // TODO: Implement sync logic
    toast({ title: "Sync", description: "Syncing activities (placeholder)", variant: "default" });
  }
  function handleAddOrUpdateActivity(e: React.FormEvent) {
    e.preventDefault();
    if (editingActivity) {
      // Update existing
      setActivities((prev) => prev.map((a) => (a.id === editingActivity.id ? { ...a, activity: newActivity.trim() } : a)));
      setEditingActivity(null);
      setNewActivity("");
      setIsDialogOpen(false);
      toast({ title: "Activity Updated", description: "Your activity was updated locally", variant: "default" });
      return;
    }
    const activity = createActivityObject(newActivity.trim(), farmerProfile?.id, !!isOnline);
    setActivities((prev) => [activity, ...prev]);
    setNewActivity("");
    setIsDialogOpen(false);
    toast({ title: "Activity Added", description: `Activity ${isOnline ? "saved and synced" : "saved locally"}`, variant: "default" });
    // If online, try sync automatically (non-blocking)
    if (isOnline) {
      // auto-trigger sync in background
    }
  }
  function handleEdit(activity: any) {
    setEditingActivity(activity);
    setNewActivity(activity.activity);
    setIsDialogOpen(true);
  }
  function handleDelete(id: string) {
    // TODO: Implement delete logic
    toast({ title: "Delete", description: "Activity deleted (placeholder)", variant: "destructive" });
  }
  function sendActivityViaSMS(activityText: string) {
    // TODO: Implement SMS logic
    toast({ title: "Send SMS", description: `Sent: ${activityText} (placeholder)`, variant: "default" });
  }

  // small helper to show last synced info
  const lastSyncedText = lastSyncedAt ? `Last synced: ${format(parseISO(lastSyncedAt), "dd MMM yyyy, hh:mm a")}` : "Never synced";

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
          </div>
        </div>

        {/* Activities List */}
        {activities.length > 0 ? (
          <>
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
            <SummaryRecommendations
              summary="Based on your recent activities, here are some suggestions to improve your farm productivity."
              dos={[
                'Continue regular irrigation and timely fertilizer application.',
                'Monitor crop health and record pest/disease observations.',
                'Plan next week’s sowing or harvesting based on weather.'
              ]}
              donts={[
                'Avoid overwatering, especially after rainfall.',
                'Do not skip logging important activities.',
                'Avoid using unapproved chemicals or pesticides.'
              ]}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </Layout>
  );
}
