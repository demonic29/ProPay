import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import Header from '../../components/Header';

function PaymentMethod({ navigation, }) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const [data, setData] = useState([
    {
      title: "Convenience Store",
      desc: "You can pay your bills at Conbini ( 7Eleven , FamilyMart , Lawson ) in Cash Only",
      icon: "attach-money",
    },
    {
      title: "Credit Card / Debit Card",
      desc: "Input your credit / debit card info to pay the bills.",
      icon: "credit-card",
      credit: true,
    },
  ]);

  return (
    <View style={styles.container}>
      {/* header */}
      <Header navigation={() => navigation.navigate('Home')} />

      {/* payment-card */}
      <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: width / 1.1 }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name={item.icon} size={25} color="white" />
              <Text style={[styles.cardText, { fontSize: 20, fontFamily: 'Poppins-Bold' }]}>{item.title}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>{item.desc}</Text>
            </View>
            <TouchableOpacity
              style={[styles.cardFooter, { width: width / 4 }]}
              onPress={() => navigation.navigate(item.credit ? 'CreditPayment' : 'CashPayment')}
            >
              <Text style={[styles.cardText, { textAlign: 'center' }]}>Pay</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#00566F',
    padding: 20,
    gap: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardBody: {
    marginVertical: 10,
  },
  cardFooter: {
    paddingHorizontal: 25,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#6EBBD1',
  },
  cardText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
});
