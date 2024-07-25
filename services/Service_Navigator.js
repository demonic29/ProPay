import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FAQ from './Electric_Card/FAQ'
import BalanceCharge from '../services/Electric_Card/BalanceCharge'
import ChargeSuccess from './Electric_Card/ChargeSuccess'
import PaymentMethod from './Payment_Service/PaymentMethod'
import PaymentDetail from './Payment_Service/PaymentDetail'

const Stack = createNativeStackNavigator();

const Service_Navigator = () => {
  return (
   <GestureHandlerRootView>
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='FAQ' component={FAQ}/>
        </Stack.Navigator>
        <Stack.Navigator>
            <Stack.Screen name='BalanceCharge' component={BalanceCharge}/>
        </Stack.Navigator>
        <Stack.Navigator>
            <Stack.Screen name='ChargeSuccess' component={ChargeSuccess}/>
        </Stack.Navigator>
    </NavigationContainer>
   </GestureHandlerRootView>
  )
}

export default Service_Navigator