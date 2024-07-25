import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Firebase Auth
import useAuth from '../hooks/useAuth';

// Screen Name
import Bill from '../components/Bill';
import SignUp from '../components/SignUp';
// import Home from '../Navigation/screens/Home';
// import BottomTabs from '../Navigation/BottomTabs';

// In use
// import HomeData from '../components/HomeData';
import Login from '../components/Login';
// import Entry from '../components/Entry';
import HomeScreen from '../routes/HomeScreen'
import MyDrawer from '../Drawer/MyDrawer';

const Stack = createNativeStackNavigator();

const HomeMain = () => {
    const { user } = useAuth();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    {/* {user ? (
                        <Login/>
                    ) : (
                        <HomeScreen/>
                        <Stack.Navigator>
                            <Stack.Screen name="Entry" component={Entry}/>
                            <Stack.Screen name="HomeData" component={HomeData}/>
                            <Stack.Screen name="Bill" component={Bill} options={{headerShown : false}}/>
                            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown : false,}}/>
                        </Stack.Navigator>
                    )} */}
                     <Stack.Navigator>
                        <Stack.Screen name="Entry" component={Entry}/>
                        <Stack.Screen name="MyDrawer" component={MyDrawer}/>
                    </Stack.Navigator>

                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

export default HomeMain;

