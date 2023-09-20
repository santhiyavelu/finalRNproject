import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  FlatList,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import MapControl from '../../controls/Mapcontrol';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import ChatScreen from '../../chatScreeen';
import {usePubNub} from 'pubnub-react';
import {resetMessage} from '../../feature/messageSlice/messageSlice';
// import ActionSheet from 'react-native-actions-sheet';

const UserLocation = () => {
  const [markers, setMarkers] = useState([]);
  const [userPlaces, setUserPlaces] = useState([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const parentControlMapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const actionSheetRef = useRef(null);

  const pubnub = usePubNub();
  const dispatch = useDispatch();
  const uid = useSelector(state => state.user?.user?.uid);

  const [channels] = useState(['ITC', uid]);

  const messages = useSelector(state => state.message.messages);
  console.log(messages, 'messsages');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user places from Firestore
        const querySnapshot = await firestore()
          .collection('UsersPosition')
          .get();

        const places = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          places.push(data);
        });

        setUserPlaces(places);

        // Create markers based on user places
        const markersData = places.map(place => ({
          coordinate: {
            latitude: place.currentLatitude,
            longitude: place.currentLongitude,
          },
          color: place.userColor,
          title: place.author,
          userId: place.userId,
        }));

        // Add an additional object with "ITC" text
        markersData.push({
          coordinate: {
            // Provide the latitude and longitude for the "ITC" location
            latitude: 0,
            longitude: 0,
          },
          color: 'red', // Set the color for ITC
          title: 'ITC',
          userId: 'ITC_USER_ID', // You can set a specific user ID for ITC if needed
        });
        console.log(markersData, 'markersdata');
        setMarkers(markersData);
      } catch (error) {
        console.error('Error fetching user places:', error);
      }
    };

    fetchData();
  }, []);

  const handleMessage = event => {
    console.log(event, 'message trigger');
    const message = event?.message;
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      console.log(message, 'message afte if loop');
      const text = message;
      const newMessage = {
        sender: event.publisher,
        channel: event.channel,
        text: text,
      };

      setReceivedMessages(prevMessages => [...prevMessages, newMessage]);

      console.log('New message from receive', receivedMessages);
    }
  };

  useEffect(() => {
    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels});
    console.log('New message from receive', receivedMessages);
    return () => {
      pubnub.removeListener({message: handleMessage});
      pubnub.unsubscribe({channels});
    };
  }, [channels]);

  const animateToRegion = coords => {
    parentControlMapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  const handlesetModalVisible = () => {
    setModalVisible(false);
    setReceivedMessages([]);
    dispatch(resetMessage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {/* Display the ChatScreen component */}
        <ChatScreen />
      </View>
      <View style={styles.mapContainer}>
        {/* Display the MapView component */}
        <MapControl
          onMapReady={() => setIsMapReady(true)}
          ref={parentControlMapRef}
          markers={markers}
        />
      </View>
      <View style={styles.markerContainer}>
        {markers.map(marker => (
          <View key={marker.title} style={styles.markerContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                animateToRegion(marker.coordinate);
              }}>
              <Text style={styles.buttonText}>
                {marker.title}
                {/* {marker.userId} */}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // setSelectedMarker(marker);
                  actionSheetRef.current?.show();
                  setModalVisible(true);
                }}>
                {receivedMessages.some(
                  message => message.sender === marker.userId,
                ) &&
                  !isModalVisible && (
                    <Image
                      source={require('/Users/santhiyavelusamy/Documents/ReactNative/FinalProject/src/assets/images/msg.png')}
                      style={styles.icon}
                    />
                  )}
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <FlatList
              data={receivedMessages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View>
                  <Text>
                    Message from
                    {item.sender}: {item.text}
                  </Text>
                </View>
              )}
            />
          </View>
          {/* Message List */}
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.messageItem}>
                <Text style={styles.senderName}>{selectedMarker?.title}:</Text>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
          />

          {/* Close Button */}
          <View style={styles.closeButtonContainer}>
            <Button
              title="Close"
              onPress={() => handlesetModalVisible()}
              color="#FF5733"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserLocation;
