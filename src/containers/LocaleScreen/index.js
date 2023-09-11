// LocaleScreen.js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changeLanguage} from '../../feature/localeSlice/LocalSlice';
import {LocalizationHelper} from '../../helpers';
import styles from './styles';

const LocaleScreen = () => {
  const language = useSelector(state => state.language);
  const dispatch = useDispatch();

  const handleLanguageChange = newLanguage => {
    dispatch(changeLanguage(newLanguage));
  };

  return (
    <View style={styles.container}>
      <Text>{LocalizationHelper.t('hello')}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={language === 'en' ? styles.selectedButton : styles.button}
          onPress={() => handleLanguageChange('en')}>
          <Text
            style={
              language === 'en' ? styles.selectedButtonText : styles.buttonText
            }>
            EN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={language === 'ur' ? styles.selectedButton : styles.button}
          onPress={() => handleLanguageChange('ur')}>
          <Text
            style={
              language === 'ur' ? styles.selectedButtonText : styles.buttonText
            }>
            UR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={language === 'fr' ? styles.selectedButton : styles.button}
          onPress={() => handleLanguageChange('fr')}>
          <Text
            style={
              language === 'fr' ? styles.selectedButtonText : styles.buttonText
            }>
            FR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocaleScreen;
