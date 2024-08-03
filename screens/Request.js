import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import HeaderImg from '../components/HeaderImg';
import FooterBtn from '../components/FooterBtn';


const Request = ({ navigation }) => {

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // Profile Image
  const [img, setImg] = useState(null);
  useEffect(() => {
    const loadImg = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
          setImg(savedImage);
        }
      } catch (error) {
        console.error('Failed to load Image', error);
      }
    };

    loadImg();
  }, []);

  // FAQ Data
  const faqData = require('../services/Electric_Card/faq.json');
  const [faq, setFaq] = useState(faqData);

  useEffect(() => {
    setFaq(faqData);
  }, []);


  const [ showFaq , setShowFaq ] = useState([]);

  const toggleFaq = (index) => {
    setShowFaq((prev) => {
      const isShowed = prev.includes(index);
      if(isShowed) {
        return prev.filter((i) => i !== index)
      }else {
        return [...prev, index]
      }
    })
  }

  return (
    
    <View style={[{ paddingBottom : insets.bottom + 60}, styles.container]}>
      
      {/* Main Image */}
      <HeaderImg img={require('../imgs/1.png')}/>
      
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
        />
      <FooterBtn navigation={() => navigation.navigate("RequestQr")} title={"Create Request"}/>
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#fff',
    justifyContent : 'space-between'
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
    fontFamily : 'SpaceGrotesk-Bold'
  },
  answer: {
    color: '#555',
    marginTop: 10,
    fontFamily : 'SpaceGrotesk-SemiBold'

  },
});
