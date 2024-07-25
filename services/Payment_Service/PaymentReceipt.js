// PaymentReceipt.js
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderImg from '../../components/HeaderImg'
import Header from '../../components/Header'
import FooterBtn from '../../components/FooterBtn'

export default function PaymentReceipt({navigation, route}) {

  const [ date, setDate ] = useState('');

  useEffect(()=> {
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate)
  }, []) 

  const paymentMethod = route?.params?.paymentMethod;

  return (
    <View style={styles.container}>
        
        <Header navigation={() => navigation.navigate('Home')}/>
        <HeaderImg img={require('../imgs/payment_receipt.png')}/>

        <ScrollView style={{marginTop : 30 , paddingHorizontal: 30}}>
          <View style={{gap : 40}}>
            <View style={{gap : 10}}>
              <Text style={styles.title}>Your Receipt, Alex Gosling !</Text>
              <Text style={styles.infos}>Thank you for using our services, here is your receipt of payment.</Text>
            </View>

            <View style={{gap : 10}}>
              <Text style={styles.title}>Payment infos</Text>
              <Text style={styles.infos}>Payment Date : {date}</Text>
              <Text style={[styles.infos]}>Payment Method : {paymentMethod}</Text>
              <Text style={styles.infos}>Gas Bill : 2500¥</Text>
          </View>
          </View>
        </ScrollView>

        <View>
          <FooterBtn navigation={() => navigation.navigate('Home')} title={"Back to Home"}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        height : '100%',
        backgroundColor : '#fff'
    },
    title: {
        fontSize : 25,
        fontFamily : 'Poppins-Bold'
      },
      infos : {
        fontFamily : 'Poppins-Regular',
        // marginTop : 20
      }
})
