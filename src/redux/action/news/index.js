import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';
import ApiHeader from '../../../config/ApiHeader';

export const getNews = (newsList = [], onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    axios.get(`${ApiConfig}/api/get/news/10`, 
    {headers: ApiHeader})
    .then((res) => {
        console.log('result', res);
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        dispatch({ type: 'SET_NEWSLIST', value: [...res.data]});
        onCallback(res.data)
    })
    .catch((err) => {
        console.log('error', err);
        onError(err)
    })
  };
