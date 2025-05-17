import { PlayerProfile } from '@/components/PlayerProfile';
import { useTheme } from '@/components/ThemeContext';
import { useProfile } from '@/components/useProfile';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const { profile, setProfile} = useProfile();
  const { colors } = useTheme();

  const defaultSettings = {
    darkMode: true,
    haptics: true,
  };

  const defaultProfile: PlayerProfile = {
    username: 'Guest',
    totalGames: 0,
    correctGuesses: 0,
    wrongGuesses: 0,
    unlockedAchievements: [],
    settings: defaultSettings,
  };

  // Initialize profile if not present (once)
  useEffect(() => {
    if (!profile) {
      setProfile(defaultProfile);
    }
  }, [profile, ]);

  if (!profile) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }


  const toggleDarkMode = () => {
    const updated = {
      ...profile,
      settings: {
        ...profile.settings,
        darkMode: !profile.settings.darkMode,
      },
    };
    setProfile(updated);
  };

  const toggleHaptics = () => {
    const updated = {
      ...profile,
      settings: {
        ...profile.settings,
        haptics: !profile.settings.haptics,
      },
    };
    setProfile(updated);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.label, {color:colors.text}]}>Dark Mode</Text>
      <Switch
        value={profile.settings.darkMode}
        onValueChange={toggleDarkMode}
      />

      <Text style={[styles.label, {color:colors.text}]}>Haptic Feedback</Text>
      <Switch
        value={profile.settings.haptics}
        onValueChange={toggleHaptics}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, justifyContent:'center', alignContent:'center'},
  label: { fontSize: 18, marginVertical: 12, color:'white' },
});
