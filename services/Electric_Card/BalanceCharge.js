import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import Header from '../../components/Header';
import HeaderImg from '../../components/HeaderImg';
import FooterBtn from '../../components/FooterBtn'

const BalanceCharge = ({navigation}) => {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();

    // Charge Amounts
    const [amount, setAmount] = useState([
        '1000',
        '2000',
        '3000',
        '4000',
        '5000',
        '10000'
    ]);

    const handleSubmit = () => {
        setTimeout(() => {
            navigation.navigate('ChargeSuccess')
        }, 1000);
    };

    const [selectedAmounts, setSelectedAmounts] = useState([]);

    const toggleAmountSelection = (amount) => {
        setSelectedAmounts((prevSelectedAmounts) =>
            prevSelectedAmounts.includes(amount)
            ? prevSelectedAmounts.filter((item) => item !== amount)
            : [...prevSelectedAmounts, amount]
        );
    };

    return (
        <View style={styles.container}>
            {/* header */}
            <Header navigation={() => navigation.navigate('FAQ')}/>
            
             {/* Main Image */}
            <HeaderImg img={require('../imgs/5.png')}/>

            <View style={{ marginTop : 20}}>
                {/* Charge Amount */}
                <View style={styles.amountContainer}>
                    {
                        amount.map((item) => {
                            const isSelected = selectedAmounts.includes(item);
                            return (
                                <TouchableOpacity key={item} onPress={() => toggleAmountSelection(item)}>
                                    <Text style={[styles.amountText, isSelected && styles.selectedAmountText]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>

            </View>
            <FooterBtn title={"Charge PayPro Card"} navigation={() => navigation.navigate("ChargeSuccess")}/>
        </View>
    );
}

export default BalanceCharge;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#ffff',
    },
    amountContainer: {
        gap: 20,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    amountText: {
        borderWidth: 1,
        borderColor: '#6EBAD0',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
        color: '#000'
    },
    selectedAmountText: {
        backgroundColor: '#6EBAD0',
        color: '#fff'
    },

    
});
