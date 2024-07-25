// CreditPayment.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Header from '../../components/Header';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import FooterBtn from '../../components/FooterBtn';
import HeaderImg from '../../components/HeaderImg';
import LoadingScreen from '../../components/LoadingScreen';

const CreditPayment = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate('PaymentReceipt', { paymentMethod: 'Credit' });
      setIsLoading(false);
    }, 2000); // Simulating a delay
  };

  return (
    isLoading ? <LoadingScreen /> : 
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={0}>
      <Header navigation={() => navigation.navigate('PaymentMethod')} />
      <View style={{ paddingHorizontal: 30, justifyContent: 'space-evenly', flex: 1 }}>
        <HeaderImg img={require('../imgs/payment_credit.png')} />
        <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
          <View style={{ gap: 30 }}>
            <View style={{ gap: 15 }}>
              <View>
                <Text style={styles.title}>Fill Card Infos</Text>
              </View>
              <View>
                <Text style={styles.infos}>Card Number:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Input your card number"
                  keyboardType="numeric"
                />
              </View>
              <View>
                <Text style={styles.infos}>Card Pin:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Input Card Pin"
                  secureTextEntry
                />
              </View>
            </View>
            <View style={{ gap: 20 }}>
              <Text style={styles.title}>Payment infos</Text>
              <Text style={styles.infos}>Gas Bill: 2500¥</Text>
              <Text style={styles.infos}>Payment Method: Credit Card</Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <FooterBtn navigation={handleNavigation} title={"Okay, I pay"} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
  },
  infos: {
    fontFamily: 'Poppins-Regular',
    color: '#0007',
  },
  input: {
    borderColor: '#0005',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
  },
});

export default CreditPayment;
