/* eslint-disable no-unused-vars */
/**
 * @format
 * @flow strict-local
 */

import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  createContext,
} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {NavigationContainer} from '@react-navigation/native';

import AuthContext from './AuthContext';

import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import OtpScreen from './screens/OtpScreen';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        refreshToken: null,
      };

    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        refreshToken: action.refreshToken,
      };
  }
};

const App = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [userToken, setUserToken] = useState();
  const [state, dispatch] = useReducer(reducer, {
    isOtpSent: false,
    userToken: null,
    refreshToken: null,
  });

  const authContext = useMemo(
    () => ({
      signIn: async (accessToken, tokenType, expires_in, refreshToken) => {
        console.log(
          `Access token: ${accessToken}, Refresh token: ${refreshToken}`,
        );

        AsyncStorage.setItem('userToken', accessToken);
        AsyncStorage.setItem('refreshToken', refreshToken);
        setUserToken(accessToken);

        dispatch({
          type: 'SIGN_IN',
          token: accessToken,
          refreshToken: refreshToken,
        });
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let _userToken;

      try {
        _userToken = await AsyncStorage.getItem('userToken');
        console.log(_userToken);
      } catch (e) {
        // Restoring token failed
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator mode="card">
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
              }}
            />
            <Stack.Screen
              name="OTP"
              component={OtpScreen}
              options={{
                title: 'OTP',
              }}
            />
            <Stack.Screen
              name="My Office"
              component={HomeScreen}
              options={{
                headerLeft: () => null,
              }}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
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

export default App;
