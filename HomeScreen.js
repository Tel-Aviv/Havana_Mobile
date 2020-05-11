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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['he'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'he';

import {StyleSheet, View, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();

function Reports() {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Date</Text>
      <Calendar current={Date()} />
    </View>
  );
}

function Profile() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile!</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notifications!</Text>
    </View>
  );
}

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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;
