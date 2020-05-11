// @flow
import React, {useState, useContext} from 'react';
import axios from 'axios';
import {View, Text, TextInput, Button, StatusBar} from 'react-native';

import AuthContext from './AuthContext';

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState('olegk');
  const [phoneNumber, setPhoneNumber] = useState('0543307026');

  const {signIn} = useContext(AuthContext);

  const onSignIn = async () => {
    try {
      const res = await axios(
        `https://api.tel-aviv.gov.il/auth/api/otp?id=${username}&phoneNum=${phoneNumber}`,
      );
      navigation.navigate('OTP');
      //signIn(username, phoneNumber);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button
        title="Sign in"
        textStyle={{color: '#bcbec1'}}
        onPress={() => onSignIn()}
      />
    </View>
  );
};

export default SignInScreen;
