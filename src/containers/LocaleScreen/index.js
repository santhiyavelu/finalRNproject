import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import useLocale from '../../helpers/LocalizationHelper';

const LocaleScreen = () => {
  const {i18n, setLocale} = useLocale();
  const [someVal, setSomeVal] = useState(undefined);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('hello')}</Text>
      <Text style={styles.subtitle}>{i18n.t('testLocale')}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSomeVal('1');
          setLocale('fr');
        }}>
        <Text style={styles.buttonText}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSomeVal('3');
          setLocale('en');
        }}>
        <Text style={styles.buttonText}>FR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocaleScreen;
