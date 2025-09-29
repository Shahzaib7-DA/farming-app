import { useState, useEffect, useCallback } from 'react';
import { Send, Loader2, Copy, Mic, Image as ImageIcon, Smartphone } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { QueryService } from '@/services/queryService';
import { QueryResponse as BaseQueryResponse } from '@/types/farmer';

// Locally extend QueryResponse to add 'synced' property for offline/online sync
type QueryResponse = BaseQueryResponse & { synced?: boolean };
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { useLanguage } from '@/hooks/useLanguage';

export default function Query() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useLocalStorage<QueryResponse[]>('queryHistory', []);
  const isOnline = useNetworkStatus();

  // --- Sync offline queries when network returns ---
  const syncOfflineQueries = useCallback(async () => {
    const unsynced = queryHistory.filter(q => q.source === 'offline' && !q.synced);
    if (unsynced.length === 0) return;

    try {
      await axios.post('/api/sync-queries', { queries: unsynced });
      setQueryHistory(prev => prev.map(q => 
        q.source === 'offline' ? { ...q, synced: true } : q
      ));
      toast({ title: t('sync'), description: `${unsynced.length} ${t('recentQueries').toLowerCase()} synced`, variant: 'default' });
    } catch (err) {
      console.error(err);
      toast({ title: t('sync'), description: t('offlineWillSync'), variant: 'destructive' });
    }
  }, [queryHistory, setQueryHistory]);

  useEffect(() => {
    if (isOnline) {
      void syncOfflineQueries();
    }
  }, [isOnline, syncOfflineQueries]);

  // --- Submit handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      toast({ title: t('askYourQuestion'), description: t('startByAsking'), variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const response = await QueryService.processQuery(query.trim(), isOnline);

      const newResponse: QueryResponse = {
        ...response,
        timestamp: new Date(), // store as Date
        synced: isOnline,
      };

      setQueryHistory(prev => [newResponse, ...prev.slice(0, 9)]);
      setQuery('');

      toast({ title: t('getAnswer'), description: isOnline ? t('enhancedOnline') : t('offlineMode'), variant: "default" });
    } catch (error) {
      toast({ title: "Error", description: t('startByAsking'), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // --- Copy answer ---
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied', description: 'Answer copied to clipboard', variant: 'default' });
  };

  // --- SMS Fallback ---
  const handleSendSMS = async (q: string) => {
    try {
      await axios.post('/api/send-sms', { message: q });
      toast({ title: 'SMS', description: 'SMS sent', variant: 'default' });
    } catch {
      toast({ title: 'SMS', description: 'Unable to send SMS', variant: 'destructive' });
    }
  };

  return (
    <Layout title={t('askQuery')}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Query Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t('askYourQuestion')}
              <span className={`text-xs px-2 py-1 rounded-full ${
                isOnline ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
              }`}>
                {isOnline ? t('enhancedOnline') : t('offlineMode')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('textareaPlaceholder')}
                className="min-h-[100px] resize-none"
                disabled={loading}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading || !query.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('processing')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> {t('getAnswer')}
                    </>
                  )}
                </Button>
                {/* Voice Input Placeholder */}
                <Button type="button" variant="outline" onClick={() => toast({ title: 'Voice', description: 'Coming soon.' })}>
                  <Mic className="h-4 w-4" />
                </Button>
                {/* Image Upload Placeholder */}
                <Button type="button" variant="outline" onClick={() => toast({ title: 'Image', description: 'Coming soon.' })}>
                  <ImageIcon className="h-4 w-4" />
                </Button>
                {/* SMS Fallback */}
                {!isOnline && (
                  <Button type="button" variant="outline" onClick={() => handleSendSMS(query)}>
                    <Smartphone className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Query History */}
        {queryHistory.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('recentQueries')}</h3>
            {queryHistory.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-accent">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-medium text-foreground text-sm">Q: {item.query}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                          item.source === 'online' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                          {item.source === 'online' ? t('onlineBadge') : t('offlineBadge')}
                        </span>
                      </div>
                    </div>
                    <div className="bg-accent/5 p-3 rounded-lg flex justify-between items-start">
                      <p className="text-sm text-foreground leading-relaxed">
                        <strong>A:</strong> {item.response}
                      </p>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(item.response)} aria-label="Copy Answer">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.timestamp instanceof Date ? item.timestamp.toLocaleString() : new Date(item.timestamp).toLocaleString()}
                      {item.synced === false && ' • Pending Sync'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-8">
            <CardContent>
              <p className="text-muted-foreground">{t('noQueriesYet')}</p>
              <p className="text-sm text-muted-foreground">{t('startByAsking')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
