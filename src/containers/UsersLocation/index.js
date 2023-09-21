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
import {resetMessage} from '../../feature/messageSlice/messageSlice';
import MessageScreen from './Messagescreen';
import {usePubNub} from 'pubnub-react';

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
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const uid = useSelector(state => state.user?.user?.uid);
  const [channels] = useState(['ITC', uid]);

  const channelMessages = useSelector(state => state.message.channelMessages);
  console.log(channelMessages, 'messsages');

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
        // console.log(markersData, 'markersdata');
        setMarkers(markersData);
        // setFilteredMessage(
        //   channelMessages.filter(message => {
        //     return message.publisher === markers.userId;
        //   }),
        // );
      } catch (error) {
        console.error('Error fetching user places:', error);
      }
    };

    fetchData();
  }, []);

  const handleMessage = event => {
    const message = event?.message;
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      const text = message;
      const newMessage = {
        sender: event.publisher,
        channel: event.channel,
        text: text,
      };

      setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
    }
  };

  console.log(receivedMessages, 'New message received');

  useEffect(() => {
    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels});
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

  const clearReceivedMessages = () => {
    setReceivedMessages([]); // Assuming you are using useState to manage receivedMessages
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
      {/* sending recivedMessages & actionsheetref as prop from userLocation to MessageScreen */}

      <MessageScreen
        receivedMessages={receivedMessages}
        actionSheetRef={actionSheetRef}
        clearReceivedMessages={clearReceivedMessages}
      />

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
                  actionSheetRef.current?.show();
                }}>
                {receivedMessages?.some(
                  message => message.sender === marker.userId,
                ) ? (
                  <Image
                    source={require('/Users/santhiyavelusamy/Documents/ReactNative/FinalProject/src/assets/images/msg.png')}
                    style={styles.icon}
                  />
                ) : null}
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default UserLocation;
