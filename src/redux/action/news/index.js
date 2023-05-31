import axios from 'axios';
import ApiConfig from '../../../config/ApiConfig';
import ApiHeader from '../../../config/ApiHeader';
import {setLoadingScreen, setLoadingValue, setPreferenceValue, setSearch} from '../global';
import {getData} from '../../../utils';
import ApiConfigDeploy from '../../../config/ApiConfigDeploy';

export const getNews =
  (onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));

    axios
      .get(`http://beta.newsmeter.id/api/get/news/100`, {headers: ApiHeader})
      .then(res => {
        // console.log('result', res);
        dispatch({type: 'SET_NEWSLIST', value: [...res.data]});
        // dispatch({type: 'SET_NEWSLIST_GLOBAL', value: [...res.data]});
        // onCallback(res.data)
      })
      .catch(err => {
        console.log('error', err);
        onError(err);
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
      });
  };

export const getNewsByKategori =
  (kategori, onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));

    // console.log('kategori', kategori);
    axios
      .get(`http://beta.newsmeter.id/api/get/news/kategori/${kategori}/100`, {
        headers: ApiHeader,
      })
      .then(res => {
        console.log('result', res.data);
        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        dispatch({type: 'SET_NEWSLIST_BY_KATEGORI', value: [...res.data]});
        // onCallback(res.data)
      })
      .catch(err => {
        console.log('error', err);
        onError(err);
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
      });
  };

export const getNewsByMedia =
  (media, onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    // const paramList = [{}];
    dispatch(setLoadingScreen(true));

    // console.log('media', media);
    axios
      .get(`http://beta.newsmeter.id/api/get/news/media/${media}/100`, {headers: ApiHeader})
      .then(res => {
        // console.log('result', res);
        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        dispatch({type: 'SET_NEWSLIST_BY_MEDIA', value: [...res.data]});
        // onCallback(res.data)
      })
      .catch(err => {
        console.log('error', err);
        onError(err);
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
      });
  };

export const getSearchNews =
  (search, onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    // const paramList = [{}];
    console.log('search: ', search);
    dispatch(setLoadingScreen(true));

    axios
      .get(`http://beta.newsmeter.id/api/search/news/${search}/7`, {headers: ApiHeader})
      .then(res => {
        // console.log('res search', res);
        // dispatch({ type: 'SET_POST', value: [...res.data] })
        // dispatch({ type: 'SET_NEWSLIST', value: [...newsList, ...res.data]});
        // dispatch({ type: 'SET_NEWSLIST', value: [...res.data]});
        dispatch({type: 'SET_NEWSLIST_SEARCH', value: res.data});
        if (res.data.length > 0) {
          dispatch(setSearch(true));
        } else {
          dispatch(setSearch(false));
        }
        // onCallback(res.data)
      })
      .catch(err => {
        console.log('error', err);
        onError(err);
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
      });
  };

// post data history ke database
export const postHistory = dataNews => dispatch => {
  getData('token').then(resAuth => {
    axios
      .post(`${ApiConfigDeploy}/history`, dataNews, {
        headers: {Authorization: `Bearer ${resAuth}`},
      })
      .then(res => {
        console.log('response:', res.data.message);
      })
      .catch(err => {
        console.log('Error:', err);
      });
  });
};

export const getRecommendationByKategori =
  (onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    dispatch(setLoadingScreen(true));
    // let preferences = ['Ekonomi', 'Politik', 'Nasional'];
    getData('token').then(resAuth => {
      axios
        .get(`${ApiConfigDeploy}/preference`, {
          headers: {Authorization: `Bearer ${resAuth}`},
        })
        .then(res => {
          // console.log('response:', res.data);
          let newData = [];
          let i = 0;
          for (let preference of res.data) {
            // console.log('preference', preference);
            axios
              .get(`http://beta.newsmeter.id/api/get/news/kategori/${preference}/50`, {
                headers: ApiHeader,
              })
              .then(result => {
                // console.log('get news');
                result.data.forEach(
                  ({
                    _id,
                    original,
                    content,
                    title,
                    date,
                    kategori,
                    media,
                    image,
                  }) => {
                    newData.push({
                      _id,
                      original,
                      content,
                      title,
                      date,
                      kategori,
                      media,
                      image,
                    });
                  },
                );
                i++;

                if (i === res.data.length) {
                  console.log('done get news 3 category');
                  newData.sort((a, b) => {
                    // console.log('sorting');
                    return (
                      new Date(convertTimestamp(b.date)) -
                      new Date(convertTimestamp(a.date))
                    );
                  });
                  // console.log('rec by category:', newData);
                  dispatch({
                    type: 'SET_NEWS_RECOMMEND_BY_KATEGORI',
                    value: [...newData],
                  });
                  dispatch(setLoadingScreen(false));
                }
              })
              .catch(err => {
                console.log('error', err);
                onError(err);
              });
          }
        })
        .catch(err => {
          console.log('Error:', err);
        })
        // .finally(() => {
        //   dispatch(setLoadingScreen(false));
        // });
    });
  };

const convertTimestamp = dateString => {
  const parts = dateString.split(' ');
  const dateParts = parts[0].split('-');
  const timeParts = parts[1].split(':');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);
  const hour = parseInt(timeParts[0], 10);
  const minute = parseInt(timeParts[1], 10);
  const second = parseInt(timeParts[2], 10);
  const timestamp = new Date(year, month, day, hour, minute, second).getTime();
  return timestamp;
};

export const getRecommendationByHistory =
  (onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    dispatch(setLoadingScreen(true));

    getData('token').then(resAuth => {
      axios
        .get(`${ApiConfigDeploy}/get_recommendation`, {
          headers: {Authorization: `Bearer ${resAuth}`},
        })
        .then(res => {
          // console.log('result recommendation by history: ', res);
          dispatch({type: 'SET_NEWS_RECOMMEND_BY_HISTORY', value: [...res.data]});

        })
        .catch(err => {
          console.log('error get recom: ', err);
          onError(err);
        })
        .finally(() => {
          dispatch(setLoadingScreen(false));
        });
    });
  };

export const saveRecommendation = (onCallback = res => {}, onError = err => {}) =>
dispatch =>{
  getData('token').then(resAuth => {
  axios
    .get(`${ApiConfigDeploy}/save_recommendation`, {
      headers: {Authorization: `Bearer ${resAuth}`},
    })
    .then(response => {
        console.log('Proses berhasil dipicu di server:', response);
    })
    .catch(error => {
      // Tangani error yang terjadi saat mengirim permintaan
      console.log(
        'Terjadi kesalahan saat mengirim permintaan ke server:',
        error,
      );
    });
  })
}