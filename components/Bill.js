import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Bill = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'SpaceGrotesk-Regular': require('../assets/noto-font/SpaceGrotesk-Regular.ttf'),
        'SpaceGrotesk-SemiBold' : require('../assets/noto-font/SpaceGrotesk-SemiBold.ttf'),
        'SpaceGrotesk-Bold': require('../assets/noto-font/SpaceGrotesk-Bold.ttf'),
        // Add more fonts as needed
    });

    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets()
    const [bills, setBills] = useState([
        'Electric Bill',
        'Gas Bill',
        'Health Insurance',
        'Water Bill',
        'Rent',
        'Telephone Bill'
    ]);

    const [selectedBills, setSelectedBills] = useState([]);

    const toggleBillSelection = (bill) => {
        setSelectedBills((prevSelectedBills) =>
            prevSelectedBills.includes(bill) ? prevSelectedBills.filter((item) => item !== bill) : [...prevSelectedBills, bill]
        );
    };

    return (
        <View style={styles.container}>
            <View style={{marginTop: insets.top, width: '100%', paddingHorizontal: 30}}>
                <Text style={{fontSize: 30, fontFamily: 'SpaceGrotesk-Bold', marginTop: 20}}>Choose the Utility Payment</Text>
                <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>Choose one or multiple utility bills to pay!</Text>
            </View>
            <View>
                <Image 
                    source={require('../imgs/5.png')}
                    style={{ width: width / 1.6, height: height / 4 }}
                />
            </View>
            <View style={styles.billContainer}>
                {
                    bills.map((item) => {
                        const isSelected = selectedBills.includes(item);
                        return (
                            <TouchableOpacity key={item} onPress={() => toggleBillSelection(item)}>
                                <View style={[styles.billItem, isSelected && styles.selectedBillItem]}>
                                    <Text style={[styles.billText, isSelected && styles.selectedBillText]}>
                                        {item}
                                    </Text> 
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
            <View>
                <TouchableOpacity 
                    style={{
                        backgroundColor: '#00566F',
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        width: width / 1.2,
                    }}
                    onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Bill

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        gap: 50,
        alignItems: 'center'
    },
    billContainer: {
        flexDirection: 'row',
        columnGap: 20,
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        marginLeft: 25,
        justifyContent: 'flex-start',
    },
    billItem: {
        borderWidth: 1,
        borderColor: '#6EBAD0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20
    },
    selectedBillItem: {
        backgroundColor: '#6EBAD0',
    },
    billText: {
        color: '#000',
        fontFamily: 'SpaceGrotesk-Regular'
    },
    selectedBillText: {
        color: '#fff',
    },
});
