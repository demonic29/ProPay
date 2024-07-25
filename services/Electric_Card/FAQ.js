import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import HeaderImg from '../../components/HeaderImg';
import Header from '../../components/Header';
import FooterBtn from '../../components/FooterBtn';

const FAQ = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // FAQ Data
  const faqData = require('../Electric_Card/faq.json');
  const [faq, setFaq] = useState(faqData);

  useEffect(() => {
    setFaq(faqData);
  }, []);

  const [showFaq, setShowFaq] = useState([]);

  const toggleFaq = (index) => {
    setShowFaq((prev) => {
      const isShowed = prev.includes(index);
      if (isShowed) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <Header navigation={() => navigation.navigate('Home')} />

      <View style={[styles.container, { paddingBottom: insets.bottom + 60 }]}>
        {/* Main Image */}
        <HeaderImg img={require('../imgs/4.png')}/>

        {/* FAQ Questions */}
        <FlatList
          data={faq}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.faqItem}>
              <TouchableOpacity onPress={() => toggleFaq(index)} style={styles.questionContainer}>
                <Text style={styles.question}>{item.q}</Text>
                <MaterialIcons
                  name={showFaq.includes(index) ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
              {showFaq.includes(index) && (
                <Text style={styles.answer}>{item.a}</Text>
              )}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }} // Provide enough padding to avoid overlapping the footer button
        />
      </View>

      {/* Footer Button */}
      <FooterBtn navigation={() => navigation.navigate('BalanceCharge')} title={"Create ICOCA"}/>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  faqItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 10,
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    
  },
  answer: {
    color: '#555',
    marginTop: 10,
    fontSize : 12,
    fontFamily: 'Poppins-Regular',
    
  },
 
});
