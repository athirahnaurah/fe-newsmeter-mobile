import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import {Logo} from '../../assets';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {useDispatch, useSelector} from 'react-redux';
import {getNewsByKategori} from '../../redux/action';
import {useCallback} from 'react';
import {useEffect, useState} from 'react';
import NewsList from '../../components/molecules/NewsList';
import {slice} from 'lodash';

const BeritaByKategori = ({navigation}) => {
  const dispatch = useDispatch();
  const {bykategori, newsbykategori} = useSelector(state => state.newsReducer);
  const {kategori} = useSelector(state => state.kategoriReducer);
  const {isLoadingScreen} = useSelector(state => state.globalReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [i, setI] = useState(10);
  const initialGet = slice(bykategori, 0, i);
  const [isCompleted, setIsCompleted] = useState(false);

  console?.log('cat: ', kategori);

  const init = async () => {
    await dispatch(getNewsByKategori(kategori));
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

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const loadMore = () => {
    setI(i + 10);
    console.log('index', i);
    if (i >= bykategori.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  useEffect(() => {
    if (navigation.isFocused) {
      init();
    }
  }, [navigation]);

  return (
    <SafeAreaView style={[ms.containerPage]}>
      {/* Header */}
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
        <Text style={[ms.fzBCLh(18, '900', colors.black, 22)]}>
          {capitalizeFirstLetter(kategori)}
        </Text>
      </View>

      {/* List Berita By Kategori */}
      <ScrollView
        style={[ms.height(windowHeight * 85) / 100]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoadingScreen ? (
          <ActivityIndicator color={colors.black} style={{margin: 5}} />
        ) : (
          <View>
            {bykategori.length > 0 ? (
          <View>
            {initialGet.map((news, index) => {
              return (
                <NewsList
                  key={index}
                  news={news}
                  // width={'60%'}
                  // height={65}
                  onPress={() => {
                    dispatch({type: 'SET_NEWS_BY_KATEGORI', value: news});
                    navigation.navigate('DetailBeritaByKategori');
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
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View style={[styles.nonews]}>
            <Text>Tidak ada berita untuk kategori yang dipilih</Text>
          </View>
        )}
          </View>
        )}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default BeritaByKategori;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#346CB3',
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 6) / 100,
    flexDirection: 'row',
  },
  back: {
    width: (windowWidth * 35) / 100,
  },
  background: {
    justifyContent: 'center',
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
  nonews: {
    height: (windowHeight * 85) / 100,
    fontSize: 12,
    fontWeight: '500',
    color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // left: 0,
    // bottom: 0
  },
});
