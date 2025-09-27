import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { QueryService } from '@/services/queryService';
import { QueryResponse } from '@/types/farmer';
import { toast } from '@/hooks/use-toast';

export default function Query() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useLocalStorage<QueryResponse[]>('queryHistory', []);
  const isOnline = useNetworkStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter your agricultural question",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await QueryService.processQuery(query.trim(), isOnline);
      
      setQueryHistory(prev => [response, ...prev.slice(0, 9)]); // Keep last 10 queries
      setQuery('');
      
      toast({
        title: "Query Processed",
        description: `Response generated ${isOnline ? 'online' : 'offline'}`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your query. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Ask Agricultural Query">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Query Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Ask Your Question
              <span className={`text-xs px-2 py-1 rounded-full ${
                isOnline 
                  ? 'bg-success/10 text-success' 
                  : 'bg-warning/10 text-warning'
              }`}>
                {isOnline ? 'Enhanced Online' : 'Offline Mode'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your agricultural question here... (e.g., 'Why are my paddy leaves yellow?')"
                className="min-h-[100px] resize-none"
                disabled={loading}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !query.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Get Answer
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Query History */}
        {queryHistory.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Queries</h3>
            {queryHistory.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-accent">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-medium text-foreground text-sm">
                        Q: {item.query}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.source === 'online' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {item.source}
                        </span>
                      </div>
                    </div>
                    <div className="bg-accent/5 p-3 rounded-lg">
                      <p className="text-sm text-foreground leading-relaxed">
                        <strong>A:</strong> {item.response}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {queryHistory.length === 0 && (
          <Card className="text-center py-8">
            <CardContent>
              <div className="space-y-2">
                <p className="text-muted-foreground">No queries yet</p>
                <p className="text-sm text-muted-foreground">
                  Start by asking your first agricultural question above
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}