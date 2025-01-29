import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
    import React, { useState, useEffect } from 'react';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    export default function SettingsScreen() {
      const [apiKey, setApiKey] = useState('');

      useEffect(() => {
        loadApiKey();
      }, []);

      const loadApiKey = async () => {
        const storedApiKey = await AsyncStorage.getItem('openai-api-key');
        if (storedApiKey) {
          setApiKey(storedApiKey);
        }
      };

      const saveApiKey = async () => {
        await AsyncStorage.setItem('openai-api-key', apiKey);
        alert('API Key saved successfully!');
      };

      return (
        <View style={styles.container}>
          <Text style={styles.label}>OpenAI API Key:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your OpenAI API key"
            value={apiKey}
            onChangeText={setApiKey}
          />
          <Button title="Save API Key" onPress={saveApiKey} />
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
      },
    });
