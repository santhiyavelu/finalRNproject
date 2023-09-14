import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import RectangleColorPicker from 'react-native-rectangle-color-picker';

const UserProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const uid = useSelector(state => state.user?.user?.uid);
  const [documentId, setDocumentId] = useState('');

  // Use a separate useEffect for fetching the document ID
  useEffect(() => {
    if (uid) {
      const fetchDocumentId = async () => {
        try {
          const querySnapshot = await firestore()
            .collection('UsersPosition')
            .where('userId', '==', uid)
            .get();

          if (!querySnapshot.empty) {
            // Assuming there's only one matching document, so we take the first one
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

      // Reset input fields and documentId after updating
      setFirstName('');
      setLastName('');
      setSelectedColor('#000000');
      setDocumentId('');
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
    }
  };

  const changeColor = colorHsv =>
    setSelectedColor({oldColor: tinycolor(colorHsv).toHexString()});

  console.log(`Selected color in hexadecimal: ${selectedColor}`);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={text => setLastName(text)}
      />

      <Text style={styles.label}>Select Color:</Text>
      <RectangleColorPicker
        onColorSelected={color => {
          setSelectedColor(color);
          console.log(`Selected color in hexadecimal: ${color}`);
        }}
        defaultColor={selectedColor}
        colorPickerStyle={{width: 250, height: 250}}
        diamond={true}
        staticPalette={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Add/Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserProfile;
