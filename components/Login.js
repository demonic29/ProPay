import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../config/firebase';
import { useFonts } from 'expo-font';
import { signInWithEmailAndPassword } from 'firebase/auth';
import HeaderImg from './HeaderImg';
import FooterBtn from './FooterBtn';

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);

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

  const handleSubmit = async () => {
    if (email && password) {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        setLoading(false);
        navigation.navigate('MyDrawer');
      } catch (err) {
        setLoading(false);
        console.log('Error:', err);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        <View style={styles.container}>
          <Image source={require("../imgs/logo.png")} style={{width : 50, height : 50, objectFit : 'contain', marginBottom : 20}}/>

          <View style={styles.imageContainer}>
            {img && <Image source={{ uri: img }} style={styles.image} />}
            <TouchableOpacity onPress={handleImage} activeOpacity={0.8}>
              <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder='yourname@gmail.com'
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize='none'
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder='Enter Your Password'
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
              />
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

        
          <TouchableOpacity onPress={handleSubmit} style={styles.loginButton} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Don’t have an account? Sign up</Text>
          </TouchableOpacity>
        </View>

        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginVertical: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  uploadText: {
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
    gap: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    height: 40,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  forgotPassword: {
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#007BFF',
  },
  loginButton: {
    backgroundColor: '#00566F',
    paddingVertical: 15,
    paddingHorizontal : 150,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  signUpButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#007BFF',
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
});

export default Login;
