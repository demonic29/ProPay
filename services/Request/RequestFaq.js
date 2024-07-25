import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const RequestFaq = () => {
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
    const faqData = require('../Electric_Card/faq.json');
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
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuIcon}>
            <MaterialIcons name="menu" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            {img && <Image source={{ uri: img }} style={styles.profileImage} />}
          </TouchableOpacity>
        </View>
  
        {/* Main Image */}
        <View style={{padding : 10}}>
        <View style={styles.mainImageContainer}>
          <Image
            source={require('../imgs/1.png')}
            style={{ width: '100%',height: height / 3 }}
          />
        </View>
  
        {/* FAQ Questions */}
        {faq && (
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
        )}
  
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('BalanceCharge')}>
              <Text style={styles.loginButton}>Create ProPay Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}

export default RequestFaq

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingTop: 20,
    },
    menuIcon: {
      marginTop: 10,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    mainImageContainer: {
      alignItems: 'center',
      // marginTop: 50,
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
    },
    answer: {
      color: '#555',
      marginTop: 10,
    },
    loginButton: {
      backgroundColor: '#00566F',
      color: '#fff',
      // paddingHorizontal: 50,
      paddingVertical: 10,
      borderRadius: 5,
      textAlign: 'center',
      overflow: 'hidden',
      marginTop: 50,
    },
  });