import React from 'react';
import { View, StyleSheet,Button } from 'react-native';
import BarcodeGenerator from '../../components/BarcodeGenerator';

const RequestQr = ({navigation}) => {
  const paymentUrl = 'https://expo.dev/preview/update?message=%5Bmy-first-deployapp%5D&updateRuntimeVersion=1.0.0&createdAt=2024-07-25T06%3A59%3A23.639Z&slug=exp&projectId=1bfdcd4e-f237-4691-90a2-913c0fa2e33a&group=ca7df55c-bd48-46eb-8bb2-549fa62d5080';

  return (
    <View style={styles.container}>
      <BarcodeGenerator value={paymentUrl} />
      {/* <Button
        title="Open Camera"
        onPress={() => navigation.navigate('CameraScreen')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RequestQr;
