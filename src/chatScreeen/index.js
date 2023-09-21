import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {addMessageToChannel} from '../feature/messageSlice/messageSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import {usePubNub} from 'pubnub-react';
import styles from './styles';

const ChatScreen = () => {
  const uid = useSelector(state => state.user?.user?.uid);
  const selectedUuid = uid;

  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [allUserIds, setAllUserIds] = useState([]);
  const [selectedUserChannel, setSelectedUserChannel] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const channelMessages = useSelector(state => state.message.channelMessages);

  const pubnub = usePubNub();

  useEffect(() => {
    const fetchAllUserIds = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('UsersPosition')
          .get();

        const userIds = [];

        querySnapshot.forEach(doc => {
          const data = doc.data();
          const userId = data.userId;
          const userName = data.author;

          userIds.push({userId, userName});
        });

        userIds.push({
          userName: 'ITC',
          userId: 'ITC_USER_ID',
        });

        setAllUserIds(userIds);
      } catch (error) {
        console.error('Error fetching all user IDs:', error);
      }
    };
    fetchAllUserIds();
  }, []);

  const sendMessage = () => {
    if (message && value) {
      pubnub
        .publish({channel: value, message})
        .then(() => {
          setMessage('');
          dispatch(
            addMessageToChannel({
              sender: selectedUuid,
              text: message,
              channel: value,
              publisher: selectedUuid,
            }),
          );
          console.log('Message added successfully');
        })
        .catch(error => {
          console.error('Error publishing message:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          autoComplete="off"
          autoCorrect={false}
          value={message}
          onChangeText={changedText => {
            setMessage(changedText);
          }}
          placeholder="Write a message"
          style={styles.messageInput}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={allUserIds.map(data => ({
            label: data.userName,
            value: data.userId,
          }))}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setSelectedUserChannel}
          placeholder="Select Channel"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainerStyle}
          textStyle={styles.dropdownTextStyle}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
