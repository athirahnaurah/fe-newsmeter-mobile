/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import ApiConfigDeploy from './src/config/ApiConfigDeploy';
import ApiHeader from './src/config/ApiHeader';
// import BackgroundService from 'react-native-background-actions';
import axios from 'axios';
// import { getData } from './src/utils';

AppRegistry.registerComponent(appName, () => App);

// export const saveRecommendationBackground = async(taskData) => {
//   const date = new Date();

//   getData('token').then(resAuth => {
//     // if(date)
//   axios
//     .get(`http://10.0.2.2:5000/save_recommendation`, {
//       headers: {Authorization: `Bearer ${resAuth}`},
//     })
//     .then(res => {
//       console.log('result', res.data);
//       console.log(
//         '[Recommendation Saved]',
//         'Recommendation saved at',
//         new Date(),
//       );

//       // dispatch({type: 'SET_NEWSLIST', value: [...res.data]});
//       // dispatch({type: 'SET_NEWSLIST_GLOBAL', value: [...res.data]});
//       // onCallback(res.data)
//     })
//     .catch(err => {
//       console.log('error', err);
//     })
//   })
//   setTimeout(() => {
//     BackgroundService.start(saveRecommendationBackground, options);
//   }, 3600000);

//   console.log('[Save Recommendation]', taskData);

//   const obj = {
//     status: BackgroundService.STATUS_RUNNING,
//     message: 'Recommendation Saved',
//   };
  
//   await BackgroundService.updateNotification(obj);

//   return 0;
// }
// export const options = {
//   taskName: 'Save Recommendation',
//   taskTitle: 'Newsmeter',
//   taskDesc: 'Sedang memproses rekomendasi berita.',
//   taskIcon: {
//     name: 'ic_launcher',
//     type: 'mipmap',
//   },
//   color: '#ff00ff',
//   linkingURI: 'newsmeter://beranda', 
//   parameters: {
//   },
//   delay: 3600000, // 1 hour
// };