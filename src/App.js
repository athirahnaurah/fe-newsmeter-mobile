import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Provider, useDispatch} from 'react-redux';
import store from './redux/store';

const App = () => {
  // const dispatch = useDispatch();
  const linking = {
    prefixes: ['newsmeter://'],
    config: {
      screens: {
        MainApp: {
          path: 'beranda',
        },
        Registrasi: {
          path: 'register',
        },
        Login: {
          path: 'login',
        },
        MinatKategori: {
          path: 'minatkategori/:email',
          parse: {
            email: email => `${email}`,
          },
        },
      },
    },
  };

  // const handleDeepLink = async (url) => {
  //   const deeplink = 'newsmeter://minatkategori/:email'

  //   try{
  //     await Linking.openURL(deeplink);
  //   } catch (err) {
  //     console.log('error deeplink: ', err);
  //   }
  // }

  // const handleDeepLink = (event) => {
  //   const data = parseDeepLink(event.url);
  //   console.log('data: ', data)
  // }

  // const parseDeepLink = (url) => {
  //   const params = new URLSearchParams(url.split('?')[1]);
  //   const email = params.get('email');
  //   console.log('email to: ', email)
  //   return {email};
  // }

  // useEffect(() => {
  //   const User = ({route}) => {
  //     return route.params.email;
  //   }
  //   console.log('email log: ', User)
  // })
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
