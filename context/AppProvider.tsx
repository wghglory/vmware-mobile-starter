import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ThemeProvider, createTheme} from '@rneui/themed';

import {AuthProvider} from './AuthContext';

const theme = createTheme({});

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
      <ThemeProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
