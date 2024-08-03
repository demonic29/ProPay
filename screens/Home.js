// Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, useWindowDimensions, FlatList, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';

const Home = ({ navigation }) => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  // Insets for safe area
  const insets = useSafeAreaInsets();

  // Window dimensions
  const { width, height } = useWindowDimensions();

  // Bills data
  const [bills, setBills] = useState([
    { id: 1, bill: 'Gas', icon: 'flame', amount: 2000, monthlyData: [ { month: 'January', amount: 1800 }, { month: 'February', amount: 2000 }, { month: 'March', amount: 2200 }] },
    { id: 2, bill: 'Water', icon: 'water', amount: 1500, monthlyData: [ { month: 'January', amount: 1400 }, { month: 'February', amount: 1500 }, { month: 'March', amount: 1600 }] },
    { id: 3, bill: 'Telephone', icon: 'phone-portrait-outline', amount: 1000, monthlyData: [ { month: 'January', amount: 900 }, { month: 'February', amount: 1000 }, { month: 'March', amount: 1100 }] },
    { id: 4, bill: 'Rent', icon: 'flash', amount: 2400, monthlyData: [ { month: 'January', amount: 2400 }, { month: 'February', amount: 2400 }, { month: 'March', amount: 2400 }] },
  ]);

  // Total bill amount
  const [totalBill, setTotalBill] = useState(6900);

  // Selected bill state
  const [selectedBill, setSelectedBill] = useState(null);

  // Toggle function for selected bill
  const toggleBill = (bill) => {
    setSelectedBill((prevSelectedBill) => (prevSelectedBill === bill ? null : bill));
  };

  // useEffect(() => {
  //   Alert.alert('Welcome!', `You have ¥${totalBill} amount of bills to pay this month!`);
  // }, []);

  // Handle payment
  const handlePayment = (bill) => {
    Alert.alert(
      'Confirm Payment',
      `Are you sure you want to pay the ${bill.bill} bill of ¥${bill.amount}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Pay',
          onPress: () => {
            // Update the total bill amount
            setTotalBill((prevTotal) => prevTotal - bill.amount);
            // Remove the paid bill from the list
            setBills((prevBills) => prevBills.filter((item) => item.id !== bill.id));
            // Deselect the bill
            setSelectedBill(null);
            navigation.navigate('PaymentMethod');
          },
        },
      ]
    );
  };

  // Navigate to monthly bills
  const navigateToMonthlyBills = (bill) => {
    navigation.navigate('MonthlyBills', {
      bill: bill.bill,
      icon: bill.icon,
      monthlyData: bill.monthlyData,
    });
  };

  // Filter bill cards based on the selected bill
  const filteredBillCard = selectedBill ? bills.filter((card) => card.bill === selectedBill) : bills;

  return (
    <SafeAreaView style={{ paddingTop: insets.top, flex: 1 }}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTextSmall}>Active Total Bill</Text>
          <Text style={styles.headerTextLarge}>¥{totalBill}</Text>
        </View>
        {/* <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>See Details</Text>
        </TouchableOpacity> */}
      </View>

      <FlatList
        style={styles.horizontalList}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={bills}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.billButton,
              { backgroundColor: selectedBill === item.bill ? '#00566F' : 'transparent' },
            ]}
            onPress={() => toggleBill(item.bill)}
          >
            <Ionicons name={item.icon} size={15} color={selectedBill === item.bill ? '#fff' : '#00566F'} />
            <Text style={[styles.billButtonText, { color: selectedBill === item.bill ? '#fff' : '#00566F' }]}>
              {item.bill}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <FlatList
        data={filteredBillCard}
        style={styles.verticalList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.billCardContainer}>
            <View style={styles.billCardHeader}>
              <View style={styles.billCardHeaderLeft}>
                <Ionicons name={item.icon} size={35} />
                <View>
                  <Text style={styles.billCardTitle}>{item.bill}</Text>
                  <Text style={styles.billCardSubtitle}>April Payment</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigateToMonthlyBills(item)}>

              <MaterialIcons name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.billCardFooter}>
              <View>
                <Text style={styles.billCardFooterText}>Payment Account</Text>
                <Text style={styles.billCardFooterAmount}>¥{item.amount}</Text>
              </View>
              <TouchableOpacity style={styles.payButton} onPress={() => handlePayment(item)}>
                <Text style={styles.payButtonText}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#00566F',
    height: 150,
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    margin: 'auto',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    alignSelf: 'center',
  },
  headerTextSmall: {
    color: '#fff9',
    fontSize: 15,
  },
    headerTextLarge: {
      color: '#fff',
      fontSize: 12,
    },
    // Home.js (continued)
    headerTextLarge: {
      color: '#fff',
      fontSize: 50,
    },
    detailsButton: {
      borderWidth: 1,
      borderColor: '#fff',
      width: 100,
      padding: 10,
      borderRadius: 10,
    },
    detailsButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 12,
    },
    horizontalList: {
      height: 100,
      marginTop: 10,
      marginBottom : -30
    },
    billButton: {
      borderWidth: 1,
      borderColor: '#00566F',
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 20,
      marginLeft: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    billButtonText: {
      fontSize: 13,
      fontFamily : 'Poppins-Regular'
    },
    verticalList: {
      paddingHorizontal: 20,
    },
    billCardContainer: {
      padding: 20,
      marginVertical: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    billCardHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 10,
    },
    billCardHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    billCardTitle: {
      color: '#00566F',
      fontFamily: 'Poppins-Bold',
      fontSize: 25,
    },
    billCardSubtitle: {
      fontFamily: 'Poppins-Regular',
      fontSize: 10,
    },
    billCardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    billCardFooterText: {
      fontFamily: 'Poppins-SemiBold',
      color: '#0009',
    },
    billCardFooterAmount: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 20,
    },
    payButton: {
      backgroundColor: '#00566F',
      borderRadius: 10,
      paddingHorizontal: 40,
      paddingVertical: 10,
    },
    payButtonText: {
      color: 'white',
    },
  });

export default Home;
