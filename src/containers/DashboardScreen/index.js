import React from 'react';
import {Text, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const DashBoardScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Button
        title="Go Locale"
        onPress={() => {
          navigation.navigate('LocaleScreen');
        }}
      />
      <Text>Dashboard Screen Working</Text>

      <Button title="Logout" onPress={handleLogout} />
    </>
  );
};

export default DashBoardScreen;
