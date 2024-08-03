import Header from '../components/Header'
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoadingScreen from '../components/LoadingScreen'

const JapaneseAddressForm = ({ onSubmit , navigation}) => {
  const [postalCode, setPostalCode] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [city, setCity] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchAddress = async (postalCode) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.zipaddress.net/?zipcode=${postalCode}`);
        const data = await response.json();
        if (data.code === 200) {
          setPrefecture(data.data.pref);
          setCity(data.data.city);
          setStreetAddress(data.data.town);
        } else {
          setError('Failed to fetch address data.');
        }
      } catch (error) {
        console.error('Failed to fetch address data', error);
        setError('Failed to fetch address data.');
      } finally {
        setLoading(false);
      }
    };

    if (postalCode.length === 7) {
      fetchAddress(postalCode);
    } else {
      setPrefecture('');
      setCity('');
      setStreetAddress('');
    }
  }, [postalCode]);

  const handleSubmit = () => {
    if (!postalCode || !prefecture || !city || !streetAddress) {
      Alert.alert('Error', 'Please complete the address fields.');
      return;
    }
    navigation.navigate('SignUp')
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <Header navigation={() => navigation.navigate('Bill')}/>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Input Your Address</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Postal Code</Text>
            <TextInput
              style={styles.input}
              value={postalCode}
              onChangeText={setPostalCode}
              placeholder='1234567'
              keyboardType='numeric'
              maxLength={7}
            />
          </View>
          {loading && <LoadingScreen/> }
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prefecture</Text>
            <TextInput
              style={styles.input}
              value={prefecture}
              onChangeText={setPrefecture}
              placeholder='Tokyo'
              editable={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder='Shibuya'
              editable={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Street Address</Text>
            <TextInput
              style={styles.input}
              value={streetAddress}
              onChangeText={setStreetAddress}
              placeholder='1-2-3 Jinnan'
              editable={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Building Name</Text>
            <TextInput
              style={styles.input}
              value={buildingName}
              onChangeText={setBuildingName}
              placeholder='Building XYZ'
            />
          </View>
        </View>
      <View style={[styles.submitButtonContainer, { marginBottom: insets.bottom }]}>
        <Button title="SignUp Account" onPress={handleSubmit} color={"white"}/>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Poppins-Bold',
    marginBottom: 30,
  },
  form: {
    gap: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',

  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButtonContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#00566F',
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginTop : 80,
    fontFamily : 'Poppins-SemiBold'
  },
});

export default JapaneseAddressForm;
