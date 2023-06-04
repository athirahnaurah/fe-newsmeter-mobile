import axios from 'axios';
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
import {get} from 'lodash';
import ApiConfigDeploy from '../../../config/ApiConfigDeploy';

export const loginAction = (dataLogin, navigation) => dispatch => {
  console.log('data login:', dataLogin);
  dispatch(setLoadingScreen(true));
  // showToasty('...Memproses')
  axios
    .post(`${ApiConfigDeploy}/login`, dataLogin, {headers: ApiHeader})
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
        .get(`${ApiConfigDeploy}/user`, {
          headers: {Authorization: `Bearer ${res.data.access_token} `},
        })
        .then(
          resUser => {
            const authUser = resUser;
            // console.log('response auth user: ', authUser);
            storeData('authUser', authUser);

            getData('token').then(resAuth => {
              // console.log('token login: ', resAuth);
              axios
                .get(`${ApiConfigDeploy}/preference`, {
                  headers: {Authorization: `Bearer ${resAuth} `},
                })
                // getData('preference')
                .then(resP => {
                  storeData('preference', resP.data);
                  // console.log('preference login: ', resP.data);
                  if (resP.data.length !== 0) {
                    Alert.alert('Login', 'Login berhasil.');
                    navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
                  } else {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'MinatKategori'}],
                    });
                  }
                }),
                error => {
                  console.log('err preference: ', error);
                };
            });
          },
          err => {
            console.log('err user: ', err);
            // Alert.alert('Login', 'Login gagal.');
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
  (navigation, onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    // const users = [{
    //   email : email
    // }]
    getData('token').then(token => {
      axios
        .get(`${ApiConfigDeploy}/user`, {
          headers: {Authorization: `Bearer ${token} `},
        })
        .then(res => {
          // console.log('res user: ', res.data);
          // if (res.data !== null) {
            dispatch({type: 'SET_USER', value: res.data});
          // }
          // if (res.data.message == "User not found") {
          //   // Alert.alert(
          //   //   'Sesi Berakhir',
          //   //   'Sesi telah berakhir, silakan lakukan login kembali.',
          //   // );
          //   // dispatch({type: 'SET_USER', value: err.msg});
          //   dispatch({type: 'SET_USER', value: null});
          //   dispatch({type: 'SET_AUTH_USER', value: null});
          //   dispatch({type: 'SET_TOKEN', value: null});
          //   dispatch({type: 'SET_PREFERENCE', value: null});
          //   dispatch({type: 'SET_NEWSLIST', value: null});
          //   dispatch({type: 'SET_NEWS', value: null});
          //   dispatch({type: 'SET_NEWSLIST_BY_KATEGORI', value: null});
          //   dispatch({type: 'SET_NEWS_BY_KATEGORI', value: null});
          //   dispatch({type: 'SET_NEWSLIST_BY_MEDIA', value: null});
          //   dispatch({type: 'SET_NEWS_BY_MEDIA', value: null});
          //   dispatch({type: 'SET_NEWSLIST_SEARCH', value: null});
          //   dispatch({type: 'SET_SEARCH', value: null});
          //   dispatch({type: 'SET_MEDLIST', value: null});
          //   dispatch({type: 'SET_MED', value: null});
          //   dispatch({type: 'SET_NEWS_RECOMMEND_BY_HISTORY', value: null});
          //   dispatch({type: 'SET_NEWS_RECOMMEND_BY_KATEGORI', value: null});
          //   navigation.reset({index: 0, routes: [{name: 'Login'}]});
          // }

          // else {
          //   Alert.alert(
          //     'Sesi Berakhir',
          //     'Silakan lakukan login kembali untuk masuk ke dalam aplikasi.',
          //   );
          //   navigation.reset({index: 0, routes: [{name: 'Login'}]});
          // }
        })
        .catch(err => {
          // if(err.message === "User not found" && err.response.status === 404){
            dispatch({type: 'SET_USER', value: err.data});
          
          onError(err);

          Alert.alert(
            'Sesi Berakhir',
            'Sesi telah berakhir, silakan lakukan login kembali.',
          );
          // dispatch({type: 'SET_USER', value: err.msg});
          dispatch({type: 'SET_USER', value: null});
          dispatch({type: 'SET_AUTH_USER', value: null});
          dispatch({type: 'SET_TOKEN', value: null});
          dispatch({type: 'SET_PREFERENCE', value: null});
          dispatch({type: 'SET_NEWSLIST', value: null});
          dispatch({type: 'SET_NEWS', value: null});
          dispatch({type: 'SET_NEWSLIST_BY_KATEGORI', value: null});
          dispatch({type: 'SET_NEWS_BY_KATEGORI', value: null});
          dispatch({type: 'SET_NEWSLIST_BY_MEDIA', value: null});
          dispatch({type: 'SET_NEWS_BY_MEDIA', value: null});
          dispatch({type: 'SET_NEWSLIST_SEARCH', value: null});
          dispatch({type: 'SET_SEARCH', value: null});
          dispatch({type: 'SET_MEDLIST', value: null});
          dispatch({type: 'SET_MED', value: null});
          dispatch({type: 'SET_NEWS_RECOMMEND_BY_HISTORY', value: null});
          dispatch({type: 'SET_NEWS_RECOMMEND_BY_KATEGORI', value: null});
          navigation.reset({index: 0, routes: [{name: 'Login'}]});
          // }
          // console.log('error get use', err.msg);
        });
    });
  };
