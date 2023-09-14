import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import RectangleColorPicker from 'react-native-rectangle-color-picker';
import {logOut} from '../../feature/userSlice/UserSlice';
import styles from './styles';

const UserProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const uid = useSelector(state => state.user?.user?.uid);
  const [documentId, setDocumentId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) {
      const fetchDocumentId = async () => {
        try {
          const querySnapshot = await firestore()
            .collection('UsersPosition')
            .where('userId', '==', uid)
            .get();

          if (!querySnapshot.empty) {
            const document = querySnapshot.docs[0];
            setDocumentId(document.id);
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      };

      fetchDocumentId();
    }
  }, [uid]);

  const handleUpdate = async () => {
    try {
      if (!documentId) {
        console.error('No document ID available for update.');
        return;
      }

      await firestore().collection('UsersPosition').doc(documentId).update({
        firstName,
        lastName,
        color: selectedColor,
      });

      setFirstName('');
      setLastName('');
      setSelectedColor('#000000');
      setDocumentId('');
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={text => setFirstName(text)}
        placeholder="Enter your first name"
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={text => setLastName(text)}
        placeholder="Enter your last name"
      />
      <Text style={styles.label}>Select Color:</Text>
      <RectangleColorPicker
        onColorSelected={color => setSelectedColor(color)}
        defaultColor={selectedColor}
        colorPickerStyle={styles.colorPicker}
        diamond={true}
        staticPalette={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Add/Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(logOut());
          }}
          style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;
