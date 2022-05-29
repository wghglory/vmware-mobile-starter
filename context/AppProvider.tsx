import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NativeBaseProvider} from 'native-base';

import {AuthProvider} from './AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: false,
      // retry(failureCount, error: any) {
      //   // retry once
      //   if (failureCount < 1) return true;
      //   else return false;
      // },
    },
  },
});

export default function AppProvider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <AuthProvider>{children}</AuthProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
