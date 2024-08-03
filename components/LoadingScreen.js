
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

const LoadingScreen = ({text}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00566F" />
      <Text style={styles.text}>{text}</Text>
      {/* <Image
        source={require('../imgs/Chad_Loading.gif')}
        style={{width:200, height : 200, borderRadius : 100, marginTop : 30}}
      /> */}
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
    fontSize: 15,
    color: '#00566F',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default LoadingScreen;
