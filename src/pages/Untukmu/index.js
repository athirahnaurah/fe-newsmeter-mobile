import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import ms from '../../utils/ms';
import {colors, getData} from '../../utils';
import {Logo} from '../../assets/images';
import NewsList from '../../components/molecules/NewsList';
import {useDispatch, useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import KategoriRekomendasi from '../../components/molecules/KategoriRekomendasi';
import {Gap, Rekomendasi} from '../../components';
import { getRecommendationByKategori, postHistory } from '../../redux/action';
import { slice } from 'lodash';

const Untukmu = ({navigation}) => {
  // const dispatch = useDispatch();
  // const {recomByKategori} = useSelector(state => state.newsReducer);
  // const {newsList} = useSelector(state => state.newsReducer);
  // const {isLogin} = useSelector(state => state.globalReducer);

  const dispatch = useDispatch();
  const {recomByKategori} = useSelector(state => state.newsReducer);
  const {newsList} = useSelector(state => state.newsReducer);
  const {isLoadingScreen, isLogin, preferenceValue} = useSelector(state => state.globalReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [i, setI] = useState(15);
  const initialGet = slice(recomByKategori, 0, i);
  const [isCompleted, setIsCompleted] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const init = async () => {
    getData('authUser').then(resAuthUser => {
      if (resAuthUser?.data.email) {
        dispatch(getRecommendationByKategori());
      }
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
    if (i >= recomByKategori.length) {
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
      <ScrollView>
        {isLogin ? (
          // Rekomendasi By Kategori
          <View>
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
              {recomByKategori.length > 0 ? (
                <View style={[]}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {recomByKategori.slice(0,10).map((news, index) => {
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
                <View style={[ms.aiJc('center'), ms.height(windowHeight*25/100)]}>
                  <Text style={[ms.fzBC(13, '400', colors.black), ms.txA('center'), ms.width(windowWidth*50/100),]}>Tidak ada rekomendasi berita untuk kategori yang Anda pilih</Text>
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
            <View>
              {newsList.map((rekom, index) => {
                return (
                  <Rekomendasi
                    key={index}
                    rekom={rekom}
                    // width={'60%'}
                    // height={65}
                    onPress={() => {
                      dispatch({type: 'SET_NEWS', value: rekom});
                      navigation.navigate('DetailBerita');
                    }}
                  />
                );
              })}
            </View>
            </View>
            
          </View>
        ) : (
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
});
