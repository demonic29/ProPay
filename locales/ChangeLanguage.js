import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/Header';
import HeaderImg from '../components/HeaderImg';
import i18next from '../locales/i18next'; // Ensure this is the correct path to your i18next configuration

const ChangeLanguage = ({ navigation }) => {
    const languages = [
        { name: 'English', code: 'en' },
        { name: 'Japanese', code: 'ja' },
    ];

    const [showLanguage, setShowLanguage] = useState(true); // Set to true to show language options
    const { t } = useTranslation();

    const changeLanguage = (lang) => {
        i18next.changeLanguage(lang);
    };

    return (
        <View style={styles.container}>
            <Header navigation={() => navigation.navigate('Profile')} />
            <HeaderImg img={require("../dist/assets/imgs/language.png")} />
            <View style={styles.subContainer}>
                <View>
                    <Text style={styles.title}>{t('changeLan')}</Text>
                    <Text style={styles.subtitle}>{t('The application default language is English')}</Text>
                </View>
                <View style={styles.languageOptions}>
                    {showLanguage && (
                        languages.map((item, index) => (
                            <TouchableOpacity style={styles.languageButton} key={index} onPress={() => changeLanguage(item.code)}>
                                <Text style={styles.languageText}>{t(item.name)}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    subContainer: {
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
    },
    languageOptions: {
        gap: 20,
        marginTop: 20,
    },
    languageButton: {
        backgroundColor: '#00566F',
        paddingVertical: 15,
        borderRadius: 20,
    },
    languageText: {
        color: '#fff',
        marginLeft: 20,
    },
});

export default ChangeLanguage;
