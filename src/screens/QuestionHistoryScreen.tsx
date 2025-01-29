import React, { useState, useEffect } from 'react';
    import { View, Text, StyleSheet, ScrollView } from 'react-native';
    import { loadSavedQuestions } from '../utils/storage';
    import { categories } from '../data/categories';

    export default function QuestionHistoryScreen() {
      const [questionHistory, setQuestionHistory] = useState({});

      useEffect(() => {
        const loadHistory = async () => {
          const loadedQuestions = {};
          for (const category of categories) {
            const savedQuestions = await loadSavedQuestions(category);
            if (savedQuestions.length > 0) {
              loadedQuestions[category] = savedQuestions;
            }
          }
          setQuestionHistory(loadedQuestions);
        };

        loadHistory();
      }, []);

      return (
        <ScrollView style={styles.container}>
          {Object.entries(questionHistory).map(([category, questions]) => (
            <View key={category} style={styles.categoryContainer}>
              <Text style={styles.category}>{category}</Text>
              {questions.map((question, index) => (
                <Text key={index} style={styles.question}>{question}</Text>
              ))}
            </View>
          ))}
        </ScrollView>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      categoryContainer: {
        marginBottom: 20,
      },
      category: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      question: {
        fontSize: 16,
        marginBottom: 5,
      },
    });
