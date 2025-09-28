import React from "react";
export function useNetworkStatusEffect(onChange: (online: boolean) => void) {
  React.useEffect(() => {
    function handle() {
      onChange(navigator.onLine);
    }
    window.addEventListener('online', handle);
    window.addEventListener('offline', handle);
    // Initial call
    handle();
    return () => {
      window.removeEventListener('online', handle);
      window.removeEventListener('offline', handle);
    };
  }, [onChange]);
}
