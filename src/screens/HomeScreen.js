/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import Reports from '../tabs/Reports';
import Profile from '../tabs/Profile';
import Notifications from '../tabs/Notifications';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Reports"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeScreen = (props) => {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _accessToken = await AsyncStorage.getItem('userToken');
        setAccessToken(_accessToken);

        const res = await axios(
          'https://api.tel-aviv.gov.il/ps/ps/me/reports/2020/4',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const reportData = res.data.items;
        console.log(reportData);
      } catch (err) {
        console.error(err);
        props.navigation.navigate('Sign In');
      }
    };

    fetchData();
  });

  return <MyTabs />;
};

export default HomeScreen;
