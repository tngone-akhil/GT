import React from 'react';
import {RootNavigation} from './src/navigations/RootNavigation';
import {AppThemeProvider} from './src/context/ThemeContext';
import {AuthProvider} from './src/context/AuthContext';

export default function App() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </AppThemeProvider>
  );
}
