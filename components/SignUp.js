import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Header from './Header';


const SignUp = ({ navigation }) => {
  const [img, setImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    const loadImg = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
          setImg(savedImage);
        }
      } catch (error) {
        console.error('Failed to load Image', error);
      }
    };

    loadImg();
  }, []);

  const handleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImg(uri);
      try {
        await AsyncStorage.setItem('profileImage', uri);
      } catch (error) {
        console.error('Failed to save image', error);
      }
    }
  };

  const removeImage = async () => {
    try {
      await AsyncStorage.removeItem('profileImage');
      setImg(null);
    } catch (error) {
      console.error('Failed to remove image', error);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Your account has been created successfully');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header navigation={() => navigation.navigate('UserInfo')}/>
      <ScrollView style={styles.container}>
        <View style={{ }}>
          <Text style={styles.title}>Create Your Utility Payment Account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder='Your Full Name...'
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize='none'
              placeholder='youremail@gmail.com'
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="At least 8 characters"
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.signUpButton}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signUpButtonText}>
               Create Account
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Poppins-Bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  uploadText: {
    marginTop: 20,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
  },
  removeText: {
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
    color: 'red',
  },
  form: {
    gap: 50,
    marginTop: 30,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 2,
    borderRadius: 5,
    fontFamily: 'Poppins-Regular',

  },
  signUpButton: {
    backgroundColor: '#00566F',
    paddingVertical: 15,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 250,
  },
  signUpButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default SignUp;
