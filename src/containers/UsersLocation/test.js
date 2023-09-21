import { StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Map, { MapViewHandle } from 'controls/Map';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import firestore from '@react-native-firebase/firestore';
import { AUTHOR, ITC, ITC_DATA } from 'config/constants/app_constants';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { GeoError, GeoPosition } from 'react-native-geolocation-service';
import LocationHelper from 'helpers/LocationHelper';
import { RESULTS } from 'react-native-permissions';
import { LatLng, MapMarkerProps } from 'react-native-maps';
import { ActionSheetRef } from 'react-native-actions-sheet';
import PubNubHelper from 'helpers/PubNubHelper';
import { MessageEvent } from 'pubnub';
import ChatInput from './ChildComponent/ChatInput';
import UserList from './ChildComponent/UserList';
import {
  Message,
  addMessage,
  resetUnreadCount,
} from 'feature/message/messageSlice';
import MessageList from './ChildComponent/MessageList';
import { UserPosition, setUserPosition } from 'feature/places/placesSlice';
import { useUpdateLocation } from 'hooks/useUpdateLocation';

const placesRef = firestore().collection('UsersPosition');

const CommonPlacesScreen = () => {
  const actionSheetRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const mapRef = useRef(null);
  const authUser = useAppSelector((state) => state.auth.user);
  const [channels] = useState(['ITC', authUser?.uid]);
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.messages.messages);

  useUpdateLocation();

  const handleMessage = useCallback(
    (event) => {
      const message = event.message;
      if (typeof message === 'string' || message.hasOwnProperty('text')) {
        const text = message.text || message;
        const data = {
          message: text,
          channel: event.channel,
          publisher: event.publisher,
        };
        const isITC = event.channel === ITC;
        dispatch(addMessage({ channel: isITC ? ITC : event.publisher, data }));
      }
    },
    [dispatch]
  );

  const showMessageList = useCallback(
    (userId) => {
      if (messages[userId]) {
        dispatch(resetUnreadCount({ channel: userId }));
      }
      const messageListTemp = messages[userId]?.list;
      setMessageList(messageListTemp ? messageListTemp : []);
      actionSheetRef.current?.show();
    },
    [dispatch, messages]
  );

  useEffect(() => {
    PubNubHelper.subscribe({ channels });
    PubNubHelper.addListener(handleMessage);

    return () => {
      PubNubHelper.removeListener(handleMessage);
      PubNubHelper.unsubscribeAll();
    };
  }, [channels, handleMessage]);

  useEffect(() => {
    placesRef.get().then((querySnapshot) => {
      let userPositionData = [];
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        userPositionData.push(data);
      });
      userPositionData.push(ITC_DATA);
      dispatch(setUserPosition(userPositionData));
    });
  }, [dispatch]);

  useEffect(() => {
    const subscriber = placesRef.onSnapshot((querySnapshot) => {
      let markersData = [];
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        markersData.push({
          coordinate: {
            latitude: data.currentLatitude,
            longitude: data.currentLongitude,
          },
          title: data.author,
          description: `User Speed is ${data.speed}`,
          pinColor: data.userColor,
        });
      });
      setMarkers(markersData);
    });

    return () => subscriber();
  }, []);

  const animateToRegion = useCallback((coords) => {
    mapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  }, []);

  const onMapReady = useCallback(() => {
    setIsMapReady(true);
  }, []);

  return (
    <CustomSafeAreaView style={styles.container}>
      <ChatInput />
      <Map ref={mapRef} onMapReady={onMapReady} markers={markers} />
      <UserList animateToRegion={animateToRegion} showMessageList={showMessageList} />
      <MessageList messages={messageList} ref={actionSheetRef} />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
});

export default CommonPlacesScreen;

import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import colors from 'theme/colors';
import { fontSize } from 'theme/fonts';
import CText from 'components/CText';
import { useAppSelector } from 'app/hooks';

const MessageList = forwardRef((props, ref) => {
  const [placeDetail, setPlaceDetail] = useState([]);
  const authUser = useAppSelector((state) => state.auth.user);
  const userPositionData = useAppSelector((state) => state.places.userPosition);

  useEffect(() => {
    if (userPositionData) {
      let placeDetailsData = userPositionData.map((data) => ({
        userId: data.userId,
        userName: data.userName,
        author: data.author,
      }));

      setPlaceDetail(placeDetailsData);
    }
  }, [userPositionData]);

  const getPublisherName = (userId) => {
    const author = placeDetail.filter((place) => place.userId === userId)[0]
      ?.author;

    return author ? author : 'unknown';
  };

  const chatBoxAlign = (publisher) => {
    return authUser?.uid === publisher ? 'flex-end' : 'flex-start';
  };

  return (
    <ActionSheet containerStyle={styles.actionSheet} ref={ref}>
      <FlatList
        data={props.messages}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.chatContainer,
                { alignItems: chatBoxAlign(item.publisher) },
              ]}
            >
              <View
                style={[
                  styles.chatTextBox,
                  { alignItems: chatBoxAlign(item.publisher) },
                ]}
              >
                <CText style={[styles.publisher]}>
                  {getPublisherName(item.publisher)}
                </CText>
                <CText>{item.message}</CText>
              </View>
            </View>
          );
        }}
      />
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  userAvatarContainer: {
    position: 'absolute',
    top: 70,
    right: 10,
    flex: 1,
    gap: 10,
  },
  actionSheet: {
    height: Dimensions.get('screen').height / 2,
    padding: 10,
    backgroundColor: colors.app.background,
  },
  chatContainer: {
    paddingVertical: 5,
  },
  publisher: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
  },
  chatTextBox: {
    width: '70%',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default memo(MessageList);
