import React, { useState, useEffect } from 'react';
    import { View, Text, StyleSheet, Button } from 'react-native';
    import { loadSavedQuestions } from '../utils/storage';
    import { categories } from '../data/categories';

    export default function DoYouStillScreen() {
      const [questions, setQuestions] = useState([]);
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

      useEffect(() => {
        const loadQuestionsForMode = async () => {
          let loadedQuestions = [];
          for (const category of categories) {
            const savedQuestions = await loadSavedQuestions(category);
            loadedQuestions = [...loadedQuestions, ...savedQuestions];
          }
          // Shuffle questions to randomize the order
          loadedQuestions.sort(() => Math.random() - 0.5);
          setQuestions(loadedQuestions);
        };

        loadQuestionsForMode();
      }, []);

      const nextQuestion = () => {
        setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
      };

      return (
        <View style={styles.container}>
          {questions.length > 0 ? (
            <>
              <Text style={styles.question}>
                {questions[currentQuestionIndex]}
              </Text>
              <Button title="Next Question" onPress={nextQuestion} />
            </>
          ) : (
            <Text>No questions available for this mode yet.</Text>
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
      question: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
      },
    });
