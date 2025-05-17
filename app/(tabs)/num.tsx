import InfoToggle from '@/components/InfoToggle';
import { loadProfile, saveProfile } from '@/components/profileService';
import { useTheme } from '@/components/ThemeContext';
import { useProfile } from '@/components/useProfile';
import * as Haptics from 'expo-haptics';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';


type Achievement = {
    score:number;
    message:string;
}

const achievementList: Achievement[] = [
    {score:50, message:'Unlocked range 0-50!'},
    {score:100, message:'Unlocked range 0-100!'},
];

const updateStats = async (correct : any) =>{
    let profile = await loadProfile();
    if(!profile){
        profile = {
            username:"Guest",
            totalGames:0,
            correctGuesses:0,
            wrongGuesses:0,
        };
    }
    profile.totalGames +=1;
    if(correct) profile.correctGuesses+=1;
    else profile.wrongGuesses+=1;

    await saveProfile(profile);
}

export default function Num(){
    const { colors } = useTheme(); 
    
    const [num, setNum] = useState(1);
    const [score, setScore]   = useState(0);
    const [correct, setCorrect]  = useState("clear");
    const [infoVisible, setInfoVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [unlocked, setUnlocked] = useState<number[]>([]);
    const { profile, setProfile, resetProfile } = useProfile();

    useFocusEffect(
        useCallback(() => {
          // Screen is focused – no reset needed here
          return () => {
            // Screen is about to lose focus (unmount or navigate away)
            setScore(0);
          };
        }, [])
      );


      useEffect(() => {
        if (!profile) return;
      
        const nextAchievement = achievementList.find(
          (a) =>
            score >= a.score &&
            !profile.unlockedAchievements.includes(a.score)
        );
      
        if (nextAchievement) {
          const updated = {
            ...profile,
            unlockedAchievements: [
              ...profile.unlockedAchievements,
              nextAchievement.score,
            ],
          };
      
          setProfile(updated);
          setPopupMessage(nextAchievement.message);

          setTimeout(() => setPopupMessage(""), 3000);
        }
      }, [score]);


    const handleGuess = async (guess:boolean) => {
        const next = Math.floor(Math.random() * 11);
    
        // check correctness
        const isHigher = ()=>{
            if (next > num){
                return true;
            }else{
                return false;
            }
        }
        const wasCorrect =
  (isHigher() && guess) || (isHigher() === false && guess === false);

    
        // update score if correct
        if (isHigher() && guess) {
            setCorrect("true")
            if (profile?.settings.haptics) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              }
            setScore(score + 1);

        }else if(isHigher() == false && guess == false){
            setCorrect("true")
            if (profile?.settings.haptics) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              }
            setScore(score+1);
        }else{
            setCorrect("false")
            if (profile?.settings.haptics) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
        }
        if (!profile) return;

        const updated = {
          ...profile,
          totalGames: profile.totalGames + 1,
          correctGuesses: profile.correctGuesses + (wasCorrect ? 1 : 0),
          wrongGuesses: profile.wrongGuesses + (wasCorrect ? 0 : 1),
        };
      
        await setProfile(updated);
        setTimeout(() => setCorrect("clear"), 500);
       
          
        // update the displayed number
        setNum(next);
        
      };

    
    return(
        <SafeAreaView style={styles.safe}>
            <View style={styles.infoContainer}>
                <InfoToggle visible={infoVisible} onToggle={()=> setInfoVisible(v => !v)} title='Game Rules'>
                    <Text style={styles.whiteText}>Guess higher/lower{'\n'}Correctly guessing incrememts score{'\n'}Reach Milestones for Unlocks!</Text>
                </InfoToggle>
            </View>
            <View style={[styles.inner, {backgroundColor:colors.background}]}>
                    <Text style={[styles.text, { color: colors.text }]}>Correct: {score}</Text>
                    <View style={styles.pad}></View>
                    <Button title={'Higher'} onPress={() => handleGuess(true)}></Button>
                    <Text style={[styles.number, correct === "clear" ? (profile.settings.darkMode ? styles.whiteText:styles.darkText) : correct == "true" ? styles.correctText : styles.incorrectText]}>{num}</Text>
                    <Button title={'Lower'} onPress={() => handleGuess(false)}></Button>
                    <View style={styles.pad}></View>
                
            </View>
            
        </SafeAreaView>
    )

}




function genNum(){
    let generatedNum = Math.floor(Math.random() * 11);
    return generatedNum;
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor:'black',
    },
    infoContainer:{
        flex:-999,
        position: 'relative',
        
    },
    whiteText: {
      color: 'white',   // hex code works too
      fontSize: 20,
      fontWeight: '600',
    },
    darkText: {
        color: 'black',   // hex code works too
        fontSize: 20,
        fontWeight: '600',
      },
    correctText: {
        color: 'lime',   // hex code works too
        fontSize: 20,
        fontWeight: '600',
      },
      incorrectText: {
        color: 'tomato',   // hex code works too
        fontSize: 20,
        fontWeight: '600',
      },
      number:{
        fontSize: 20,
        fontWeight: '600',
        justifyContent:'center',
        textAlign:'center',
        padding:10,
      },
    safe: {
        flex: 1, // if you want a background
      },
    pad: {
        paddingBottom: 50,
    },
    bottomPad: {
        paddingBottom: 100,
    },
    inner: {
        flex: 1,
        justifyContent: 'center', // or 'flex-start' if you want everything from the top
        alignItems: 'center',   
          // center horizontally
        
      },
      text: {
        fontSize: 20,
        fontWeight: '600',
      },
  });

