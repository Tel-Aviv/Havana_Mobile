/**
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  useColorScheme
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

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState('c1306948');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('0543307026');

  const colorScheme = useColorScheme();

  const onSignIn = async () => {
    try {
      setLoading(true);
      const res = await axios(
        `https://api.tel-aviv.gov.il/auth/api/otp?id=${username}&phoneNum=${phoneNumber}`,
      );
      console.log(res);
      navigation.navigate('OTP');
      //signIn(username, phoneNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Content>
        {loading ? (
          <Spinner size="large" color="#0000ff" />
        ) : (
          <>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input
                  placeholder="Username"
                  writingDirection="ltr"
                  value={username}
                  onChangeText={setUsername}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Phone Number</Label>
                <Input
                  placeholder="Phone Number"
                  value={phoneNumber}
                  keyboardType="phone-pad"
                  onChangeText={setPhoneNumber}
                />
              </Item>
            </Form>
            <Button block style={{top: 70}} onPress={() => onSignIn()}>
              <Text style={{color:'white'}}>Send SMS</Text>
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

export default SignInScreen;
