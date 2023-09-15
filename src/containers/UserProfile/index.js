import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Modal,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import RectangleColorPicker from 'react-native-rectangle-color-picker';
import {logOut} from '../../feature/userSlice/UserSlice';
import styles from './styles';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

const UserProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const uid = useSelector(state => state.user?.user?.uid);
  const [documentId, setDocumentId] = useState('');
  const dispatch = useDispatch();

  const onSelectColor = ({hex}) => {
    setSelectedColor(hex);
    console.log(hex);
  };

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
        userColor: selectedColor,
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
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={text => setFirstName(text)}
        placeholder="Enter your first name"
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={text => setLastName(text)}
        placeholder="Enter your last name"
      />
      <Text style={styles.label}>Select Color</Text>
      <Button title="Color Picker" onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationType="slide">
        <ColorPicker
          style={{width: '70%'}}
          value="red"
          onComplete={onSelectColor}>
          <Preview />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <Button title="Ok" onPress={() => setShowModal(false)} />
      </Modal>
      {/* </View> */}

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
