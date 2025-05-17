import { PlayerProfile } from '@/components/PlayerProfile';
import { useTheme } from '@/components/ThemeContext';
import { useProfile } from '@/components/useProfile';
import React from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';



const defaultProfile: PlayerProfile = {
    username: 'Guest',
    totalGames: 0,
    correctGuesses: 0,
    wrongGuesses: 0,
    unlockedAchievements: [],
    settings:{
        darkMode:true,
        haptics:true,
      }
  };

export default function ProfileScreen(){

    const { colors } = useTheme();
    const { profile, setProfile, resetProfile } = useProfile();

   
    
    const chartData = [
        {
            name:'Correct',
            count: profile?.correctGuesses,
            color: 'green',
            legendFontColor: '#7F7F7F',
            legendFontSize:15,
        },
        {
            name: 'Wrong',
            count: profile?.wrongGuesses,
            color:'red',
            legendFontColor:'#7F7F7F',
            legendFontSize: 15,
        },

    ];
    if (!profile) {
        // Optional: fallback render if profile never loads
        return <Text>Failed to load profile.</Text>;
      }

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor:colors.background}]}>
    <View style={[{ padding: 10 }]}>
      <Text style={[styles.label, {color:colors.text}]}>{profile.username}'s Stats</Text>
      <Text style={[styles.label, {color:colors.text}]}>Games Played: {profile.totalGames}</Text>
      <Text style={[styles.label, {color:colors.text}]}>Correct: {profile.correctGuesses}</Text>
      <Text style={[styles.label, {color:colors.text}]}>Wrong: {profile.wrongGuesses}</Text>
      <PieChart
                data={chartData}
                width={Dimensions.get('window').width-40}
                height={220}
                chartConfig={{
                    backgroundColor:'#ffffff',
                    color:() => `black`
                }}
                accessor="count"
                backgroundColor='transparent'
                paddingLeft='15'
                absolute
                >
            </PieChart>

      <Button title="Reset Profile" color={'red'} onPress={resetProfile} />
    </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    safe: {
        flex: 1,
        
        justifyContent:'center', 
        alignContent:'center',
        // if you want a background
      },
      label:{
        fontWeight:'bold',

      }
    });

