import { View, Text } from 'react-native'
import React from 'react'

const profileImg = () => {
    const [img, setImg] = useState(null);
    useEffect(() => {
      const loadImg = async () => {
        try {
          const savedImage = await AsyncStorage.getItem('profileImage');
          if (savedImage) {
            setImg(savedImage);
          }
        } catch (error) {
          console.error('Failed to load Image', error);
        }
      };

      loadImg();
    }, []);
}

export default profileImg