import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {LocalizationHelper} from '../../helpers';
import styles from './styles';

const LocaleScreen = () => {
  const [someVal, setSomeVal] = useState(undefined);

  LocalizationHelper.onChange(() => {
    console.log('I18n has changed!');
  });

  return (
    <View style={styles.container}>
      <Text>{LocalizationHelper.t('hello')}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={someVal === '1' ? styles.selectedButton : styles.button}
          onPress={() => {
            setSomeVal('1');
            LocalizationHelper.locale = 'en';
          }}>
          <Text
            style={
              someVal === '1' ? styles.selectedButtonText : styles.buttonText
            }>
            EN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={someVal === '2' ? styles.selectedButton : styles.button}
          onPress={() => {
            setSomeVal('2');
            LocalizationHelper.locale = 'ur';
          }}>
          <Text
            style={
              someVal === '2' ? styles.selectedButtonText : styles.buttonText
            }>
            UR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={someVal === '3' ? styles.selectedButton : styles.button}
          onPress={() => {
            setSomeVal('3');
            LocalizationHelper.locale = 'fr';
          }}>
          <Text
            style={
              someVal === '3' ? styles.selectedButtonText : styles.buttonText
            }>
            FR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocaleScreen;
