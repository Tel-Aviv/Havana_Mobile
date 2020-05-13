import React, {useState, useContext} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Spinner,
} from 'native-base';

import AuthContext from '../AuthContext';

const OtpScreen = (props) => {
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const {signIn} = useContext(AuthContext);

  const onSendOtp = async () => {
    console.log(otp);
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, {top: 22}]}>
      <Content>
        {loading ? (
          <Spinner size="large" color="#0000ff" />
        ) : (
          <>
            <Form>
              <Item floatingLabel>
                <Label>OTP</Label>
                <Input
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="phone-pad"
                />
              </Item>
            </Form>
            <Button block style={{top: 70}}  onPress={() => onSendOtp()}>
              <Text style={{color:'white'}}>Send</Text>
            </Button>
          </>
        )}
      </Content>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginHorizontal: 14,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default OtpScreen;
