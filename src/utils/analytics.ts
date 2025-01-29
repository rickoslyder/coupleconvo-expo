import AsyncStorage from '@react-native-async-storage/async-storage';

    const ANALYTICS_KEY = 'analytics';

    export const trackEvent = async (event: string, data: any) => {
      try {
        const timestamp = new Date().toISOString();
        const existingData = await AsyncStorage.getItem(ANALYTICS_KEY);
        const existingAnalytics = existingData ? JSON.parse(existingData) : [];
        existingAnalytics.push({ event, timestamp, data });
        await AsyncStorage.setItem(ANALYTICS_KEY, JSON.stringify(existingAnalytics));
      } catch (error) {
        console.error('Failed to track event:', error);
      }
    };

    export const getUserClassification = async () => {
      // Placeholder for user classification logic based on analytics data
      // This is a simplified example and would need to be expanded based on your specific criteria
      try {
        const existingData = await AsyncStorage.getItem(ANALYTICS_KEY);
        const existingAnalytics = existingData ? JSON.parse(existingData) : [];

        let riskTakerScore = 0;
        let intimateConversationsScore = 0;

        existingAnalytics.forEach((analytic) => {
          if (analytic.data.category === 'Controversial questions') {
            riskTakerScore++;
          }
          if (analytic.data.category === 'Adult questions') {
            intimateConversationsScore++;
          }
        });

        return {
          riskTaker: riskTakerScore > 5, // Example threshold
          prefersIntimateConversations: intimateConversationsScore > 5, // Example threshold
        };
      } catch (error) {
        console.error('Failed to get user classification:', error);
        return {};
      }
    };
