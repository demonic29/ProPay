import { View, Text , Image} from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native';

export default function HeaderImg({img}) {

    const {width , height} = useWindowDimensions();
    return (
        // Main-Image
        <View style={{ width: '50%', marginHorizontal: 'auto',}}>
            <Image
                source={img}
                style={{ width: '100%', height: height / 4 , borderRadius : 10, objectFit : 'cover'}}
            />
        </View>
    )
}