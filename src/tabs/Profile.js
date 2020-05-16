/**
 * @format
 * @flow strict-local
 */
import React, {useEffect,useContext} from 'react';
import axios from 'axios';
import {SafeAreaView, StyleSheet, Button, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../AuthContext';

const Profile = ({route, navigation}) => {
  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userToken');

        const resp = await axios('https://api.tel-aviv.gov.il/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });

  const onLogout = () => {
    AsyncStorage.setItem('userToken', null);
    signOut();
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={[styles.container, {top: 22}]}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Logout" onPress={() => onLogout()} />
      </View>
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
});

export default Profile;
