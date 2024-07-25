import { View, Text, Image } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font'

const Entry = ({navigation}) => {

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold' : require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        // Add more fonts as needed
    });

    const { width , height } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    return (
        <View style={{paddingTop : insets.top, justifyContent : 'center', flex : 1, alignItems : 'center',backgroundColor : '#fff', height : '100%'}}>
            {/* <View style={{alignItems : 'center'}}>
                <Text style={{fontFamily : 'Poppins-Bold', fontSize : 50, color: '#6EBBD1'}}>PROPAY</Text>
            </View> */}
            <View style = {{marginTop : 50}}>
                <Image
                    source={require('../imgs/7.png')}
                    style={{width : 300, height : 300, objectFit : 'cover'}}
                />
            </View>
            <View style={{alignItems : 'center', gap : 10,}}>
                <Text style={{fontSize : 25,fontFamily : 'Poppins-Bold',}}>WELCOME TO PROPAY !</Text>
                <Text style={{fontFamily : 'Poppins-Regular', fontSize : 15, color : '#0008', textAlign : 'center', lineHeight : 22,  width : 300,}}>ProPay will help you pay your utility bills in your everyday life.</Text>
            </View>

            <TouchableOpacity 
                onPress={() => navigation.navigate('HomeData')}
                style={{
                backgroundColor : '#00566F',
                paddingVertical : 15,
                paddingHorizontal : 20,
                width : width / 1.2,
                // borderRadius : 5,
                marginTop : 100
            }}>
                <Text style={{color : '#fff', textAlign : 'center', fontFamily : 'Poppins-SemiBold'}}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={{
                marginTop : 10
            }}>
                <Text style={{color : '#000', textAlign : 'center',textDecorationLine : 'underline',fontFamily : 'Poppins-SemiBold'}}>Login</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default Entry