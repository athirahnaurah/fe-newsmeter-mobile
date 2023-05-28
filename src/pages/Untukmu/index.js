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
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ms from '../../utils/ms';
import {colors, getData} from '../../utils';
import {Logo} from '../../assets/images';
import NewsList from '../../components/molecules/NewsList';
import {useDispatch, useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import KategoriRekomendasi from '../../components/molecules/KategoriRekomendasi';
import {Gap, Rekomendasi} from '../../components';
import {
  getRecommendationByHistory,
  getRecommendationByKategori,
  postHistory,
} from '../../redux/action';
import {slice} from 'lodash';
import {getUser} from '../../redux/action/login';

const Untukmu = ({navigation}) => {
  // const dispatch = useDispatch();
  // const {recomByKategori} = useSelector(state => state.newsReducer);
  // const {newsList} = useSelector(state => state.newsReducer);
  // const {isLogin} = useSelector(state => state.globalReducer);

  const dispatch = useDispatch();
  const {recomByKategori} = useSelector(state => state.newsReducer);
  const {user} = useSelector(state => state.globalReducer);
  const {recomByHistory} = useSelector(state => state.rekomendasiReducer);
  const {isLoadingScreen, isLogin, preferenceValue} = useSelector(
    state => state.globalReducer,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [i, setI] = useState(15);
  const initialGet = slice(recomByHistory, 0, i);
  const [isCompleted, setIsCompleted] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  //inisiasi function crud
  const init = async () => {
    getData('authUser').then(resAuthUser => {
      if (resAuthUser?.data.email) {
        getData('token').then(resAuth => {
          dispatch(getUser(resAuth, navigation));
        });
        if (user !== 'undefined') {
          dispatch(getRecommendationByKategori());
          dispatch(getRecommendationByHistory());
        }
      }
    });
  };

  //refresh halaman
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => {
      setRefreshing(false);
      init();
    });
  }, []);

  //menampilkan konten lebih banyak
  const loadMore = () => {
    setI(i + 15);
    console.log('index', i);
    if (i >= recomByHistory.length) {
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

  // registerSaveRecommendation();

  // const init = async () => {
  //   if (isLogin) {
  //     console.log('running recommendation');
  //     dispatch(getRecommendationByKategori());
  //   }
  // };

  return (
    <SafeAreaView style={[ms.containerPage]}>
      {/* Header */}
      <View style={styles.background}>
        <Image source={Logo} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLogin ? (
          <View>
            {/* Rekomendasi By Kategori */}
            <View
              style={[
                styles.cardRekomendasiKategori,
                ms.width(windowWidth * 100) / 100,
                ms.height(windowHeight * 20) / 100,
              ]}>
              <View style={[ms.row, ms.ai('flex-end'), ms.mgB(15)]}>
                <Text style={[ms.fzBC(16, '600', colors.black), ms.pdH(20)]}>
                  Minat Kategori
                </Text>
                <View style={[ms.col]}>
                  <TouchableOpacity
                    style={[ms.mgH(10), ms.ai('flex-end'), ms.pdB(3)]}
                    onPress={() => {
                      navigation.navigate('RekomendasiByKategori');
                    }}>
                    <Text style={[ms.fzBC(12, '400', colors.grey), ms.mgT(20)]}>
                      Lihat Semua
                    </Text>
                  </TouchableOpacity>
                  <Gap
                    height={1}
                    backgroundColor={colors.grey3}
                    width={(windowWidth * 60) / 100}
                  />
                </View>
              </View>
              {isLoadingScreen ? (
                <ActivityIndicator color={colors.black} style={{margin: 5}} />
              ) : (
                <View>
                  {recomByKategori !== null ? (
                    <View style={[]}>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {recomByKategori.slice(0, 15).map((news, index) => {
                          return (
                            <KategoriRekomendasi
                              key={index}
                              news={news}
                              onPress={() => {
                                saveHistory(makeHistory(news));
                                dispatch({type: 'SET_NEWS', value: news});
                                navigation.navigate('DetailBerita');
                                // detail rekomendasi
                              }}
                            />
                          );
                        })}
                      </ScrollView>
                    </View>
                  ) : (
                    // ketika tidak tidak ada berita pd minat kategori
                    <View
                      style={[
                        ms.aiJc('center'),
                        ms.height((windowHeight * 25) / 100),
                      ]}>
                      <Text
                        style={[
                          ms.fzBC(13, '400', colors.black),
                          ms.txA('center'),
                          ms.width((windowWidth * 50) / 100),
                        ]}>
                        Tidak ada rekomendasi berita untuk kategori yang Anda
                        pilih
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
            <View style={[ms.mgT(40), ms.mgH(20)]}>
              <Gap
                width={(windowWidth * 90) / 100}
                height={2}
                backgroundColor={colors.grey3}
              />
            </View>

            {/* Rekomendasi By History */}
            <View>
              <View style={[ms.mgH(20), ms.mgT(10)]}>
                <Text style={[ms.fzBC(17, '700', colors.black)]}>
                  Berita Untukmu
                </Text>
              </View>
              {isLoadingScreen ? (
                <ActivityIndicator color={colors.black} style={{margin: 5}} />
              ) : (
                <View>
                  {recomByHistory !== null ? (
                    <View>
                      <View>
                        {initialGet.map((rekom, index) => {
                          return (
                            <Rekomendasi
                              key={index}
                              rekom={rekom}
                              onPress={() => {
                                dispatch({type: 'SET_NEWS', value: rekom});
                                navigation.navigate('DetailBerita');
                              }}
                            />
                          );
                        })}
                      </View>

                      {/* Load more button */}
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
                  ) : (
                    <View
                      style={[
                        ms.aiJc('center'),
                        ms.height((windowHeight * 40) / 100),
                      ]}>
                      <Text
                        style={[
                          ms.fzBC(13, '400', colors.black),
                          ms.txA('center'),
                          ms.width((windowWidth * 50) / 100),
                        ]}>
                        Belum ada rekomendasi
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        ) : (
          // ketika user belum melakukan login
          <View style={[styles.nonews]}>
            <Text style={[ms.fzBC(13, '400', colors.black), ms.txA('center')]}>
              Tidak ada rekomendasi berita untukmu
            </Text>
            <TouchableOpacity
              style={[ms.mgH(10), ms.pdB(3)]}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={[ms.fzBC(13, '400', colors.blue), ms.txA('center')]}>
                Masuk
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Untukmu;

const styles = StyleSheet.create({
  cardRekomendasiKategori: {
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 30) / 100,
  },
  background: {
    backgroundColor: '#346CB3',
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 6) / 100,
  },
  nonews: {
    height: (windowHeight * 85) / 100,
    fontSize: 12,
    fontWeight: '500',
    color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
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
});
