import React, { useState } from 'react';
    import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';

    interface VoiceInputProps {
      onVoiceAnswer: (answer: string) => void;
    }

    export default function VoiceInput({ onVoiceAnswer }: VoiceInputProps) {
      const [isRecording, setIsRecording] = useState(false);

      const handleIconPress = () => {
        setIsRecording(!isRecording);
        // Placeholder for actual voice recording implementation
        if (!isRecording) {
          onVoiceAnswer('Voice answer recorded');
        }
      };

      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleIconPress} style={styles.iconContainer}>
            <Ionicons name={isRecording ? 'mic' : 'mic-outline'} size={24} color="#FF6B6B" />
          </TouchableOpacity>
          {isRecording && <Text style={styles.recordingText}>Recording...</Text>}
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
      recordingText: {
        textAlign: 'center',
        color: 'red',
      },
    });
