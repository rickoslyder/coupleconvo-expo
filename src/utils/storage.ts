import AsyncStorage from '@react-native-async-storage/async-storage';

    const QUESTIONS_KEY = 'questions';

    export const saveQuestions = async (category: string, questions: string[]) => {
      try {
        const existingData = await AsyncStorage.getItem(QUESTIONS_KEY);
        const existingQuestions = existingData ? JSON.parse(existingData) : {};
        existingQuestions[category] = questions;
        await AsyncStorage.setItem(QUESTIONS_KEY, JSON.stringify(existingQuestions));
      } catch (error) {
        console.error('Failed to save questions:', error);
      }
    };

    export const loadSavedQuestions = async (category: string) => {
      try {
        const existingData = await AsyncStorage.getItem(QUESTIONS_KEY);
        const existingQuestions = existingData ? JSON.parse(existingData) : {};
        return existingQuestions[category] || [];
      } catch (error) {
        console.error('Failed to load questions:', error);
        return [];
      }
    };

    export const clearQuestions = async () => {
      try {
        await AsyncStorage.removeItem(QUESTIONS_KEY);
      } catch (error) {
        console.error('Failed to clear questions:', error);
      }
    };
