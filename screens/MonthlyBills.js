// MonthlyBills.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const MonthlyBills = ({ route, navigation }) => {
  const { bill, icon, monthlyData } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 , backgroundColor : '#fff'}}>
      <Header navigation={() => navigation.navigate('Home') }/>
      <View style={styles.header}>
        <Ionicons name={icon} size={35} color="#00566F" />
        <Text style={styles.headerText}>{bill}</Text>
      </View>
      <FlatList
        data={monthlyData}
        keyExtractor={(item) => item.month}
        renderItem={({ item }) => (
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>{item.month}</Text>
            <Text style={styles.amountText}>¥{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff3',
  },
  headerText: {
    fontSize: 25,
    marginLeft: 10,
    color: '#00566F',
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  monthText: {
    fontSize: 18,
    color: '#00566F',
  },
  amountText: {
    fontSize: 18,
    color: '#000',
  },
});

export default MonthlyBills;
