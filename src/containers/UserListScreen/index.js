import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserListScreen = ({navigation}) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('UserMyPlaces')
          .get();

        const users = new Map(); // To store unique user names
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const userName = data.userName;
          users.set(userName, data.userId); // Use a Map to store unique user names
        });

        // Convert Map to an array of objects
        const uniqueUserList = Array.from(users).map(([userName, userId]) => ({
          userName,
          userId,
        }));

        setUserList(uniqueUserList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigateToUserPlaces = userId => {
    // Navigate to a new screen with the user's list of places
    navigation.navigate('userplaces', {userId});
  };

  return (
    <View>
      <Text>User List</Text>
      <FlatList
        data={userList}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToUserPlaces(item.userId)}>
            <Text>{item.userName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.userId}
      />
    </View>
  );
};

export default UserListScreen;
