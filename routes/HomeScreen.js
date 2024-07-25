import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const Drawer = createDrawerNavigator();


// -------- Imports -------- 

// components
import HomeData from '../components/HomeData';
import Bill from '../components/Bill';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Entry from '../components/Entry';

// routes
import BottomTabs from '../routes/BottomTabs';

// services
import FAQ from '../services/Electric_Card/FAQ';
import BalanceCharge from '../services/Electric_Card/BalanceCharge'
import PayProfile from '../services/Electric_Card/PayProfile'
import Header from '../components/Header';

// Drawer
import MyDrawer from '../Drawer/MyDrawer'
import ChargeSuccess from '../services/Electric_Card/ChargeSuccess';
import PaymentMethod from '../services/Payment_Service/PaymentMethod';
import CashPayment from '../services/Payment_Service/CashPayment';
import CreditPayment from '../services/Payment_Service/CreditPayment'
import PaymentReceipt from '../services/Payment_Service/PaymentReceipt';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                <Stack.Screen
                        name="Entry"
                        component={Entry}
                        options={{
                            headerTintColor: 'white',
                            headerShadowVisible: false,
                            headerShown: false,
                        }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerTintColor: 'black',
                        headerShadowVisible: false,
                        headerShown: false,
                    }}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={{
                            headerTintColor: 'black',
                            headerShadowVisible: false,
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="HomeData"
                        component={HomeData}
                        options={{
                            headerTintColor: 'white',
                            headerShadowVisible: false,
                        }}
                    />
                    <Stack.Screen
                        name="Bill"
                        component={Bill}
                        options={{
                            headerTintColor: 'white',
                            headerShadowVisible: false,
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="BottomTabs"
                        component={BottomTabs}
                        options={{
                            headerTintColor: 'white',
                            headerShadowVisible: false,
                            headerShown: false,
                        }}
                    />

                    <Stack.Screen
                        name="FAQ"
                        component={FAQ}
                        options={{
                            headerTintColor: 'white',
                            headerShadowVisible: false,
                            headerShown: false,
                        }}
                    />

                    <Stack.Screen
                        name="BalanceCharge"
                        component={BalanceCharge}
                        options={{
                            headerTintColor: 'white',
                            headerShadowVisible: false,
                            headerShown: false,
                        }}
                    /> 

                    <Stack.Screen
                        name="MyDrawer"
                        component={MyDrawer}
                        options={{headerShown : false}}
                    /> 

                    <Stack.Screen
                        name="ChargeSuccess"
                        component={ChargeSuccess}
                        options={{headerShown : false}}
                    /> 
                    
                    <Stack.Screen
                        name="PayProfile"
                        component={PayProfile}
                        options={{headerShown : false}}
                    /> 

                    <Stack.Screen
                        name="PaymentMethod"
                        component={PaymentMethod}
                        options={{headerShown : false}}
                    /> 

                    <Stack.Screen
                        name="CashPayment"
                        component={CashPayment}
                        options={{headerShown : false}}
                    /> 

                    <Stack.Screen
                        name="Header"
                        component={Header}
                        options={{headerShown : false}}
                    /> 

                    <Stack.Screen
                        name="CreditPayment"
                        component={CreditPayment}
                        options={{headerShown : false}}
                    />  

                    <Stack.Screen
                        name="PaymentReceipt"
                        component={PaymentReceipt}
                        options={{headerShown : false}}
                    /> 

                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default HomeScreen;