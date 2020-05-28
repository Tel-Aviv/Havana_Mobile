/**
 * @format
 */
import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import Reports from '../tabs/Reports';
import Profile from '../tabs/Profile';
import NotificationsTab from '../tabs/NotificationsTab';

import DataContext from '../DataContext';

const Tab = createBottomTabNavigator();

const MyTabs = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Reports"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Reports"
        component={Reports}
        initialParams={props.reportData}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsTab}
        options={{
          tabBarLabel: 'Inbox',
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
};

const dataReducer = (prevState, action) => {
  switch (action.type) {
    case 'SET_REPORT_DATA':
      return {
        ...prevState,
        reportData: action.data,
      };

    case 'SET_DAYS_OFF':
      return {
        ...prevState,
        daysOff: action.data,
      };

    case 'SET_MANUAL_UPDATES':
      return {
        ...prevState,
        manualUpdates: action.data,
      };

    default:
      return {
        ...prevState,
      };
  }
};

const HomeScreen = (props) => {
  const initialState = {
    reportData: [],
    daysOff: [],
    manualUpdates: [],
  };
  const [reportData, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userToken');
        if (!accessToken) {
          props.navigation.navigate('SignIn');
          return;
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        let data = [];

        let respArr = await axios.all([
          axios(
            `https://api.tel-aviv.gov.il/ps/daysoff?year=${year}&month=${month}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          ),
          axios(
            `https://api.tel-aviv.gov.il/ps/me/reports/status?month=${month}&year=${year}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          ),
          axios(
            `https://api.tel-aviv.gov.il/ps/me/manual_updates?year=${year}&month=${month}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          ),
        ]);
        data = respArr[0].data.items.map(
          (item) => new Date(Date.parse(item.date)),
        );
        dispatch({type: 'SET_DAYS_OFF', data: data});

        data = respArr[2].data.items;
        dispatch({type: 'SET_MANUAL_UPDATES', data: data});

        let reportId = 0;

        if (respArr[1].data) {
          // check report's status

          const savedReportId = respArr[1].data.saveReportId;

          let _resp;
          if (savedReportId) {
            // Interim report found. Actually the following call gets
            // the merged report: saved changes over the original data
            _resp = await axios(
              `https://api.tel-aviv.gov.il/ps/me/reports/saved?savedReportGuid=${savedReportId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
          } else {
            reportId = respArr[1].data.reportId;

            _resp = await axios(
              `https://api.tel-aviv.gov.il/me/reports/${reportId}/updates`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
          }

          data = _resp.data.items.map((item, index) => {
            const _item = {...item, key: index};
            return _item;
          });

          dispatch({type: 'SET_REPORT_DATA', data: data});
        } else {
          // The status of the report is unknown, i.e. get the original report

          const resp = await axios(
            `https://api.tel-aviv.gov.il/ps/me/reports/${year}/${month}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          data = resp.data.items.map((item, index) => {
            const _item = {...item, key: index};
            if (reportId === 0) reportId = item.reportId;
            return _item;
          });
        }
      } catch (err) {
        console.error(err);
        props.navigation.navigate('Sign In');
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={reportData}>
      <MyTabs />
    </DataContext.Provider>
  );
};

export default HomeScreen;
