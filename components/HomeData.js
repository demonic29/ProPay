import { View, Text, FlatList, Animated, Dimensions, Image, StyleSheet, useWindowDimensions, Button, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
// import Home from '../screens/Home';

const HomeData = ({navigation, datas}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { width, height, scale } = useWindowDimensions();
    const scrollX = useRef(new Animated.Value(0)).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const slidesRef = useRef(null)

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold' : require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        // Add more fonts as needed
    });

    const viewableItemsChange = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const [homeDatas] = useState([
        {
            key: '1',
            title: 'Make a payment for Utility Bills',
            desc: 'Pay your utility bills with super easy and quick in our app!',
            img: require('../imgs/4.png'),
        },
        {
            key: '2',
            title: 'Make a Task-List for your life',
            desc: 'You can make your own Task-list , its super easy to maintain',
            img: require('../imgs/2.png'),
        },
        {
            key: '3',
            title: 'You Can Literally Use ICOCA CARD ',
            desc: 'You can use our new card that can go shopping and ride train',
            img: require('../imgs/1.png'),
            home : '../screens/Home.js',
        },
        {
            key: '4',
            title: 'No Money ? No Problem ! ',
            desc: 'You can request a payment to your friend so its good to have that kind of function',
            img: require('../imgs/3.png'),
            home : '../screens/Home.js',
        },

        
    ]);

    

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                style={{}}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
                data={homeDatas}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                horizontal
                onViewableItemsChanged={viewableItemsChange}
                keyExtractor={(item) => item.key}
                renderItem={({ item , index}) => (
                    <View style={[styles.itemContainer, { width, height}]}>
                        <View style={{alignItems : 'center'}}>
                            <View style={{marginTop : -100}}>
                                <Image source={item.img} style={[styles.image, { width: width / 1.6, height : height / 4}]} />
                            </View>

                            <View style={{gap : 10,}}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.desc}>{item.desc}</Text>
                            </View>

                            <TouchableOpacity style={[styles.button, {scale : scale}]} onPress={() => navigation.navigate('Bill')}>
                                    <Text style={styles.buttonText}>Skip</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <View style={{ flex : 1}}>
                            {index === homeDatas.length - 1 && (
                                <TouchableOpacity style={[styles.button, {scale : scale}]} onPress={() => navigation.navigate('Home')}>
                                    <Text style={styles.buttonText}>Let's Start</Text>
                                </TouchableOpacity>
                            )}
                        </View> */}
                       
                    </View>
                )}
            />
        </View>
    );
};

export default HomeData;

const styles = StyleSheet.create({

    container : {
        backgroundColor : 'white'
    },

    itemContainer: {
        
        // backgroundColor : 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : 'grey'
    },

    image: {
        resizeMode: 'contain',
    },
    
    title: {
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },
    desc: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: 50,
        color : '#0009'
    },
    button: {
        
        marginTop: 150,
        // paddingVertical: 10,
        // paddingHorizontal : 100,
        // backgroundColor: '#000',
        borderRadius: 5,
    },
    buttonText: {
        color: '#0008',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        textDecorationLine : 'underline'
    },
});
