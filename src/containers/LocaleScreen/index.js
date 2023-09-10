import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {LocalizationHelper} from '../../helpers';

const LocaleScreen = () => {
  const [someVal, setSomeVal] = useState(undefined);

  LocalizationHelper.onChange(() => {
    console.log('I18n has changed!');
  });

  return (
    <View>
      <Text>{LocalizationHelper.t('hello')}</Text>

      <TouchableOpacity
        onPress={() => {
          setSomeVal('1');
          LocalizationHelper.locale = 'en';
        }}>
        <Text>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSomeVal('2');
          LocalizationHelper.locale = 'ur';
        }}>
        <Text>UR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSomeVal('3');
          LocalizationHelper.locale = 'fr';
        }}>
        <Text>FR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocaleScreen;
