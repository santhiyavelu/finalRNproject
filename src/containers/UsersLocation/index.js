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

const UserLocation = () => {
  const [markers, setMarkers] = useState([]);
  const [userPlaces, setUserPlaces] = useState([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const parentControlMapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const messages = useSelector(state => state.message.messages);

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
                {messages.some(message => message.sender === marker.userId) && (
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
            <Text style={styles.modalHeaderText}>
              Messages for {selectedMarker?.title}:
            </Text>
          </View>

          {/* Message List */}
          <FlatList
            data={messages.filter(
              message => message.sender === selectedMarker?.userId,
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
