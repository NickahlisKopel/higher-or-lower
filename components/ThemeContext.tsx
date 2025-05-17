import React, { createContext, useContext, useMemo } from 'react';
import { darkTheme, lightTheme, Theme } from './theme';
import { useProfile } from './useProfile';

const ThemeContext = createContext<Theme>(lightTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useProfile();

  const theme = useMemo(() => {
    return profile.settings.darkMode ? darkTheme : lightTheme;
  }, [profile.settings.darkMode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);