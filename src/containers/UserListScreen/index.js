import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import styles from './styles';

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
    navigation.navigate('userplaces', {userId});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <FlatList
        data={userList}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => navigateToUserPlaces(item.userId)}>
            <Text style={styles.userText}>
              {`${item.userName} - `}
              <Text style={styles.clickableUserId}>{item.userId}</Text>
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.userId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    marginBottom: 16,
  },
  userText: {
    fontSize: 16,
    color: '#333', // Adjust the color to your preference
  },
  clickableUserId: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    color: 'blue', // Adjust the color to your preference
  },
});

export default UserListScreen;
