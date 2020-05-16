/**
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  SafeAreaView,
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
  Spinner,
} from 'native-base';
import {Button, Text, View} from 'react-native-ui-lib';

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
              <Text blue50 text20>Welcome</Text>
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
            <View marginT-100 center>
              <Button
                text70
                white
                background-blue30
                label="Send SMS"
                style={{top: 70}}
                onPress={() => onSignIn()}
              />
            </View>
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
