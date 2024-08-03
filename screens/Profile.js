import { View, Text, TouchableNativeFeedback, LayoutAnimation, Platform, UIManager, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18next from '../locales/i18next';
import ProfileImage from '../components/ProfileImage';

const Profile = ({navigation}) => {

  const [settings, setSettings] = useState([
    {
      action: "Change Language",
      icon: "language",
      sideArrow: "chevron-forward-outline",
      navigateTo: "ChangeLanguage"
    },
    {
      action: "Terms and Conditions",
      icon: "newspaper-outline",
      sideArrow: "chevron-forward-outline",
      navigateTo: "TermsConditions"
    },
    {
      action: "ProPay Card",
      icon: "card-outline",
      sideArrow: "chevron-forward-outline",
      navigateTo: "PayProfile"
    }
  ]);

  return (
    <View style={styles.container}>
      <ProfileImage />
      
      <FlatList
        style={{ padding: 20, gap: 20 }}
        data={settings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(item.navigateTo)}>
            <View style={styles.item}>
              <Ionicons name={item.icon} size={20} />
              <Text style={styles.actionText}>{item.action}</Text>
              <Ionicons name={item.sideArrow} size={20} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    gap: 10
  },
  actionText: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
  },
});

export default Profile;
