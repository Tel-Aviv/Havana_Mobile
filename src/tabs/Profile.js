/**
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../AuthContext';

const Profile = (props) => {
  const [userName, setUserName] = useState();

  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userToken');
        console.log(accessToken);

        const resp = await axios('https://api.tel-aviv.gov.il/ps/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(resp.data);
        setUserName(resp.data.userName);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });

  const onLogout = () => {
    AsyncStorage.setItem('userToken', null);
    signOut();
    props.navigation.navigate('SignIn');
  };

  return (
    <View flex paddingH-25 paddingT-120>
      {userName ? (
        <Text blue30 center>
          {userName}
        </Text>
      ) : (
        <Spinner />
      )}
      <View marginT-100 center>
        <Button
          text70
          white
          background-orange30
          label="Logout"
          onPress={() => onLogout()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginHorizontal: 14,
  },
});

export default Profile;
