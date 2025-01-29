import React, { useState } from 'react';
    import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';

    interface AnswerInputProps {
      onAnswer: (answer: string) => void;
    }

    export default function AnswerInput({ onAnswer }: AnswerInputProps) {
      const [answer, setAnswer] = useState('');
      const [showInput, setShowInput] = useState(false);

      const handleIconPress = () => {
        setShowInput(!showInput);
      };

      const handleAnswerChange = (text: string) => {
        setAnswer(text);
        onAnswer(text);
      };

      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleIconPress} style={styles.iconContainer}>
            <Ionicons name="pencil" size={24} color="#FF6B6B" />
          </TouchableOpacity>

          {showInput && (
            <TextInput
              style={styles.input}
              placeholder="Enter your answer"
              value={answer}
              onChangeText={handleAnswerChange}
            />
          )}
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        marginVertical: 10,
      },
      iconContainer: {
        padding: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
      },
    });
