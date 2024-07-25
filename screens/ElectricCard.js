import { View, Text , Image, StyleSheet} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialIcons} from 'react-native-vector-icons'
import { useState , useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ElectricCard = ({navigation}) => {
  

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();


  const handleSubmit = () => {
    return (
      // Alert.alert('Are you sure to charge ?'),
      setTimeout(() => {
          navigation.navigate('FAQ')
      }, 1000)
    )
}


  return (
    <View style={{paddingTop : insets.top, height : '100%',backgroundColor : '#fff', justifyContent : 'center'}}>

      {/* main-img */}
      <View style={{width : '80%', marginHorizontal : 'auto'}}>
        <Image 
          source={require('../imgs/7.png')}
          style={{width : "100%", height : height / 4, }}
        />
      </View>

      {/* main-text */}
      <View style={{ justifyContent : 'center', marginTop : 50, paddingHorizontal : 50, gap : 20}}>

        {/* FAQ */}
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={{ color : '#fff', textAlign : 'center', fontWeight : 'bold'}}>First Time User</Text>
        </TouchableOpacity>

        {/* PayProfile */}
        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('PayProfile')}>
          <Text style={{ color : '#00566F', textAlign : 'center' , fontWeight : 'bold'}}>Go to ProCard</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ElectricCard

const styles = StyleSheet.create({

  btn : {
    backgroundColor: '#00566F',
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontFamily : 'SpaceGrotesk-Regular',
    borderRadius : 15,
  },

  btn2 : {
    borderWidth : 1,
    borderColor: '#00566F',
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontFamily : 'SpaceGrotesk-Regular',
    borderRadius : 15,
  },
})