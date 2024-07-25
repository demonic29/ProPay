import React, { useState , useEffect} from 'react';
import { View, TextInput, Button, StyleSheet , Text, Image, Alert} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Header from './Header';


const SignUp = ({navigation}) => {

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

  // user data setup
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // safeArea
  const insets = useSafeAreaInsets();

  // fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold' : require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  // Login Successful Alert
  const alert = () => {
    Alert.alert(
      "Successfully Created !",
      "Your Account is successfully created in our app"
      [{
        text : "Finish",
        onPress : () => Alert.alert('Go to Login')
      }]
    )
  }

  // new signUp account
  const handleSubmit = async () => {
    alert()
    if (email && password) {
      try {
        
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate('Login')
      } catch (err) {
        console.log('got error', err.message);
      }
    }
  };



  return (
    
    <ScrollView style={styles.container}>

      {/* <Header navigation={navigation}/> */}

      {/* Top View */}
      <View style={{marginTop : insets.top}}>
        <Text style={{ fontSize: 35, fontFamily: 'Poppins-Bold',}}>Create Your Utility Payment Account</Text>
      </View>


      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <View>
          {img && <Image source={{ uri: img }} style={{ width: 150, height: 150, borderRadius: 100 }} />}
        </View>
        <TouchableOpacity onPress={handleImage} activeOpacity={0.8}>
          <Text style={{ marginTop: 20, textDecorationLine: 'underline', fontFamily : 'Poppins-Regular'}}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* user_form */}
      <View style={{gap : 20}} keyboardDismissMode='on-drag'>
        <View style={{gap : 10,}}>
          <Text style={{fontFamily : 'Poppins-Regular'}}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder='Your Full Name...'
          />
        </View>
        <View style={{gap : 10}}>
          <Text style={{fontFamily : 'Poppins-Regular'}}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={value => setEmail(value)}
            keyboardType="email-address"
            autoCapitalize='none'
            placeholder='youremail@gamil.com'
          />
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />  */}
       <View style={{gap : 10}}>
        <Text style={{fontFamily : 'Poppins-Regular'}}>Password</Text>

        <TextInput
            style={styles.input}
            placeholder="At least 8 characters"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry
          />
       </View>
      </View>

      {/* SignUp btn */}
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.signInBtn}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap : 20,
    flex : 1,
    // justifyContent : 'space-evenly',
    height : '100%',
    backgroundColor : '#fff'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius : 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  signInBtn : {
    backgroundColor: '#00566F',
    color: '#fff',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: 'center',
    overflow: 'hidden',
    fontFamily : 'Poppins-Regular',
    marginTop: 50,
  }
});

export default SignUp;
