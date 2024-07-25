import { View, Text , Image} from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native';

export default function HeaderImg({img}) {

    const {width , height} = useWindowDimensions();
    return (
        // Main-Image
        <View style={{ width: '70%', marginHorizontal: 'auto',}}>
            <Image
                source={img}
                style={{ width: '100%', height: height / 3.5 , borderRadius : 10}}
            />
        </View>
    )
}