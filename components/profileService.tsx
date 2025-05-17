import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'gameProfile';

export const saveProfile = async (profile: any) =>{
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    
}

export const loadProfile = async () =>{
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

export const resetProfile = async () =>{
    await AsyncStorage.removeItem(STORAGE_KEY);
}