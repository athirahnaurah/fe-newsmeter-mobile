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
        MinatKategori: {
          path: "minatkategori/:email"
        }
      }
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
