import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const BarcodeGenerator = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Scan to Pay</Text>
      <QRCode
        value={value}
        size={200}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default BarcodeGenerator;
