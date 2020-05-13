/**
 * @format
 * @flow strict-local
 */
import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, Button, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../AuthContext';

const Profile = ({route, navigation}) => {
  const {signOut} = useContext(AuthContext);
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
