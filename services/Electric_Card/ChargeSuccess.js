import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import HeaderImg from '../../components/HeaderImg';

const ChargeSuccess = ({navigation}) => {

    // safe view
    const insets = useSafeAreaInsets();

    // window dimension
    const { width, height } = useWindowDimensions();

    return (
        <View>
            <Header navigation={() => navigation.navigate('Home')}/>

            <View style={[styles.container,]}>

                <HeaderImg img={require('../imgs/2.png')}/>

                {/* main-text */}
                <View style={{gap : 10, paddingHorizontal : 30,}}>
                    <Text style={{fontFamily : 'SpaceGrotesk-Bold', fontSize : 30}}>Charge Successful</Text>
                    <Text style={{fontFamily : 'SpaceGrotesk-Regular', fontSize : 15,}}>Your ICOCA card charge succesful , here is your card amount </Text>
                </View>

                <View style={{alignItems: 'center', marginTop : 20}}>
                    <View style={{flexDirection : 'row',gap : 50, justifyContent : 'center' , alignItems : 'center', borderWidth :1, borderRadius : 10 ,padding : 10, width : 330}}>
                        <View style={{}}>
                            <Text style={{fontFamily : 'SpaceGrotesk-Regular', fontSize : 15,}}>Balance</Text>
                            <Text style={{fontFamily : 'SpaceGrotesk-Bold', fontSize : 30}}>¥5000</Text>
                        </View>
                        <View style={{backgroundColor : '#00566F', paddingHorizontal: 30, borderRadius : 10 , paddingVertical : 10}}>
                            <Text style={{fontFamily : 'SpaceGrotesk-Bold', fontSize : 15, color : '#fff'}}>Charge</Text>
                        </View>
                    </View>
                </View>
                       
            </View>
            
        </View>
    )
}

export default ChargeSuccess

const styles = StyleSheet.create({
    container: {
        height : '100%',
        backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      paddingTop: 20,
    },
    menuIcon: {
      marginTop: 10,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    
  });