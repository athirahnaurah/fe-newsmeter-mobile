import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Gap, Input, Kategori, Media, SearchList} from '../../components';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import KategoriBerita from '../BeritaByKategori';
import {getKategori, getMedia, getSearchNews} from '../../redux/action';
import {useCallback, useEffect} from 'react';
import {slice} from 'lodash';

const Jelajah = ({navigation}) => {
  const dispatch = useDispatch();
  const {kategoriList} = useSelector(state => state.kategoriReducer);
  const {mediaList, medList} = useSelector(state => state.mediaReducer);
  const {newsListSearch, search} = useSelector(state => state.newsReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [isclicked, setClicked] = useState('');
  const {searchData} = useSelector(state => state.globalReducer);
  const [searchText, setSearchText] = useState('');
  const [searchTimer, setSearchTimer] = useState(null);
  const [isAvail, setisAvail] = useState(false);
  const {isLoadingScreen} = useSelector(state => state.globalReducer);

  const [i, setI] = useState(10);
  const initialGet = slice(newsListSearch, 0, i);
  const [isCompleted, setIsCompleted] = useState(false);

  // Capital First Letter
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Click Kategori
  const onClickKategori = kategori => {
    if (kategori == kategoriList) {
      setClicked(kategori);
      console?.log('kategori: ', kategori);
    } else {
      setClicked('');
    }
    // setClicked(kategori)
  };

  // Click Media
  const onClickMedia = media => {
    if (media == medList) {
      setClicked(media);
      console?.log('media: ', media);
    } else {
      setClicked('');
    }
    // setClicked(kategori)
  };

  const onHandleSearch = text => {
    if (text !== '') {
      init(text);
      setisAvail(true);
    } else {
      init('');
      setisAvail(false);
    }

    // console.log('setsearchtext', text)

    // dispatch({type: 'SET_SEARCH_DATA', value: searchResult});

    // if(text !== ''){
    //   init(text)
    //   // dispatch({type: 'SET_SEARCH_DATA', value: text});
    // } else {
    //   // dispatch({type: 'SET_SEARCH_DATA', value: ''});
    //   init(text)
    // }
  };

  // Load More Button
  const loadMore = () => {
    setI(i + 10);
    console.log('index', i);
    if (i >= newsListSearch.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const init = async text => {
    await dispatch(getSearchNews(text));
    // await dispatch(getMedia());
    // await dispatch(getKategori());
  };

  // console.log('kategori', kategoriList);

  const imageSelect = kategori => {
    const kategoriArray = {
      Politik: require('../../assets/icon/kategori/Politik.png'),
      Bola: require('../../assets/icon/kategori/Bola.png'),
      Ekonomi: require('../../assets/icon/kategori/Ekonomi.png'),
      Hiburan: require('../../assets/icon/kategori/Hiburan.png'),
      Kesehatan: require('../../assets/icon/kategori/Kesehatan.png'),
      Kuliner: require('../../assets/icon/kategori/Kuliner.png'),
      Metropolitan: require('../../assets/icon/kategori/Metropolitan.png'),
      Nasional: require('../../assets/icon/kategori/Nasional.png'),
      News: require('../../assets/icon/kategori/News.png'),
      Otomotif: require('../../assets/icon/kategori/Otomotif.png'),
      Sport: require('../../assets/icon/kategori/Sport.png'),
      Regional: require('../../assets/icon/kategori/Regional.png'),
      Tekno: require('../../assets/icon/kategori/Tekno.png'),
      Otomotif: require('../../assets/icon/kategori/Otomotif.png'),
      Travel: require('../../assets/icon/kategori/Travel.png'),
    };

    return kategoriArray[kategori];
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => {
      setRefreshing(false);
      init();
    });
  }, []);

  // useEffect(() => {
  //   if (navigation.isFocused) {
  //     init();
  //   }
  // }, [navigation]);

  return (
    <SafeAreaView style={[ms.containerPage]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Search Bar */}
        <View style={[styles.cardInput]}>
          <Icon
            style={[
              ms.pdL(10),
              ms.ai('center'),
              ms.fzBC(13, '400', colors.grey),
              ms.width((windowWidth * 6) / 100),
            ]}
            name="search"
          />
          <TextInput
            style={[styles.textInput]}
            placeholder="Cari Judul Berita"
            onChangeText={value => {
              if (searchTimer) {
                clearTimeout(searchTimer);
              }
              setSearchText(value);
              console.log(' search value: ', value);
              setSearchTimer(
                setTimeout(() => {
                  onHandleSearch(value);
                }, 2000),
              );
            }}
            value={searchText}
          />
          <TouchableOpacity
            style={[
              // ms.pdL(10),
              ms.width((windowWidth * 7) / 100),
              ms.ai('center'),
            ]}
            onPress={() => {
              setSearchText('');
              setisAvail(false);
              setIsCompleted(false);
              setI(10);
              navigation.navigate('Jelajah');
            }}>
            <Icon style={[ms.fzBC(20, '400', colors.grey)]} name="close" />
          </TouchableOpacity>
        </View>

        {/* {searchData && searchData.map((item) => (
            <Text>{item}</Text>
        ))} */}
        {!isAvail ? (
          <View>
            {/* Kategori */}
            <View>
              <View style={[ms.row, ms.ai('center'), ms.mgB(15)]}>
                <Text style={[ms.fzBC(18, '700', colors.black), ms.pdH(20)]}>
                  Kategori
                </Text>
                <Gap
                  height={2}
                  backgroundColor={colors.grey3}
                  width={(windowWidth * 65) / 100}
                />
              </View>

              {/* List Berita By Kategori */}
              <View style={[styles.cardKategori]}>
                {kategoriList?.map((kategoriparam, index) => (
                  <TouchableOpacity
                    key={index}
                    kategori={kategoriparam}
                    onPress={() => {
                      onClickKategori(kategoriparam);
                      dispatch({type: 'SET_KATEGORI', value: kategoriparam});
                      navigation.navigate('BeritaByKategori');
                    }}
                    style={[
                      kategoriparam == isclicked
                        ? styles.activebox
                        : styles?.inactivebox,
                    ]}>
                    <View>
                      <Image
                        source={imageSelect(kategoriparam)}
                        style={[ms.width(20), ms.height(20)]}
                      />
                      {/* <Image source={require('../../assets/icon/kategori/'+kategoriparam+'.png')} style={[ms.width(20), ms.height(20)]}/> */}
                      {/* <Image source={kategori?.img} style={[ms.width(20), ms.height(20)]} /> */}
                    </View>
                    <Text
                      style={[
                        kategoriparam == isclicked
                          ? ms.fzBC(13, '650', colors.white)
                          : ms.fzBC(13, '650', colors.greyDark),
                      ]}>
                      {kategoriparam}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Media */}
            <View style={[styles.cardMedia]}>
              <View style={[ms.row, ms.ai('flex-end'), ms.mgB(15)]}>
                <Text style={[ms.fzBC(18, '700', colors.black), ms.pdH(20)]}>
                  Media
                </Text>
                <View style={[ms.col]}>
                  <TouchableOpacity
                    style={[ms.mgH(10), ms.ai('flex-end'), ms.pdB(3)]}
                    onPress={() => {
                      navigation.navigate('DaftarMedia');
                    }}>
                    <Text style={[ms.fzBC(12, '400', colors.greyDark)]}>
                      Lihat Semua
                    </Text>
                  </TouchableOpacity>
                  <Gap
                    height={1}
                    backgroundColor={colors.grey3}
                    width={(windowWidth * 70) / 100}
                  />
                </View>
              </View>

              <View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}>
                  {medList?.slice(0, 10).map((media, index) => (
                    <Media
                      key={index}
                      med={media}
                      onPress={() => {
                        onClickMedia(media);
                        dispatch({type: 'SET_MED', value: media});
                        navigation.navigate('BeritaByMedia');
                      }}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        ) : (
          <View>
            {isLoadingScreen ? (
              <ActivityIndicator color={colors.black} style={{margin: 5}} />
            ) : (
              <View style={[]}>
                {initialGet?.map((search, index) => {
                  return (
                    <SearchList
                      key={index}
                      search={search}
                      onPress={() => {
                        dispatch({type: 'SET_SEARCH', value: search});
                        navigation.navigate('DetailSearch');
                      }}
                    />
                  );
                })}

                <View
                  style={[
                    ms.width(windowWidth * 100) / 100,
                    ms.containerPage,
                    ms.aiJc('center'),
                  ]}>
                  {!isCompleted ? (
                    <TouchableOpacity
                      onPress={loadMore}
                      activeOpacity={0.9}
                      style={[styles.loadMoreActive]}>
                      <Text style={[ms.fzBC(12, '500', colors.white)]}>
                        Tampilkan lebih banyak
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={loadMore}
                      activeOpacity={0.9}
                      style={[styles.loadMoreDeactive]}>
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
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Jelajah;

const styles = StyleSheet.create({
  cardInput: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: colors.grey3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: (windowHeight * 5) / 100,
    width: (windowWidth * 90) / 100,
  },
  textInput: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.black,
    padding: 5,
    alignItems: 'center',
    width: (windowWidth * 75) / 100,
  },
  cardKategori: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 70) / 100,
  },
  cardMedia: {
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 20) / 100,
  },
  inactivebox: {
    width: (windowWidth * 39) / 100,
    height: (windowHeight * 8) / 100,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.lightblue,
    borderRadius: 10,
    justifyContent: 'center',
  },
  activebox: {
    width: (windowWidth * 39) / 100,
    height: (windowHeight * 8) / 100,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.blue,
    borderRadius: 10,
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

{
  /* {kategoriList.map((kategori, index) => {
            return (
              <Kategori
                key={index}
                kategori={kategori}
                onPress={() => {
                  dispatch({type: 'SET_KATEGORI', value: kategori});
                  navigation.navigate("BeritaByKategori");
                }}
              />
            );
          })} */
}
