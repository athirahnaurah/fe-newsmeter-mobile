import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {colors, getData} from '../../utils';
import ms from '../../utils/ms';
import {Logo, SportImg} from '../../assets/images';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {useDispatch, useSelector} from 'react-redux';
import NewsList from '../../components/molecules/NewsList';
import {
  getKategori,
  getMedia,
  getNews,
  postHistory,
  setLogin,
} from '../../redux/action';
import {useEffect} from 'react';
import Loading from '../../components/molecules/Loading';
import {useCallback} from 'react';
import {slice} from 'lodash';
import {getUser} from '../../redux/action/login';
// import BackgroundService from 'react-native-background-actions';
// import {saveRecommendationBackground, options} from '../../../index';

const Beranda = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.globalReducer);
  const {newsList} = useSelector(state => state.newsReducer);
  const {isLoadingScreen, isLogin} = useSelector(state => state.globalReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [i, setI] = useState(15);
  const initialGet = slice(newsList, 0, i);
  const [isCompleted, setIsCompleted] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const init = async () => {
    getData('authUser').then(resAuthUser => {
      if (resAuthUser?.data.email) {
        dispatch(getUser(navigation));
        if (user !== 'undefined') {
          dispatch(setLogin(true));
          dispatch(getNews(newsList));
        } else {
          Alert.alert(
            'Sesi Berakhir',
            'Sesi telah berakhir, silakan lakukan login kembali.',
          );
          navigation.reset({index: 0, routes: [{name: 'Login'}]});
          dispatch({type: 'SET_USER', value: null});
          dispatch({type: 'SET_AUTH_USER', value: null});
          dispatch({type: 'SET_TOKEN', value: null});
          dispatch({type: 'SET_PREFERENCE', value: null});
          dispatch({type: 'SET_NEWSLIST', value: null});
          dispatch({type: 'SET_NEWS', value: null});
          dispatch({type: 'SET_NEWSLIST_BY_KATEGORI', value: null});
          dispatch({type: 'SET_NEWS_BY_KATEGORI', value: null});
          dispatch({type: 'SET_NEWSLIST_BY_MEDIA', value: null});
          dispatch({type: 'SET_NEWS_BY_MEDIA', value: null});
          dispatch({type: 'SET_NEWSLIST_SEARCH', value: null});
          dispatch({type: 'SET_SEARCH', value: null});
          dispatch({type: 'SET_MEDLIST', value: null});
          dispatch({type: 'SET_MED', value: null});
          dispatch({type: 'SET_NEWS_RECOMMEND_BY_HISTORY', value: null});
          dispatch({type: 'SET_NEWS_RECOMMEND_BY_KATEGORI', value: null});
        }
      }
      dispatch(getNews(newsList));
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => {
      setRefreshing(false);
      init();
    });
  }, []);

  const loadMore = () => {
    setI(i + 15);
    console.log('index', i);
    if (i >= newsList.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  //membuat data riwayat
  const makeHistory = news => {
    let date = new Date(Date.now());
    let dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}.${date.getMilliseconds().toString().padStart(6, '0')}`;
    let dataHistory = {
      _id: news?._id,
      original: news?.original,
      content: news?.content,
      date: news?.date,
      image: news?.image,
      kategori: news?.kategori,
      media: news?.media,
      title: news?.title,
      timestamp: dateString,
    };
    return dataHistory;
  };

  //menyimpan data riwayat
  const saveHistory = dataHistory => {
    getData('authUser').then(resAuthUser => {
      if (resAuthUser?.data.email) {
        dispatch(postHistory(dataHistory));
        console.log('login');
      } else {
        console.log('not login');
      }
    });
  };

  useEffect(() => {
    if (navigation.isFocused) {
      init();
    }
  }, [navigation]);

  return (
    <SafeAreaView style={[ms.containerPage]}>
      {/* Header */}
      <View style={styles.background}>
        <Image source={Logo} />
      </View>
      {/* Title Terbaru */}
      <View style={styles.title}>
        <Text style={[ms.fzBCLh(18, '900', colors.black, 22)]}>TERBARU</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoadingScreen ? (
          <ActivityIndicator color={colors.black} style={{margin: 5}} />
        ) : (
          <View style={[]}>
            {initialGet.map((news, index) => {
              return (
                <NewsList
                  key={index}
                  news={news}
                  // width={'60%'}
                  // height={65}
                  onPress={() => {
                    saveHistory(makeHistory(news));
                    dispatch({type: 'SET_NEWS', value: news});
                    navigation.navigate('DetailBerita');
                  }}
                />
              );
            })}
            <View
              style={[
                ms.width(windowWidth * 100) / 100,
                ms.containerPage,
                ms.aiJc('center'),
                ms.mgT(22),
                ms.mgB(10),
              ]}>
              {isCompleted ? (
                <TouchableOpacity
                  onPress={loadMore}
                  activeOpacity={0.9}
                  style={[styles.loadMoreDeactive]}>
                  <Text style={[ms.fzBC(12, '500', colors.white)]}>
                    Tampilkan lebih banyak
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={loadMore}
                  activeOpacity={0.9}
                  style={[styles.loadMoreActive]}>
                  <Text style={[ms.fzBC(12, '700', colors.white)]}>
                    Tampilkan lebih banyak
                  </Text>
                  {isLoadingScreen ? (
                    <ActivityIndicator
                      color={colors.white}
                      style={{marginLeft: 5}}
                    />
                  ) : null}
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Beranda;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#346CB3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5
    // width: (windowWidth * 100) / 100,
    // height: (windowHeight * 6) / 100,
  },
  title: {
    marginVertical: 10,
    marginLeft: 20,
  },
  loadMoreActive: {
    width: (windowWidth * 50) / 100,
    height: (windowHeight * 4) / 100,
    // padding: 10,
    marginVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreDeactive: {
    width: (windowWidth * 50) / 100,
    height: (windowHeight * 4) / 100,
    // padding: 10,
    marginVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.grey3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // NewsCard:{
  //   width: windowWidth * 100 /100,
  //   height: windowHeight * 18 /100,
  //   // backgroundColor: colors.grey,
  //   flex:1,
  //   justifyContent:'center',
  //   flexDirection: 'row',
  // }
});

// getData('authUser').then(resAuthUser => {
//   if (resAuthUser?.data.email) {

//     dispatch(setLogin(true));
//     dispatch(getNews(newsList));

//     // dispatch(getMedia());
//     // dispatch(getKategori());
//   } else {
//     dispatch(getNews(newsList));
//     // dispatch(getMedia());
//     // dispatch(getKategori());
//   }
// });
