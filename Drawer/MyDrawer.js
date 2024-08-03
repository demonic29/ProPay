import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from '../routes/BottomTabs';
import Profile from '../screens/Profile';
import Request from '../screens/Request';
import CustomDrawer from './CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ElectricCard from '../screens/ElectricCard';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (

    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer {...props}/>}
      screenOptions={{
        drawerActiveBackgroundColor : '#6EBBD1',
        drawerActiveTintColor : '#fff',
        drawerLabelStyle : {
          marginLeft : -20, 
          fontFamily : 'SpaceGrotesk-Bold',
        }
      }}
    >

      <Drawer.Screen 
        name="Home"
        component={BottomTabs} 
        options={{drawerIcon : () => (
          <Ionicons name='home' size={15} />
        )}}
      />

      <Drawer.Screen 
        name="Profile" 
        component={Profile}
        options={{drawerIcon : () => (
          <Ionicons name='person' size={15}/>
        )}}
      />

      <Drawer.Screen 
        name="ProPay Card" 
        component={ElectricCard}
        options={{drawerIcon : () => (
          <Ionicons name="card" size={15}/>
        )}}
      />

      <Drawer.Screen 
        name="Request" 
        component={Request}
        options={{drawerIcon : () => (
          <Ionicons name='shapes' size={15}/>
        )}}
      />

    </Drawer.Navigator> 
  );
}

export default MyDrawer;