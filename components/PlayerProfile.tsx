export type PlayerProfile = {
    username: string;
    totalGames: number;
    correctGuesses: number;
    wrongGuesses: number;
    unlockedAchievements: number[];
    settings:{
        darkMode:boolean;
        haptics:boolean;
    };
};