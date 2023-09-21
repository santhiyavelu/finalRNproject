import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {clearMessages} from '../../feature/messageSlice/messageSlice';
import styles from './msgstyle';
import ActionSheet from 'react-native-actions-sheet';

const MessageScreen = ({
  receivedMessages,
  actionSheetRef,
  clearReceivedMessages,
}) => {
  const dispatch = useDispatch();
  const channelMessages = useSelector(state => state.message.channelMessages);
  const channelIDs = Object.keys(channelMessages);

  const hideActionSheet = () => {
    actionSheetRef.current?.hide();
    channelIDs.forEach(channelID => {
      const messagesForChannel = channelMessages[channelID];
      console.log('Channel ID:', channelID);
      console.log('Messages:', messagesForChannel);
      dispatch(clearMessages({channel: channelID}));
    });
    clearReceivedMessages();
  };

  return (
    <ActionSheet ref={actionSheetRef}>
      <ScrollView style={styles.container}>
        {Object.keys(channelMessages).map(channelId => (
          <View key={channelId}>
            {/* <Text style={styles.receivedMessageText}>Sending Messages:</Text> */}
            <View style={styles.sendingMessageContainer}>
              {channelMessages[channelId].map((message, index) => (
                <View key={index} style={styles.sendingMessage}>
                  <Text>
                    {channelId} : {message}
                  </Text>
                </View>
              ))}
            </View>
            {/* <Text style={styles.receivedMessageText}>Received Messages:</Text> */}
            <View style={styles.receivedMessageContainer}>
              {receivedMessages
                .filter(message => message.channel === channelId)
                .map((message, index) => (
                  <View key={index} style={styles.receivedMessage}>
                    <Text>
                      {message.channel} : {message.text}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={hideActionSheet}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

export default MessageScreen;
