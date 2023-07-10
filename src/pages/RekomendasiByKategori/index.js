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
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {colors, getData} from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
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
  getRecommendationByKategori,
} from '../../redux/action';
import {useEffect} from 'react';
import Loading from '../../components/molecules/Loading';
import {useCallback} from 'react';
import {slice} from 'lodash';

// Recommendation By Categories Page

const RekomendasiByKategori = ({navigation}) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {recomByKategori} = useSelector(state => state.newsReducer);
  const {isLoadingScreen, isLogin} = useSelector(state => state.globalReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [i, setI] = useState(15);
  const initialGet = slice(recomByKategori, 0, i);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    console.log(colorScheme);
  }, [colorScheme]);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // Initialize req. API
  const init = async () => {
    getData('authUser').then(resAuthUser => {
      if (resAuthUser?.data.email) {
        dispatch(getRecommendationByKategori());
      }
    });
  };

  // Reload page
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => {
      setRefreshing(false);
      init();
    });
  }, []);

  // Load more
  const loadMore = () => {
    setI(i + 15);
    console.log('index', i);
    if (i >= recomByKategori.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  // Create news history
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

  // Save news history
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

  // console.log('load more', loadMore)
  return (
    <SafeAreaView
      style={[
        colorScheme === 'dark' ? styles.containerPageD : ms.containerPage,
      ]}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}>
          <Icon
            name="arrowleft"
            size={24}
            color={colors.white}
            style={[ms.mgL(20)]}
          />
        </TouchableOpacity>

        <View style={[styles.background]}>
          <Image source={Logo} />
        </View>
      </View>
      {/* Title Terbaru */}
      <View style={styles.title}>
        <Text
          style={[
            colorScheme === 'dark'
              ? ms.fzBCLh(18, '900', colors.white, 22)
              : ms.fzBCLh(18, '900', colors.black, 22),
          ]}>
          Minat Kategori
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* {isLoadingScreen ? (
          <ActivityIndicator color={colors.black} style={{margin: 5}} />
        ) : ( */}
        <View>
          {recomByKategori.length > 0 ? (
            <View>
              {initialGet.map((news, index) => {
                return (
                  <NewsList
                    key={index}
                    news={news}
                    theme={colorScheme}
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
                  colorScheme === 'dark'
                    ? styles.containerPageD
                    : ms.containerPage,
                  ms.width(windowWidth * 100) / 100,
                  ms.mgT(22),
                  ms.mgB(10),
                  ms.aiJc('center'),
                ]}>
                {isCompleted ? (
                  <TouchableOpacity
                    onPress={loadMore}
                    activeOpacity={0.9}
                    style={[
                      colorScheme === 'dark'
                        ? styles.loadMoreDeactiveD
                        : styles.loadMoreDeactive,
                    ]}>
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
                        color={
                          colorScheme === 'dark' ? colors.white : colors.white
                        }
                        style={{marginLeft: 5}}
                      />
                    ) : null}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <View
              style={[ms.aiJc('center'), ms.height((windowHeight * 75) / 100)]}>
              <Text
                style={[
                  colorScheme === 'dark'
                    ? ms.fzBC(13, '400', colors.white)
                    : ms.fzBC(13, '400', colors.black),
                  ms.txA('center'),
                  ms.width((windowWidth * 50) / 100),
                ]}>
                Tidak ada rekomendasi berita untuk kategori yang Anda pilih
              </Text>
            </View>
          )}
        </View>
        {/* )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RekomendasiByKategori;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#346CB3',
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 6) / 100,
    flexDirection: 'row',
    // justifyContent: 'flex-start'
  },
  background: {
    justifyContent: 'center',
    // paddingVertical: 5
    width: (windowWidth * 70) / 100,
    height: (windowHeight * 6) / 100,
  },
  title: {
    marginVertical: 10,
    marginLeft: 20,
  },
  back: {
    width: (windowWidth * 35) / 100,
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
  loadMoreDeactiveD: {
    width: (windowWidth * 50) / 100,
    height: (windowHeight * 4) / 100,
    // padding: 10,
    marginVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.grey_dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonews: {
    height: (windowHeight * 85) / 100,
    fontSize: 12,
    fontWeight: '500',
    color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonewsD: {
    height: (windowHeight * 85) / 100,
    fontSize: 12,
    fontWeight: '500',
    color: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
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
