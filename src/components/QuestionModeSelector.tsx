import React from 'react';
    import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

    interface QuestionModeSelectorProps {
      questionMode: string;
      onSelectQuestionMode: (mode: string) => void;
    }

    export default function QuestionModeSelector({ questionMode, onSelectQuestionMode }: QuestionModeSelectorProps) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.button, questionMode === 'preset' && styles.activeButton]}
            onPress={() => onSelectQuestionMode('preset')}
          >
            <Text style={[styles.text, questionMode === 'preset' && styles.activeText]}>Preset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, questionMode === 'infinite' && styles.activeButton]}
            onPress={() => onSelectQuestionMode('infinite')}
          >
            <Text style={[styles.text, questionMode === 'infinite' && styles.activeText]}>Infinite</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
      },
      button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FF6B6B',
      },
      activeButton: {
        backgroundColor: '#FF6B6B',
      },
      text: {
        fontSize: 16,
        color: '#FF6B6B',
      },
      activeText: {
        color: 'white',
      },
    });
