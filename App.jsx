import React from 'react';
import {RootNavigation} from './src/navigations/RootNavigation';
import {AppThemeProvider} from './src/context/ThemeContext';
import {AuthProvider} from './src/context/AuthContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();
export default function App() {
  return (
    
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </QueryClientProvider>
    </AppThemeProvider>
  );
}
