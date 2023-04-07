import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils';
import ms from '../../utils/ms';
import {Logo, SportImg} from '../../assets/images';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {useDispatch, useSelector} from 'react-redux';
import NewsList from '../../components/molecules/NewsList';
import {getKategori, getNews} from '../../redux/action';
import {useEffect} from 'react';
import Loading from '../../components/molecules/Loading';
import {useCallback} from 'react';
import {slice} from 'lodash';

const Beranda = ({navigation}) => {
  // const [newsList, setnewsList] = useState([
  //   {
  //     title:'Tottenham Hotspur Masih Tanpa Conte saat Lawan Chelsea',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //   },
  //   {
  //     title:'Tottenham Hotspur Masih Tanpa Conte saat Lawan Chelsea',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //   },
  //   {
  //     title:'Tottenham Hotspur Masih Tanpa Conte saat Lawan Chelsea',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //   },
  //   {
  //     title:'Tottenham Hotspur Masih Tanpa Conte saat Lawan Chelsea',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //   },
  // ]);
  const dispatch = useDispatch();
  const {newsList} = useSelector(state => state.newsReducer);
  const {isLoadingScreen} = useSelector(state => state.globalReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [i, setI] = useState(10);
  const initialGet = slice(newsList, 0, i);
  const [isCompleted, setIsCompleted] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const init = async () => {
    await dispatch(getNews(newsList));    
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => {
      setRefreshing(false);
      init();
    });
  }, []);

  const loadMore = () => {
    setI(i + 10);
    console.log('index', i);
    if (i >= newsList.length) {
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

  // console.log('load more', loadMore)
  return (
    <SafeAreaView style={[ms.containerPage]}>
      {/* Header */}
      <View style={styles.background}>
        <Image source={Logo} style={styles.logo} />
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
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 6) / 100,
  },
  logo: {
    height: (windowHeight * 6) / 100,
    width: (windowWidth * 35) / 100,
  },
  title: {
    marginTop: 13,
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