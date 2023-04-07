import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';
import ApiHeader from '../../../config/ApiHeader';
import { setLoadingScreen } from '../global';

export const getNews = (onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));

    axios.get(`${ApiConfig}/api/get/news/100`, 
    {headers: ApiHeader})
    .then((res) => {
        console.log('result', res);
        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        dispatch({ type: 'SET_NEWSLIST', value: [...res.data]});
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

  export const getKategori = (onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    axios.get(`${ApiConfig}/api/get/list/kategori`, 
    {headers: ApiHeader})
    .then((res) => {
        console.log('result', res);
        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        dispatch({ type: 'SET_KATEGORILIST', value: [...res.data]});
        // onCallback(res.data)
    })
    .catch((err) => {
        console.log('error', err);
        onError(err)
    })
  };

  export const getNewsByKategori = (kategori, onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));

    console.log('kategori', kategori);
    axios.get(`${ApiConfig}/api/get/news/kategori/${kategori}/100`, 
    {headers: ApiHeader})
    .then((res) => {
        console.log('result', res);
        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        dispatch({ type: 'SET_NEWSLIST_BY_KATEGORI', value: [...res.data]});
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
