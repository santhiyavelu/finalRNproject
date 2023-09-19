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
import {useSelector} from 'react-redux';
import ChatScreen from '../../chatScreeen';
import pubnub from '../../helpers/pubnubhelper';

const UserLocation = () => {
  const [markers, setMarkers] = useState([]);
  const [userPlaces, setUserPlaces] = useState([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const parentControlMapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const uid = useSelector(state => state.user?.user?.uid);

  const [channels] = useState(['ITC', uid]);

  const messages = useSelector(state => state.message.messages);

  useEffect(() => {
    const handleMessage = event => {
      console.log('message trigger');
      const message = event.message;
      if (typeof message === 'string' || message.hasOwnProperty('text')) {
        const text = message.text || message;
        const newMessage = {sender: event.publisher, text: text};
        setReceivedMessages(prevMessages => [...prevMessages, newMessage]);

        console.log('New message from receive', receivedMessages);
      }
    };
    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels});

    return () => {
      pubnub.removeListener({message: handleMessage});
      pubnub.unsubscribe({channels});
    };
  }, [channels]);

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

  const animateToRegion = coords => {
    parentControlMapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
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
                  setSelectedMarker(marker);
                  setModalVisible(true);
                }}>
                {messages.some(message => message.sender === marker.userId) &&
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
            data={messages.filter(
              message =>
                message.sender === selectedMarker?.userId ||
                selectedMarker?.userId === 'ITC_USER_ID',
            )}
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
              onPress={() => setModalVisible(false)}
              color="#FF5733"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserLocation;
