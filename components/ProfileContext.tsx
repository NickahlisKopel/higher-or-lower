import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PlayerProfile } from './PlayerProfile';

const STORAGE_KEY = 'playerProfile';

const defaultProfile: PlayerProfile = {
  username: 'Guest',
  totalGames: 0,
  correctGuesses: 0,
  wrongGuesses: 0,
  unlockedAchievements:[],
  unlockedModes:[10],
  settings: {
    darkMode: true,
    haptics: true,
  },
};

type ProfileContextType = {
  profile: PlayerProfile;
  setProfile: (p: PlayerProfile) => void;
  resetProfile: () => void;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfileState] = useState<PlayerProfile>(defaultProfile);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        const parsed = JSON.parse(raw);
        setProfileState({
          ...defaultProfile,
          ...parsed,
          settings: {
            ...defaultProfile.settings,
            ...(parsed.settings ?? {}),
          },
        });
      }
    });
  }, []);

  const setProfile = (newProfile: PlayerProfile) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    setProfileState(newProfile);
  };

  const resetProfile = async () => {
    await AsyncStorage.removeItem('playerProfile'); // Clear saved profile
    const freshProfile: PlayerProfile = {
      username: 'Guest',
      totalGames: 0,
      correctGuesses: 0,
      wrongGuesses: 0,
      unlockedAchievements: [],
      unlockedModes: [10],
      settings: {
        darkMode: true,
        haptics: true,
      },
    };
    setProfile(freshProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
};