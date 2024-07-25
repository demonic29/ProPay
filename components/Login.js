import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../config/firebase';
import { useFonts } from 'expo-font';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation, }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const [fontsLoaded] = useFonts({
    'SpaceGrotesk-Regular': require('../assets/noto-font/SpaceGrotesk-Regular.ttf'),
    'SpaceGrotesk-SemiBold' : require('../assets/noto-font/SpaceGrotesk-SemiBold.ttf'),
    'SpaceGrotesk-Bold': require('../assets/noto-font/SpaceGrotesk-Bold.ttf'),
    'SpaceGrotesk-Bold': require('../assets/noto-font/SpaceGrotesk-Bold.ttf'),
  }); 
  
  
  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('MyDrawer')
      } catch (err) {
        console.log('got error', err);
      }
    }
  };
  
  const [img, setImg] = useState(null);
  // Store Image
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

  // Upload Image
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


  return (
    <View style={{paddingTop: insets.top, flex :1, justifyContent : 'center' , paddingHorizontal:15, backgroundColor : 'white'}}>
      {/* <View style={{ paddingHorizontal: 20, flex : 1, }}>
      </View> */}
      <Text style={{ fontSize: 20, fontFamily: 'SpaceGrotesk-Bold', marginTop: 20 , textAlign : 'center', textDecorationLine: 'underline'}}>Login</Text>

      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <View>
          {img && <Image source={{ uri: img }} style={{ width: 150, height: 150, borderRadius: 100 }} />}
        </View>
        <TouchableOpacity onPress={handleImage} activeOpacity={0.8}>
          <Text style={{ marginTop: 20, textDecorationLine: 'underline', fontFamily : 'SpaceGrotesk-Regular'}}>Upload</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ width: width / 1.1, marginTop: 30 , padding : 15}} keyboardDismissMode='on-drag'>

        <View style={{gap : 20}}>
          {/* Email */}
          <View>
            <Text style={{fontFamily : 'SpaceGrotesk-SemiBold'}}>Email</Text>
            <TextInput
              placeholder='yourname@gmail.com'
              value={email}
              onChangeText={value => setEmail(value)}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize='none'
            />
          </View>

          {/* password */}
          <View>
            <Text style={{fontFamily : 'SpaceGrotesk-SemiBold'}}>Password</Text>
            <TextInput
              placeholder='Enter Your Password'
              value={password}
              onChangeText={value => setPassword(value)}
              style={styles.input}
              secureTextEntry
            />

            {/* forgotPassword */}
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View>
          <TouchableOpacity 
            onPress={handleSubmit}
            style={{
              backgroundColor : '#00566F',
              paddingVertical : 15,
              paddingHorizontal : 20,
              width : width / 1.2,
              marginTop : 50,
              marginHorizontal : 'auto'
            }}
          >
            <Text style={{color : '#fff', textAlign : 'center', fontFamily : 'SpaceGrotesk-SemiBold'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Doesn’t have an account ? Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  input: {
    borderColor: '#0005',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },

  forgotPassword: {
    marginTop: 15,
    fontFamily: 'SpaceGrotesk-SemiBold',
    fontSize: 15,
    color: '#0007',
    textDecorationLine: 'underline',
  },

  signUpText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#0009',
    marginTop: 15,
    textDecorationLine: 'underline',
    fontFamily: 'SpaceGrotesk-SemiBold',
  },

});

export default Login;
