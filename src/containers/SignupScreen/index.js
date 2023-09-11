import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as yup from 'yup';
import styles from './styles';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupValidationSchema = yup.object().shape({
    username: yup.string().required('Full Name is required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

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

  const handleSignup = async values => {
    try {
      await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      console.log('User account created & signed in!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        console.error(error);
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

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={signupValidationSchema}
        onSubmit={handleSignup}>
        {({values, handleChange, handleSubmit, errors, touched}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={values.username}
              onChangeText={handleChange('username')}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

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
