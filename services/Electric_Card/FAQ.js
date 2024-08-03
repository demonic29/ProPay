import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// components
import HeaderImg from '../../components/HeaderImg';
import Header from '../../components/Header';
import FooterBtn from '../../components/FooterBtn';

// language
import i18next from '../../locales/i18next';
import { useTranslation } from 'react-i18next';

// Import FAQ data
const enfaqDatas = require('../../locales/en/enFaq.json');
const jafaqDatas = require('../../locales/ja/jaFaq.json');

const FAQ = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Japanese', code: 'ja' },
  ];

  const [faqs, setFaqs] = useState(enfaqDatas);
  const [showFaq, setShowFaq] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    if (currentLanguage === 'en') {
      setFaqs(enfaqDatas);
    } else if (currentLanguage === 'ja') {
      setFaqs(jafaqDatas);
    }
  }, [currentLanguage]);

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

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
        <HeaderImg img={require('../imgs/4.png')} />

        {/* FAQ Questions */}
        <FlatList
          data={faqs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.faqItem}>
              <TouchableOpacity onPress={() => toggleFaq(index)} style={styles.questionContainer}>
                <Text style={styles.question}>{t(`${item.q}`)}</Text>
                <MaterialIcons
                  name={showFaq.includes(index) ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
              {showFaq.includes(index) && (
                <Text style={styles.answer}>{t(`${item.a}`)}</Text>
              )}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }} // Provide enough padding to avoid overlapping the footer button
        />

        {/* Language Selector */}
       
      </View>

      {/* Footer Button */}
      <FooterBtn navigation={() => navigation.navigate('BalanceCharge')} title={'Create ProPay'} />
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
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
