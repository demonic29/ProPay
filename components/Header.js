import { View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from 'react-native-vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({navigation}) {

    const insets = useSafeAreaInsets();
    return (
        <View style={{paddingTop : insets.top, paddingLeft : 10, backgroundColor : '#fff', }}>
            <TouchableOpacity onPress={navigation} >
                <MaterialIcons name="chevron-left" size={35} color="#000" />
            </TouchableOpacity>
        </View>
    )
}