import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';
import ApiHeader from '../../../config/ApiHeader';
import { setLoadingScreen } from '../global';
import ApiConfigLocal from '../../../config/ApiConfigLocal';

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
        dispatch({ type: 'SET_NEWSLIST_GLOBAL', value: [...res.data]});
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

  export const getNewsByKategori = (kategori, onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));

    // console.log('kategori', kategori);
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

  export const getNewsByMedia = (media, onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));

    // console.log('media', media);
    axios.get(`${ApiConfig}/api/get/news/media/${media}/100`, 
    {headers: ApiHeader})
    .then((res) => {
        console.log('result', res);
        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        dispatch({ type: 'SET_NEWSLIST_BY_MEDIA', value: [...res.data]});
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

  export const getSearchNews = (search, onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    console.log('search: ', search)
    dispatch(setLoadingScreen(true));

    axios.get(`${ApiConfigLocal}/api/search/news/${search}/7`, 
    {headers: ApiHeader})
    .then((res) => {
        console.log('res search', res);
        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        // dispatch({ type: 'SET_NEWSLIST', value: [...res.data]});
        dispatch({ type: 'SET_NEWSLIST_SEARCH', value: res.data});
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

