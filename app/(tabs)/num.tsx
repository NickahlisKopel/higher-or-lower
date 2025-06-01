// File: Num.tsx

import AchievementPopup from '@/components/AchievementPopup';
import { achievementsList } from '@/components/achievements';
import InfoToggle from '@/components/InfoToggle';
import ModeToggle from '@/components/ModeToggle';
import { PlayerProfile } from '@/components/PlayerProfile';
import { useProfile } from '@/components/useProfile';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export type Achievement = {
  id: number;
  title: string;
  threshold: number;
  criteria: string;
};

export default function Num() {
  // Pull “profile” and “setProfile” from your ProfileContext
  const { profile, setProfile, resetProfile } = useProfile();

  // Local session counter (for display only)
  const [correctThisSession, setCorrectThisSession] = useState(0);

  // Popup state
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [num, setNum] = useState(0);
  const [feedback,setFeedback] = useState('white');
  const [mode, setMode] = useState(10)
  const [infoVisible, setInfoVisible] = useState(false);
  /**
   * Whenever profile.correctGuesses (the persisted total‐correct) changes,
   * check which achievements are now unlocked. We look for any achievement
   * whose threshold ≤ correctGuesses AND whose id is NOT already in unlockedAchievements.
   */


  function getAvailableGameModes(
    profile: PlayerProfile,
    achievementsList: Achievement[]
  ): number[] {
    // Filter down to achievements the user has already unlocked
    const unlocked = achievementsList.filter((ach) =>
      profile.unlockedAchievements.includes(ach.id)
    );
    // Pull out their thresholds (e.g. [10, 50, 100])
    const thresholds = unlocked.map((ach) => ach.threshold);
  
    if (thresholds.length === 0) {
      // If nothing unlocked yet, only offer 0–10
      return [10];
    }
  
    // Otherwise return a sorted array of thresholds
    return thresholds.sort((a, b) => a - b);
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setCorrectThisSession(0); // reset score when leaving screen
      };
    }, [])
  );

  
  
  // Usage:
  let modes = profile.unlockedAchievements.length == 0? [10] : getAvailableGameModes(profile, achievementsList);
  // → e.g. [10, 50, 100] if the user has unlocked IDs whose thresholds are 10, 50, and 100.
  
  const checkAchievements = useCallback(() => {
    // Early return if profile isn’t loaded yet
    if (!profile) return;

    const totalCorrect = profile.correctGuesses;
    const unlockedIds = profile.unlockedAchievements as number[];
    

    // Find all achievements that meet the threshold and aren’t yet unlocked
    const newlyUnlocked = achievementsList.filter((ach: Achievement) => {
      return (
        totalCorrect >= ach.threshold &&
        !unlockedIds.includes(ach.id)
      );
    });

    if (newlyUnlocked.length === 0) {
      return;
    }

    // 1) Batch‐add all newly unlocked IDs to profile.unlockedAchievements
    const newIds = newlyUnlocked.map((ach) => ach.id);
    setProfile({
      ...profile,
      unlockedAchievements: [...unlockedIds, ...newIds],
    });


    // 2) Show the first new achievement’s title in a popup
    setPopupMessage(newlyUnlocked[0].title);
    setPopupVisible(true);

    // 3) Auto‐hide the popup after 3 seconds (adjust as desired)
    setTimeout(() => {
      setPopupVisible(false);
      setPopupMessage(null);
    }, 3000);
  }, [profile, setProfile]);

  /**
   * Run checkAchievements whenever profile.correctGuesses changes.
   */
  useEffect(() => {
    checkAchievements();
    modes = getAvailableGameModes(profile, achievementsList);
  }, [profile?.correctGuesses, checkAchievements]);

  /**
   * Called when the user correctly guesses once more.
   * – Increment the local “this session” counter (for UI).
   * – Increment profile.correctGuesses (persisted).
   */
  const handleCorrect = () => {
    if (!profile) return;

    setFeedback('green')

    // 1) Local session display
    setCorrectThisSession((prev) => prev + 1);

    // 2) Persisted “total correct” bump
    setProfile({
      ...profile,
      correctGuesses: profile.correctGuesses + 1,
    });

    setTimeout(() => setFeedback("white"), 350);
  };
  const handleIncorrect = () => {
    if (!profile) return;

    // 1) Local session display
    setFeedback('red')

    // 2) Persisted “total correct” bump
    setProfile({
      ...profile,
      wrongGuesses: profile.wrongGuesses + 1,
    });
    setTimeout(() => setFeedback("white"), 350);
  };

  const handleHigher = () =>{
      let currentNum = num
      let nextNum = createNumber()
      if (nextNum > currentNum){
        handleCorrect()
        setNum(nextNum)
      }else{
        handleIncorrect()
        setNum(nextNum)
      }
  }
  const handleLower= () =>{
    let currentNum = num
    let nextNum = createNumber()
    if (nextNum <= currentNum){
      handleCorrect()
      setNum(nextNum)
    }else{
      handleIncorrect()
      setNum(nextNum)
    }
  }
  const createNumber = () =>{
   let n = Math.floor(Math.random() * mode)
   return n
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Render the popup at the top whenever popupVisible is true */}
      {popupVisible && popupMessage && (
        <AchievementPopup message={popupMessage} />
      )}
      <View style={[{top:-150}]}>
      <InfoToggle visible={infoVisible} onToggle={() => setInfoVisible(v => !v)} title='Game Rules'>
          <Text style={[styles.text, { color: 'white' }]}>Guess higher/lower{"\n"}Correctly guessing increments score{"\n"}Reach Milestones for Unlocks!</Text>
        </InfoToggle>

        <ModeToggle
          currentMode={mode}
          unlockedModes={modes}
          onSelectMode={(selectedMode) => setMode(selectedMode)}
        />
      </View>

      <View style={styles.statsContainer}>
        <Text style={[styles.text,{color:'white'}]}>Correct this session: {correctThisSession}</Text>
       
      </View>
      <View>
        <Button title='Higher' onPress={handleHigher}></Button>
        <Text style={[styles.text,{color:feedback}]}>{num}</Text>
        <Button title='Lower' onPress={handleLower}></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding:40, backgroundColor:'black', justifyContent:'center',alignContent:'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  statsContainer: { marginBottom: 28, justifyContent:'center', alignContent:'center' },
  text:{justifyContent:'center', textAlign:'center', fontSize: 17}
});
