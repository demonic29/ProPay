import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native';
import { StyleSheet } from 'react-native';

export default function FooterBtn({navigation, title}) {
  const { width, height } = useWindowDimensions();
  
  return (
      <View style={styles.footer}>
        {/* button */}
        <TouchableOpacity 
            onPress={navigation}
            style={{
              backgroundColor : '#00566F',
              paddingVertical : 15,
              paddingHorizontal : 20,
              width : width / 1.2,
              borderRadius : 10,
              marginHorizontal : 'auto',
            }}
          >
            <Text style={{color : '#fff', textAlign : 'center', fontFamily : 'Poppins-Regular'}}>{title}</Text>
          </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
})