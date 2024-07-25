// CashPayment.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import FooterBtn from '../../components/FooterBtn';
import HeaderImg from '../../components/HeaderImg';
import LoadingScreen from '../../components/LoadingScreen';

const CashPayment = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate('PaymentReceipt', { paymentMethod: 'Cash' });
      setIsLoading(false);
    }, 2000); // Simulating a delay
  };

  return (
    isLoading ? <LoadingScreen /> : 
    <View style={styles.container}>
      <Header navigation={() => navigation.navigate('PaymentMethod')} />
      <View style={{ paddingHorizontal: 30, justifyContent: 'space-evenly', flex: 1 }}>
        <HeaderImg img={require('../imgs/QrCode.jpg')} />
        <ScrollView style={{ marginTop: 30 }}>
          <View style={{ gap: 40 }}>
            <View style={{ gap: 10 }}>
              <Text style={styles.title}>Payment Barcode</Text>
              <Text style={styles.infos}>Go to convince store and show the stuff this barcode to finish the payment.</Text>
            </View>
            <View style={{ gap: 20 }}>
              <Text style={styles.title}>Payment infos</Text>
              <Text style={styles.infos}>Gas Bill: 2500¥</Text>
              <Text style={styles.infos}>Payment Method: Cash</Text>
              <Text style={styles.infos}>Payment Place: Convince Store</Text>
              <Text style={styles.infos}>Barcode Expire: Tomorrow 7pm</Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <FooterBtn navigation={handleNavigation} title={"View Reciept"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
  },
  infos: {
    fontFamily: 'Poppins-Regular',
  },
});

export default CashPayment;
