import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {logIn} from '../../feature/userSlice/UserSlice';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = text => {
    setUsername(text);
  };

  const dispatch = useDispatch();
  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };

  const handleSignup = async values => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      dispatch(logIn({email: email, uid: auth().currentUser.uid}));
      console.log('User account created & signed in!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        console.error(error, 'signup');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        icon={{name: 'user', type: 'font-awesome'}}
        activeOpacity={0.7}
        containerStyle={styles.avatar}
      />

      <Text style={styles.header}>Sign Up</Text>

      <>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={username}
          onChangeText={handleUsernameChange}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={handleEmailChange}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </>

      <View style={styles.orContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line}></View>
      </View>

      <TouchableOpacity onPress={handleLogin}>
        <Text>
          Already Registered?
          <Text style={styles.LoginText}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
