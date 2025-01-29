import OpenAI from 'openai';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    export const generateQuestions = async (category: string, count: number) => {
      const apiKey = await AsyncStorage.getItem('openai-api-key');
      const userProfile = await AsyncStorage.getItem('userProfile');
      const profileData = userProfile ? JSON.parse(userProfile) : {};

      const profilePrompt = Object.entries(profileData)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');

      const prompt = `Generate ${count} ${category} questions for couples. User profile: ${profilePrompt}. Make them creative and engaging.`;

      const openai = new OpenAI({
        apiKey: apiKey || '',
        dangerouslyAllowBrowser: true
      });

      return openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });
    };
