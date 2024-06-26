import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ms from '../../utils/ms';
import {colors, getData} from '../../utils';
import {slice} from 'lodash';
import {useCallback} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Logo} from '../../assets';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import NewsList from '../../components/molecules/NewsList';
import {getNewsByMedia, postHistory} from '../../redux/action';

// News By Media Page

const BeritaByMedia = ({navigation}) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {bymedia} = useSelector(state => state.newsReducer);
  const {med} = useSelector(state => state.mediaReducer);
  const {isLoadingScreen} = useSelector(state => state.globalReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [i, setI] = useState(15);
  const initialGet = slice(bymedia, 0, i);
  const [isCompleted, setIsCompleted] = useState(false);

  // console?.log('med: ', bymedia);

  // Initialize req. API
  const init = async () => {
    await dispatch(getNewsByMedia(med));
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // Reload page
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => {
      setRefreshing(false);
      init();
    });
  }, []);

  // Capitalize the first letter
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Load more
  const loadMore = () => {
    setI(i + 15);
    console.log('index', i);
    if (i >= bymedia.length) {
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

  useEffect(() => {
    if (navigation.isFocused) {
      init();
      console.log(colorScheme);
    }
  }, [navigation, colorScheme]);

  return (
    <SafeAreaView
      style={[
        colorScheme === 'dark' ? styles.containerPageD : ms.containerPage,
      ]}>
      {/* Header */}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}>
          <Icon
            name="arrowleft"
            size={22}
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
          {med}
        </Text>
      </View>

      {/* List Berita By Kategori */}
      <ScrollView
        style={[ms.height(windowHeight * 85) / 100]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoadingScreen ? (
          <ActivityIndicator
            color={colorScheme === 'dark' ? colors.white : colors.black}
            style={{margin: 5}}
          />
        ) : (
          <View>
            {bymedia !== null ? (
              <View>
                {bymedia.length !== 0 ? (
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
                            // dispatch({type: 'SET_NEWS', value: news});
                            const newsID = news._id;
                            navigation.navigate('DetailBerita', {newsID});
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
                        ms.aiJc('center'),
                        ms.mgT(22),
                        ms.mgB(10),
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
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ) : (
                  <View
                    style={[
                      colorScheme === 'dark' ? styles.nonewsD : styles.nonews,
                    ]}>
                    <Text
                      style={[
                        colorScheme === 'dark'
                          ? ms.fzBC(13, '400', colors.white)
                          : ms.fzBC(13, '400', colors.black),
                        ms.txA('center'),
                      ]}>
                      Maaf, Tidak ada berita untuk media yang dipilih.
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View
                style={[
                  colorScheme === 'dark' ? styles.nonewsD : styles.nonews,
                ]}>
                <Text
                  style={[
                    colorScheme === 'dark'
                      ? ms.fzBC(13, '400', colors.white)
                      : ms.fzBC(13, '400', colors.black),
                    ms.txA('center'),
                  ]}>
                  Maaf, Tidak ada berita untuk media yang dipilih.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BeritaByMedia;

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
  back: {
    width: (windowWidth * 35) / 100,
  },
  background: {
    justifyContent: 'center',
    // paddingVertical: 5,
    width: (windowWidth * 70) / 100,
    height: (windowHeight * 6) / 100,
  },
  logo: {
    height: (windowHeight * 6) / 100,
    width: (windowWidth * 35) / 100,
  },
  title: {
    height: (windowHeight * 3) / 100,
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
});
