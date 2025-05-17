import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

type InfoToggleProps = {
    visible: boolean;
    onToggle: () => void;
    title?:string;
    children?: React.ReactNode;
}

export default function InfoToggle(
   props: InfoToggleProps) {
   const { visible, onToggle, title = 'How to Play', children,} = props;
    if (!visible){
        return(
            <TouchableOpacity
            style={styles.button}
            onPress={onToggle}>
                <Ionicons
                name='information-circle-outline'
                size={28}
                color='white'/>
            </TouchableOpacity>
        );
    }
    return(
        <>
        <TouchableOpacity
        style={styles.button}
        onPress={onToggle}>
            <Ionicons
            name='information-circle-outline'
            size={28}
            color='white'>

            </Ionicons>
        </TouchableOpacity>
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.cardBody}>{children}</View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    button:{
        position: 'absolute',
        top:16,
        right:16,
        zIndex:2,
    },
    card:{
        position:'absolute',
        top:56,
        right:16,
        left:16,
        backgroundColor:'black',
        borderBlockColor:'white',
        borderRadius:8,
        padding:16,
        elevation:4,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        shadowRadius:4,
        zIndex:1,
    },
    cardTitle:{
        fontSize:18,
        fontWeight:'600',
        marginBottom:8,
    },
    cardBody:{

    },
})