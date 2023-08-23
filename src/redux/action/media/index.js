import axios from 'axios';
import ApiHeader from '../../../config/ApiHeader';
import { setLoadingScreen } from '../global';
import ApiConfig from '../../../config/ApiConfig';

// Get Media
export const getMedia = (onCallback = res => {}, onError = err => {}) => dispatch => {
    dispatch(setLoadingScreen(true));
    var dt = []
    axios.get(`${ApiConfig}/api/get/list/media`, 
    {headers: ApiHeader})
    .then((res) => {
        console.log('jum med', res);
        dispatch({ type: 'SET_MEDLIST', value: res.data});
    })
    .catch((err) => {
        console.log('error', err);
        onError(err)
    })
    .finally(() => {
        dispatch(setLoadingScreen(false));
      });

  };