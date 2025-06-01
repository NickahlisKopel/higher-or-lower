import { ProfileProvider } from '@/components/ProfileContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useTheme } from '@/components/ThemeContext';

export default function RootLayout() {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ProfileProvider>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text },
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={colors.background === '#black' ? 'light' : 'dark'} />
      </ThemeProvider>
    </ProfileProvider>
    </GestureHandlerRootView>
  );
}
