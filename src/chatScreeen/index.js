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
import {UserLocation} from '../containers';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import {addMessage, receiveMessage} from '../feature/messageSlice/messageSlice';

const ChatScreen = () => {
  const uid = useSelector(state => state.user?.user?.uid);

  const pubnub = new PubNub({
    publishKey: 'pub-c-f2919219-ac20-4403-b537-a678b79b4381',
    subscribeKey: 'sub-c-c5ddc634-c6fc-11e7-afd4-56ea5891403c',
    uuid: uid, // Default UUID
  });

  return (
    <PubNubProvider client={pubnub}>
      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <Chat selectedUuid={uid} />
        </View>
      </View>
    </PubNubProvider>
  );
};

function Chat({selectedUuid}) {
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const [channels] = useState(['ITC', selectedUuid]);
  const [messages, setaddMessage] = useState([]);
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

          userIds.push(userId);
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
    const options = ['Cancel', ...allUserIds, 'ITC'];
    console.log(options, 'options');

    ActionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex > 0) {
          setselectedUserChannel(options[buttonIndex]);
          console.log(options[buttonIndex], 'options[buttonIndex]');
        }
      },
    );
  };

  const handleMessage = event => {
    console.log('message trigger');
    const message = event.message;
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      const text = message.text || message;
      const newMessage = {sender: event.publisher, text: text};
      setaddMessage(messages => [...messages, newMessage]);

      console.log('New message from receive', event.publisher, ':', text);
      dispatch(receiveMessage(newMessage));
      // Handle messages from others here
    }
  };

  const sendMessage = message => {
    if (message) {
      console.log(messages, 'sendmessages');
      pubnub
        .publish({channel: selectedUserChannel, message})
        .then(() => {
          setMessage('');
          dispatch(addMessage({sender: 'You', text: message}));
        })
        .catch(error => {
          console.error('Error publishing message:', error);
        });
    }
  };

  useEffect(() => {
    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels});

    return () => {
      pubnub.removeListener({message: handleMessage});
    };
  }, [channels]);

  return (
    <View style={styles.chatScreen}>
      {/* <Text style={styles.chatHeader}>Chat Screen</Text> */}

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

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            sendMessage(message);
          }}>
          <Text style={styles.sendButtonText}>>></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChatScreen;
