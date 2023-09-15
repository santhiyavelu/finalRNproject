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
  const [selectedColor, setSelectedColor] = useState('');
  const uid = useSelector(state => state.user?.user?.uid);
  const dispatch = useDispatch();

  const onSelectColor = ({hex}) => {
    setSelectedColor(hex);
    console.log(hex);
  };

  useEffect(() => {
    // Retrieve user information from Firestore based on uid
    const unsubscribe = firestore()
      .collection('UsersPosition')
      .doc(uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          const userData = doc.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setSelectedColor(userData.userColor);
        }
      });

    return () => {
      // Unsubscribe from Firestore when the component unmounts
      unsubscribe();
    };
  }, [uid]);

  const handleUpdate = () => {
    // Update user information in Firestore
    firestore()
      .collection('UsersPosition')
      .doc(uid)
      .update({
        firstName,
        lastName,
        selectedColor,
      })
      .then(() => {
        console.log('User information updated successfully');
      })
      .catch(error => {
        console.error('Error updating user information', error);
      });
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
          style={{width: '100%', marginTop: 150}}
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
