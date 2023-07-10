import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';
import ApiHeader from '../../../config/ApiHeader';
import { setLoadingScreen } from '../global';
import {Alert} from 'react-native';
import { storeData, getData } from '../../../utils';
import ApiConfigDeploy from '../../../config/ApiConfigDeploy';

// Get category
export const getKategori = (onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));

    axios.get(`http://beta.newsmeter.id/api/get/list/kategori`, 
    {headers: ApiHeader})
    .then((res) => {
        console.log('result', res);
        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        dispatch({ type: 'SET_KATEGORILIST', value: res.data});
        // onCallback(res.data)
    })
    .catch((err) => {
        console.log('error', err);
        onError(err)
    })
    .finally(() => {
        dispatch(setLoadingScreen(false));
      });
  };

// Post Preference
export const postPreference = (dataPreference, navigation, onCallback = res => {}, onError = err => {}) => dispatch => {
    dispatch(setLoadingScreen(true));
    axios.post(`${ApiConfigDeploy}/preference`, dataPreference, { header: ApiHeader })
    .then((res) => {
        storeData('preference', res.data);
        console.log('res preference: ', res);
        getData('authUser').then((resAuthUser) => {
          if (resAuthUser !== null){
            navigation.reset({ index: 0, routes: [{name: 'MainApp'}] });
          } else {
            navigation.reset({ index: 0, routes: [{name: 'Login'}] });
          }})
    })
    .catch((err) => {
        console.log('error post preference: ', err);
    })
    .finally(() => {
        dispatch(setLoadingScreen(false))
    })
}

// Get Preference
export const getPreference = (user, navigation, onCallback=(res)=>{}, onError=(err)=>{}) => (dispatch) => {

    // const users = [{
    //   email : email
    // }]
  
    // console.log('email user: ', users);
    axios.get(`${ApiConfigDeploy}/preference`, {
      headers: { 'Authorization': `Bearer ${user} `}
    })
    .then((res) => {
      console.log('res get preference: ', res);
      // dispatch({ type: 'SET_PREFERENCE', value: res.data});
      // onCallback(res.data);
      if(res.data.length > 0){
        Alert.alert(
          'Login',
          'Login berhasil.',
        );
        navigation.reset({ index: 0, routes: [{name: 'MainApp'}] });
      } else {
        navigation.reset({ index: 0, routes: [{name: 'MinatKategori'}] });
        
      }

    })
    .catch((err) => {
      console.log('error get prefrerence: ', err);
      onError(err)
    })
  }