export type PlayerProfile = {
    username: string;
    totalGames: number;
    correctGuesses: number;
    wrongGuesses: number;
    unlockedAchievements: Object[];
    unlockedModes: number[];  
    settings:{
        darkMode:boolean;
        haptics:boolean;
    };
};