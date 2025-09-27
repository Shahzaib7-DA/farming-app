import { Wifi, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { cn } from '@/lib/utils';

export function StatusIndicator() {
  const isOnline = useNetworkStatus();

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
      isOnline 
        ? "bg-success/10 text-success border border-success/20" 
        : "bg-warning/10 text-warning border border-warning/20"
    )}>
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4" />
          Online
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" />
          Offline
        </>
      )}
    </div>
  );
}