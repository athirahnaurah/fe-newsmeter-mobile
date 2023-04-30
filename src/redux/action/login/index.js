import axios from 'axios';
import ApiConfigLocal from '../../../config/ApiConfigLocal';
import ApiHeader from '../../../config/ApiHeader';
import {storeData, showMessage, showToasty, showToast, getData, authHeader} from '../../../utils';
import {setGlobal, setLoading, setLoadingScreen} from '../global';
// import popUpMessage from "../../../utils/PopUpMessage";
import {useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginAction = (dataLogin, navigation) => dispatch => {
    console.log('data login:', dataLogin);
    dispatch(setLoadingScreen(true));
    // showToasty('...Memproses')
    axios
      .post('http://10.0.2.2:5000/login', dataLogin, { headers: ApiHeader })
      .then(res => {
        console.log('response:', res);
        // dispatch({ type: 'SET_REGISTRATION_ON_SUCCESS', value: true});
        storeData('token', res.data.access_token);
        dispatch({ type: 'SET_LOGIN', value: true});
        
        // console.log('store data: ', storeData('token'));
        // let accesstoken = getData('token');
        // console.log('token', accesstoken);

        // Alert.alert(
        //           'Login',
        //           'Login berhasil.',
        //       );

        axios.get('http://10.0.2.2:5000/user', {
            headers: { 'Authorization': `Bearer ${res.data.access_token} `}
        }
        )
        .then((resUser) => {
            const authUser = resUser;
            console.log('response auth user: ', authUser);

            storeData('authUser', authUser);
            Alert.alert(
                'Login',
                'Login berhasil.',
            );
            navigation.reset({ index: 0, routes: [{name: 'MainApp'}] });

        }, (err) => {
            console.log('err user: ', err);
            Alert.alert(
                'Login',
                'Login gagal.',
            );
        })

        // onCallback(res.data)
        // Alert.alert(
        //     'Aktivasi Akun', 'Silahkan periksa email untuk aktivasi akun Anda.'
        // );
        // navigation.reset({ index: 0, routes: [{name: 'MinatKategori'}] });
      })
      .catch(err => {
        console.log('Error:', err);
        showToast(
            `Login Error (email atau password anda salah)`,
            'error',
          );
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
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

export const getUser = (email, user, onCallback=(res)=>{}, onError=(err)=>{}) => (dispatch) => {

  const users = [{
    email : email
  }]

  console.log('email user: ', users);
  axios.get('http://10.0.2.2:5000/user', {
    headers: { 'Authorization': `Bearer ${user} `}
  })
  .then((res) => {
    console.log('res user: ', res);
    dispatch({ type: 'SET_USER', value: res.data});
    onCallback(res.data);
  })
  .catch((err) => {
    console.log('error', err);
    onError(err)
  })
}