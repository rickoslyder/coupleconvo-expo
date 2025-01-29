import { View, Text, StyleSheet, Button } from 'react-native';
    import React, { useState, useEffect } from 'react';
    import { categories } from '../data/categories';
    import { generateQuestions } from '../utils/openai';
    import ModeSelector from '../components/ModeSelector';
    import QuestionModeSelector from '../components/QuestionModeSelector';
    import AnswerInput from '../components/AnswerInput';
    import VoiceInput from '../components/VoiceInput';
    import { saveQuestions, loadSavedQuestions } from '../utils/storage';
    import { trackEvent } from '../utils/analytics';

    export default function QuestionScreen() {
      const [currentCategory, setCurrentCategory] = useState(0);
      const [questions, setQuestions] = useState([]);
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [loading, setLoading] = useState(false);
      const [mode, setMode] = useState('unlimited');
      const [questionMode, setQuestionMode] = useState('infinite');

      useEffect(() => {
        const loadQuestions = async () => {
          setLoading(true);
          try {
            const savedQuestions = await loadSavedQuestions(categories[currentCategory]);
            if (savedQuestions.length > 0 && questionMode !== 'infinite') {
              setQuestions(savedQuestions);
              setCurrentQuestionIndex(0);
            } else {
              const numQuestions = questionMode === 'preset' ? 5 : 1;
              const response = await generateQuestions(categories[currentCategory], numQuestions);
              const newQuestions = response.choices.map((choice) => choice.message.content);
              if (questionMode === 'infinite') {
                setQuestions([...questions, ...newQuestions]);
              } else {
                setQuestions(newQuestions);
                setCurrentQuestionIndex(0);
                await saveQuestions(categories[currentCategory], newQuestions);
              }
            }
          } catch (error) {
            console.error('Failed to load questions:', error);
            alert('Failed to load questions. Please check your API key and network connection.');
          } finally {
            setLoading(false);
          }
        };

        loadQuestions();
      }, [currentCategory, questionMode]);

      const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          if (questionMode === 'infinite') {
            loadQuestions();
          } else if (currentCategory < categories.length - 1) {
            setCurrentCategory(currentCategory + 1);
          } else {
            setCurrentCategory(0);
          }
        }
      };

      const handleAnswer = async (answer: string) => {
        console.log('Answer:', answer);
        await trackEvent('question_answered', {
          category: categories[currentCategory],
          question: questions[currentQuestionIndex],
          answer: answer,
        });
      };

      return (
        <View style={styles.container}>
          <ModeSelector mode={mode} onSelectMode={setMode} />
          <QuestionModeSelector questionMode={questionMode} onSelectQuestionMode={setQuestionMode} />
          <Text style={styles.category}>{categories[currentCategory]}</Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Text style={styles.question}>
                {questions[currentQuestionIndex] || 'No questions available'}
              </Text>
              <AnswerInput onAnswer={handleAnswer} />
              <VoiceInput onVoiceAnswer={handleAnswer} />
              <Button title="Next Question" onPress={nextQuestion} disabled={loading} />
            </>
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
      category: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      question: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
      },
    });
