import React from 'react';
    import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

    interface ModeSelectorProps {
      mode: string;
      onSelectMode: (mode: string) => void;
    }

    export default function ModeSelector({ mode, onSelectMode }: ModeSelectorProps) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.button, mode === 'timed' && styles.activeButton]}
            onPress={() => onSelectMode('timed')}
          >
            <Text style={[styles.text, mode === 'timed' && styles.activeText]}>Timed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, mode === 'unlimited' && styles.activeButton]}
            onPress={() => onSelectMode('unlimited')}
          >
            <Text style={[styles.text, mode === 'unlimited' && styles.activeText]}>Unlimited</Text>
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
