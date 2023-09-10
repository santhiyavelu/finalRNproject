import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';
import styles from './styles';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = text => {
    setUsername(text);
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleLogin = () => {
    navigation.navigate('LOGIN');
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line}></View>
      </View>

      {/* <Icon.Button
        name="facebook"
        backgroundColor="#3b5998"
        style={styles.facebookButton}>
        Login with Facebook
      </Icon.Button> */}
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
