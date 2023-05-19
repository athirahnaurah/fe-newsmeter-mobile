import axios from 'axios';
import ApiConfigLocal from '../../../config/ApiConfigLocal';
import ApiHeader from '../../../config/ApiHeader';
import {
  storeData,
  showMessage,
  showToasty,
  showToast,
  getData,
  authHeader,
} from '../../../utils';
import {setGlobal, setLoading, setLoadingScreen, setLogin} from '../global';
// import popUpMessage from "../../../utils/PopUpMessage";
import {useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPreference} from '../kategori';
import { get } from 'lodash';

export const loginAction = (dataLogin, navigation) => dispatch => {
  console.log('data login:', dataLogin);
  dispatch(setLoadingScreen(true));
  // showToasty('...Memproses')
  axios
    .post('http://10.0.2.2:5000/login', dataLogin, {headers: ApiHeader})
    .then(res => {
      console.log('response:', res);
      // dispatch({ type: 'SET_REGISTRATION_ON_SUCCESS', value: true});
      storeData('token', res.data.access_token);
      // dispatch({ type: 'SET_LOGIN', value: true});

      // console.log('store data: ', storeData('token'));
      // let accesstoken = getData('token');
      // console.log('token', accesstoken);

      // Alert.alert(
      //           'Login',
      //           'Login berhasil.',
      //       );

      axios
        .get('http://10.0.2.2:5000/user', {
          headers: {Authorization: `Bearer ${res.data.access_token} `},
        })
        .then(
          resUser => {
            const authUser = resUser;
            console.log('response auth user: ', authUser);
            storeData('authUser', authUser);

            // getData('token').then(resAuth => {
            //   console.log('token login: ', resAuth);
            //   axios.get('http://10.0.2.2:5000/preference', {
            //     headers: {Authorization: `Bearer ${resAuth} `},
            //   })
            getData('preference')
              .then(resP => {
                console.log('preference login: ', resP)
                if(resP !== 0){
                  Alert.alert(
                    'Login',
                    'Login berhasil.',
                  );
                  navigation.reset({ index: 0, routes: [{name: 'MainApp'}] });
                } else {
                  navigation.reset({ index: 0, routes: [{name: 'MinatKategori'}] });
                }
              })
            // });
          },
          err => {
            console.log('err user: ', err);
            Alert.alert('Login', 'Login gagal.');
          },
        );
    })
    .catch(err => {
      console.log('Error login:', err);
      showToast(`Login Error (email atau password anda salah)`, 'error');
    })
    .finally(() => {
      dispatch(setLoadingScreen(false));
      // dispatch(setLogin(true));
      // navigation.reset({ index: 0, routes: [{name: 'MainApp'}] });
    });
};

// export const logoutAction = (navigation) => async (dispatch) => {
//   dispatch(setGlobal(false));

//   dispatch(setLoading(true));
//   getData('token').then(async (resToken)=> {

//     await AsyncStorage.clear();
//     try{
//       dispatch({ type: 'SET_AUTH_USER', value: null});
//       dispatch({ type: 'SET_AUTH_DETAIL', value: null});
//       dispatch({ type: 'SET_TOKEN', value: null});
//     } catch (error) {
//       console.log('logout error: ', error)
//     }
//     dispatch(setLoading(false));
//     socket.off("connect");
//     socket.off("disconnect");
//     navigation.reset({ index: 0, routes: [{name: 'Splash'}]})

//   })
// }

export const getUser =
  (user, onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    // const users = [{
    //   email : email
    // }]

    // console.log('email user: ', users);
    axios
      .get('http://10.0.2.2:5000/user', {
        headers: {Authorization: `Bearer ${user} `},
      })
      .then(res => {
        console.log('res user: ', res);
        dispatch({type: 'SET_USER', value: res.data});
        onCallback(res.data);
      })
      .catch(err => {
        console.log('error', err);
        onError(err);
      });
  };
