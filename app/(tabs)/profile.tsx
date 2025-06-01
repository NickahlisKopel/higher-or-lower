import { achievementsList } from '@/components/achievements';
import { useTheme } from '@/components/ThemeContext';
import { useProfile } from '@/components/useProfile';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { profile} = useProfile();

  

  if (!profile) {
    return <Text>Failed to load profile.</Text>;
  }
  useEffect(() => {
    console.log('Unlocked Achievements:', profile.unlockedAchievements);
  }, [profile]);
  useFocusEffect(
    useCallback(() => {
      console.log('Achievements refreshed:', profile.unlockedAchievements);
    }, [profile])
  );

  const chartData = [
    {
      name: 'Correct',
      count: profile.correctGuesses,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Wrong',
      count: profile.wrongGuesses,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const unlockedTitles = profile.unlockedAchievements
    .map((threshold) => achievementsList.find((a) => a.threshold === threshold))
    .filter(Boolean);

    const unlockedList = achievementsList.filter(b =>
      profile?.unlockedAchievements.includes(b)
    );

  return (
    
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.label, { color: colors.text }]}>
          {profile.username}'s Stats
        </Text>
        <Text style={[styles.label, { color: colors.text }]}>
          Games Played: {profile.totalGames}
        </Text>
       

        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            color: () => `black`,
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

<ScrollView style={{ marginTop: 20 }}>
  {unlockedList.length === 0 ? (
    <Text style={styles.label}>No achievements yet</Text>
  ) : (
    unlockedList.map(a => (
      <View key={a.id} style={styles.achievementCard}>
        <Text style={styles.achievementTitle}>{a.title}</Text>
        <Text style={styles.achievementDesc}>{a.criteria}</Text>
      </View>
    ))
  )}
</ScrollView>

        <View style={{ marginTop: 20 }}>
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  achievementCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  achievementDesc: {
    color: '#ccc',
    fontSize: 12,
  },
  
});
