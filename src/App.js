import {Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  const linking = {
    prefixes: ['newsmeter://'],
    config: {
      screens: {
        Registrasi: {
          path: "register"
        },
        Login: {
          path: "login"
        },
        MinatKategori: {
          path: "minatkategori/:email",
          parse: {
            email: (email) => `${email}`
          }
        }
      }
    }
  }

  const handleDeepLink = async (url) => {
    const deeplink = 'newsmeter://minatkategori/:email'

    try{
      await Linking.openURL(deeplink);
    } catch (err) {
      console.log('error deeplink: ', err);
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
