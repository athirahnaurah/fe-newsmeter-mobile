import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';
import ApiHeader from '../../../config/ApiHeader';
import { setLoadingScreen } from '../global';
import { useState } from 'react';

export const getMedia = (onCallback = res => {}, onError = err => {}) => dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));
    // const [dt, setData] = useState([]);
    var dt = []
    axios.get(`${ApiConfig}/api/get/list/media`, 
    {headers: ApiHeader})
    .then((res) => {
        console.log('result', res);
        // dispatch({ type: 'SET_MEDLIST', value: [...res.data]});
        // res.data.forEach((item) => {
        //     dt = [item]
        //     dispatch({ type: 'SET_MEDLIST', value: [...dt]});
        //     // console.log('result2', dt);

        // })

        
        // for(let i = 0; i < res.data.length; i++){
            // dispatch({ type: 'SET_MED', value: [res.data[i]]});
        //     // console.log('result2', res.data[i]);

        // }
            dispatch({ type: 'SET_MEDLIST', value: res.data});

        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
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