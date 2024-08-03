import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import FooterBtn from '../components/FooterBtn';
import HeaderImg from '../components/HeaderImg';

export default function TermsConditions({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={() => navigation.navigate('Profile')} />

      <HeaderImg img={require('../imgs/6.png')} />

      <ScrollView style={styles.subContainer}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.content}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        </Text>
      </ScrollView>

        <FooterBtn title={'Home'} onPress={() => navigation.navigate('Home')} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    lineHeight: 30,
    overflow : 'hidden'
  },
 
});
