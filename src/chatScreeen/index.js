import React, {useEffect, useState} from 'react';
import PubNub from 'pubnub';
import {PubNubProvider, usePubNub} from 'pubnub-react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ActionSheet from 'react-native-action-sheet';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import {addMessage, receiveMessage} from '../feature/messageSlice/messageSlice';
import styles from './styles';

const ChatScreen = () => {
  const uid = useSelector(state => state.user?.user?.uid);
  const selectedUuid = uid; // Add this line to set selectedUuid

  const dispatch = useDispatch();

  const pubnub = usePubNub();
  const [message, setMessage] = useState('');
  const [allUserIds, setAllUserIds] = useState([]);
  const [selectedUserChannel, setselectedUserChannel] = useState('');
  const [loadingUserIds, setLoadingUserIds] = useState(true);

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

        console.log('All User IDs:', userIds);
        setAllUserIds(userIds); // Update the state
      } catch (error) {
        console.error('Error fetching all user IDs:', error);
      } finally {
        setLoadingUserIds(false); // Update loading state
      }
    };
    fetchAllUserIds();
  }, []);

  const showUidActionSheet = () => {
    if (loadingUserIds) {
      return; // Don't open the dropdown if user IDs are still loading
    }
    const userNames = allUserIds.map(user => user.userName);
    const options = ['Cancel', ...userNames, 'ITC'];

    ActionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex > 0) {
          setselectedUserChannel(options[buttonIndex]);
        }
      },
    );
  };

  const sendMessage = () => {
    if (message) {
      pubnub
        .publish({channel: selectedUserChannel, message})
        .then(() => {
          setMessage('');
          dispatch(
            addMessage({
              sender: selectedUuid,
              text: message,
              channel: selectedUserChannel,
            }),
          );
        })
        .catch(error => {
          console.error('Error publishing message:', error);
        });
    }
  };

  return (
    <View style={styles.chatScreen}>
      {/* Show ActionSheet button */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={showUidActionSheet}>
          <Text style={styles.sendButtonText}>Select the Sender</Text>
        </TouchableOpacity>
      </View>
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
          <Text style={styles.sendButtonText}>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
