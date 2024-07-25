import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderImg from '../../components/HeaderImg';
import Header from '../../components/Header';

const ChargeSuccess = ({navigation}) => {

    // safe view
    const insets = useSafeAreaInsets();

    // window dimension
    const { width, height } = useWindowDimensions();

    return (
        <View>
            
            {/* header */}
            <Header navigation={() => navigation.navigate('Home')}/>

            {/* main-text */}
            <View style={[styles.container]}>

                {/* main-img */}
                <HeaderImg img={require('../imgs/1.png')}/>

                <View style={{gap : 10, paddingHorizontal : 30}}>
                    <Text style={{fontFamily : 'SpaceGrotesk-Bold', fontSize : 30}}>Your Balance</Text>
                </View>

                {/* border */}
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

export default ChargeSuccess;

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
    
  });