import React, { useState, useEffect } from 'react';
    import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    export default function ProfileScreen() {
      const [profile, setProfile] = useState({
        age: '',
        maritalStatus: '',
        sexuality: '',
        relationshipLength: '',
        country: '',
        sharedFriendGroup: '',
        livingSituation: '',
      });

      useEffect(() => {
        loadProfile();
      }, []);

      const loadProfile = async () => {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      };

      const saveProfile = async () => {
        await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
        alert('Profile saved successfully!');
      };

      const handleInputChange = (key: string, value: string) => {
        setProfile({ ...profile, [key]: value });
      };

      return (
        <ScrollView style={styles.container}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            value={profile.age}
            onChangeText={(text) => handleInputChange('age', text)}
          />

          <Text style={styles.label}>Marital Status:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your marital status"
            value={profile.maritalStatus}
            onChangeText={(text) => handleInputChange('maritalStatus', text)}
          />

          <Text style={styles.label}>Sexuality:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your sexuality"
            value={profile.sexuality}
            onChangeText={(text) => handleInputChange('sexuality', text)}
          />

          <Text style={styles.label}>Relationship Length:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your relationship length"
            value={profile.relationshipLength}
            onChangeText={(text) => handleInputChange('relationshipLength', text)}
          />

          <Text style={styles.label}>Country:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your country"
            value={profile.country}
            onChangeText={(text) => handleInputChange('country', text)}
          />

          <Text style={styles.label}>Shared Friend Group:</Text>
          <TextInput
            style={styles.input}
            placeholder="Do you share a friend group? (Yes/No)"
            value={profile.sharedFriendGroup}
            onChangeText={(text) => handleInputChange('sharedFriendGroup', text)}
          />

          <Text style={styles.label}>Living Situation:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your living situation (e.g., Long distance, Same city, Cohabiting)"
            value={profile.livingSituation}
            onChangeText={(text) => handleInputChange('livingSituation', text)}
          />

          <Button title="Save Profile" onPress={saveProfile} />
        </ScrollView>
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
