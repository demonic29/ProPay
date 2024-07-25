import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import Octicons from 'react-native-vector-icons/Octicons';
import { getAuth, signOut } from 'firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomDrawer = (props, navigation) => {
    const [fontsLoaded] = useFonts({
        'SpaceGrotesk-Regular': require('../assets/noto-font/SpaceGrotesk-Regular.ttf'),
        'SpaceGrotesk-SemiBold': require('../assets/noto-font/SpaceGrotesk-SemiBold.ttf'),
        'SpaceGrotesk-Bold': require('../assets/noto-font/SpaceGrotesk-Bold.ttf'),
    });

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

    if (!fontsLoaded) {
        return null; // or a loading spinner
    }

    const handleSignOut = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            console.log("User signed out");
            props.navigation.navigate('Entry')
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{}}>
                <View style={styles.headerContainer}>
                    {img && <Image source={{ uri: img }} style={styles.profileImage} />}
                    <Text style={styles.userName}>Alex Gosling</Text>
                </View>

                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                <View style={styles.signOutContainer}>
                    <Octicons name='sign-out' size={15} />
                    <Text style={styles.signOutText}>Sign Out</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
        backgroundColor: '#00566F',
        marginBottom: 20,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 40,
    },
    userName: {
        color: '#fff',
        marginTop: 10,
        fontSize: 20,
        fontFamily: 'SpaceGrotesk-Bold',
    },
    signOutButton: {
        padding: 25,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    signOutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    signOutText: {
        fontFamily: 'SpaceGrotesk-Bold',
    },
});

export default CustomDrawer;
