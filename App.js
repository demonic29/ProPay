import * as React from 'react'
import HomeScreen from './routes/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// Native Baseimpor

export default function App () {
    return (
        // <AppContainer/>  
        <SafeAreaProvider>
            <HomeScreen/>
        </SafeAreaProvider>
    )
}