
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00566F" />
      <Text style={styles.text}>Payment Proccessing...</Text>
      <Image
        source={require('../imgs/Chad_Loading.gif')}
        style={{width:300, height : 300, borderRadius : 10, marginTop : 30}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: '#00566F',
    fontFamily: 'Poppins-Bold',
  },
});

export default LoadingScreen;
