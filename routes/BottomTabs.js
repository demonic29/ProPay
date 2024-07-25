// import
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';


// screens
import Home from '../screens/Home';
import ElectricCard from '../screens/ElectricCard';
import Request from '../screens/Request';
import MyDrawer from '../Drawer/MyDrawer';

// screenName
const homeName = 'Home';
const profileName = 'Profile';
const electricCardName = 'PayPro Card';
const request = 'Request';

// functions
const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
    return (
        <Tabs.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === homeName) {
                        iconName = 'home';
                    } else if (route.name === profileName) {
                        iconName = 'account';
                    } else if (route.name === electricCardName) {
                        iconName = 'card-outline';
                    }else if (route.name === request ) {
                        iconName = 'shapes';
                    }
                    return <Ionicons name={iconName} color={color} size={size} />;
                },
            })}
        >
            <Tabs.Screen
                name={homeName}
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    headerShown : false
                }}
            />
            <Tabs.Screen
                name={electricCardName}
                component={ElectricCard}
                options={{
                    tabBarLabel: 'PayPro Card',
                    headerShown : false
                }}
            /> 
            <Tabs.Screen
                name={request}
                component={Request}
                options={{
                    tabBarLabel: 'Request',
                    headerShown : false
                }}
            /> 


        </Tabs.Navigator>
        
    );
};

export default BottomTabs;
