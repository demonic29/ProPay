//import liraries
import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import Octicons from 'react-native-vector-icons/Octicons';
import { getAuth, signOut } from 'firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// create a component
const MyComponent = () => {

    const inset = useSafeAreaInsets();
    const [img, setImg] = useState(null);
    useEffect(() => {
        const loadImg = async () => {
            try {
                const savedImage = await AsyncStorage.getItem('profileImage');
                if (savedImage) {
                    setImg(savedImage);
                }
            } catch (error) {
                console.error('Failed to load image', error);
            }
        };

        loadImg();
    }, []);

    return (
        <View style={[styles.container, {paddingVertical : inset.top}]}>
            {img && <Image source={{ uri: img }} style={styles.profileImage} />}
            <Text style={styles.userName}>Alex Gosling</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 70,
    },
    userName : {
        fontSize : 30,
        fontFamily : 'Poppins-SemiBold',
        color : "#fff",
        marginTop : 10
    }
});

//make this component available to the app
export default MyComponent;
