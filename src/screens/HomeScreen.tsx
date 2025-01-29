import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { DO_YOU_STILL_MODE_UNLOCK_DAYS, DO_YOU_STILL_MODE_UNLOCK_QUESTIONS } from '../utils/constants';
    import { trackEvent, getUserClassification } from '../utils/analytics';
    import { useEffect, useState } from 'react';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    export default function HomeScreen() {
      const navigation = useNavigation();
      const [isDoYouStillModeUnlocked, setIsDoYouStillModeUnlocked] = useState(false);

      useEffect(() => {
        const checkDoYouStillModeUnlock = async () => {
          const analyticsData = await AsyncStorage.getItem('analytics');
          const analytics = analyticsData ? JSON.parse(analyticsData) : [];
          const questionEvents = analytics.filter((event) => event.event === 'question_answered');

          const firstQuestionDate = questionEvents.length > 0 ? new Date(questionEvents[0].timestamp) : null;
          const today = new Date();
          const daysSinceFirstQuestion = firstQuestionDate
            ? Math.floor((today.getTime() - firstQuestionDate.getTime()) / (1000 * 60 * 60 * 24))
            : 0;

          if (
            questionEvents.length >= DO_YOU_STILL_MODE_UNLOCK_QUESTIONS ||
            daysSinceFirstQuestion >= DO_YOU_STILL_MODE_UNLOCK_DAYS
          ) {
            setIsDoYouStillModeUnlocked(true);
          }
        };

        checkDoYouStillModeUnlock();
      }, []);

      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Question')}
          >
            <Text style={styles.buttonText}>Start New Conversation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('QuestionHistory')}
          >
            <Text style={styles.buttonText}>Question History</Text>
          </TouchableOpacity>
          {isDoYouStillModeUnlocked && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('DoYouStill')}
            >
              <Text style={styles.buttonText}>Do You Still...?</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
      button: {
        backgroundColor: '#FF6B6B',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
    });
