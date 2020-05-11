import React, {useState, useContext} from 'react';
import axios from 'axios';
import {View, Text, TextInput, Button, ActivityIndicator} from 'react-native';

import AuthContext from '../AuthContext';

const OtpScreen = (props) => {
  const [otp, setOtp] = useState();
  const {signIn} = useContext(AuthContext);

  const onSendOtp = async () => {
    console.log(otp);
    try {
      const res = await axios.post(
        'https://api.tel-aviv.gov.il/auth/api/token',
        {code: otp},
        {
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Ocp-Apim-Subscription-Key': '7699269b2d6a40348a26387744f61f39',
          },
        },
      );
      const {access_token, token_type, expires_in, refresh_token} = res.data;
      signIn(access_token, token_type, expires_in, refresh_token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>OTP</Text>
      <TextInput
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="phone-pad"
      />
      <Button title="Send" onPress={() => onSendOtp()} />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default OtpScreen;
