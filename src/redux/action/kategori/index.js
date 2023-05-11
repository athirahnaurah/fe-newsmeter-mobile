import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';
import ApiHeader from '../../../config/ApiHeader';
import { setLoadingScreen } from '../global';

export const getKategori = (onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));

    axios.get(`${ApiConfig}/api/get/list/kategori`, 
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

export const postPreference = (dataPreference, navigation, onCallback = res => {}, onError = err => {}) => dispatch => {
    dispatch(setLoadingScreen(true));
    axios.post('http://10.0.2.2:5000/preference', dataPreference, { header: ApiHeader })
    .then((res) => {
        console.log('res preference: ', res);
        navigation.reset({ index: 0, routes: [{name: 'Login'}] });
    })
    .catch((err) => {
        console.log('error: ', err);
    })
    .finally(() => {
        dispatch(setLoadingScreen(false))
    })
}