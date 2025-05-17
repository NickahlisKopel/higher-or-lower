import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type AchievementPopupProps = {
    message:string;
}

export default function AchievementPopup({message}: AchievementPopupProps){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Achievement Unlocked!</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:80,
        alignSelf:'center',
        backgroundColor:'#000',
        padding:16,
        borderRadius:8,
        zIndex:999,
        opacity:0.9,
    },
    text:{
        color:'#FFD700',
        fontWeight:'bold',
        fontSize:16,
    },
    message:{
        color:'#FFF',
        marginTop:4,
        fontSize:14,
    },
});