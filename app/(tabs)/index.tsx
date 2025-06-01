import { PlayerProfile } from '@/components/PlayerProfile';
import { useTheme } from '@/components/ThemeContext';
import { useProfile } from '@/components/useProfile';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const { profile, setProfile, resetProfile} = useProfile();
  const { colors } = useTheme();
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(profile?.username || '');

  const defaultSettings = {
    darkMode: true,
    haptics: true,
  };

  const defaultProfile: PlayerProfile = {
    username: 'Guest',
    totalGames: 0,
    correctGuesses: 0,
    wrongGuesses: 0,
    unlockedModes:[10],
    unlockedAchievements: [],
    settings:{
      darkMode: true,
      haptics: true,
    }
  };

  const handleSave = () => {
    if (!newUsername.trim()) return;
    const updated = {
      ...profile,
      username: newUsername.trim(),
    };
    setProfile(updated);
    setEditing(false);
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
        darkMode: !profile.settings.darkMode
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
      <View style={styles.row}>
      {editing ? (
        <TextInput
          style={styles.input}
          value={newUsername}
          onChangeText={setNewUsername}
          onSubmitEditing={handleSave}
          autoFocus
          maxLength={15}
        />
      ) : (
        <>
          <Text  style={[styles.username, {color:profile.settings.darkMode?'white':'black'}]}>{profile.username}</Text>
          <TouchableOpacity onPress={() => setEditing(true)}>
            <Feather name="edit-2" size={20} color="#666" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </>
      )}
    </View>
      <Button
  title="Reset Profile"
  onPress={() => {
    Alert.alert("Confirm", "Are you sure you want to reset your profile?", [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: resetProfile },
    ]);
  }}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, justifyContent:'center', alignContent:'center'},
  label: { fontSize: 15, marginVertical: 12, color:'white' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'white',
    fontSize: 20,
    flex: 1,
  },
});
