import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import React, {useState} from 'react';
import {Gap, Input, Kategori, Media} from '../../components';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import KategoriBerita from '../BeritaByKategori';
import {getKategori} from '../../redux/action';
import {useCallback, useEffect} from 'react';
import {
  IconBola,
  IconEkonomi,
  IconHiburan,
  IconKesehatan,
  IconKuliner,
  IconMetropolitan,
  IconNasional,
  IconNews,
  IconOtomotif,
  IconPolitik,
  IconRegional,
  IconSport,
  IconTekno,
  IconTravel,
} from '../../assets';

const Jelajah = ({navigation}) => {
  const dispatch = useDispatch();
  const {kategoriList} = useSelector(state => state.kategoriReducer);
  const {mediaList} = useSelector(state => state.mediaReducer);
  const {newsList} = useSelector(state => state.newsReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [isclicked, setClicked] = useState("");
  
  const [listkategori, setListKategori] = useState([
    {
      id: 1,
      name: 'politik',
      icon: IconPolitik,
    },
    {
      id: 2,
      name: 'nasional',
      icon: IconNasional,
    },
    {
      id: 3,
      name: 'metropolitan',
      icon: IconMetropolitan,
    },
    {
      id: 4,
      name: 'regional',
      icon: IconRegional,
    },
    {
      id: 5,
      name: 'news',
      icon: IconNews,
    },
    {
      id: 6,
      name: 'ekonomi',
      icon: IconEkonomi,
    },
    {
      id: 7,
      name: 'hiburan',
      icon: IconHiburan,
    },
    {
      id: 8,
      name: 'tekno',
      icon: IconTekno,
    },
    {
      id: 9,
      name: 'sport',
      icon: IconSport,
    },
    {
      id: 10,
      name: 'otomotif',
      icon: IconOtomotif,
    },
    {
      id: 11,
      name: 'travel',
      icon: IconTravel,
    },
    {
      id: 12,
      name: 'kuliner',
      icon: IconKuliner,
    },
    {
      id: 13,
      name: 'kesehatan',
      icon: IconKesehatan,
    },
    {
      id: 14,
      name: 'bola',
      icon: IconBola,
    },
  ]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const onClickKategori = (kategori) => {
    if(kategori == listkategori?.name){
      setClicked(kategori)
      console?.log('kategori: ', kategori);
    } else {
      setClicked("")
    }
  }

  const init = async () => {
    // await dispatch(getKategori(kategoriList));
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

  useEffect(() => {
    if (navigation.isFocused) {
      init();
    }
  }, [navigation]);

  return (
    <SafeAreaView style={[ms.containerPage]}>
      <ScrollView
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Search Bar */}
        <View style={[styles.cardInput]}>
          <Icon
            style={[
              ms.pdL(10),
              ms.ai('center'),
              ms.fzBC(13, '400', colors.grey),
            ]}
            name="search"
          />
          <TextInput
            style={[styles.textInput]}
            placeholder="Cari Judul Berita"
          />
        </View>

        {/* Kategori */}
        <View>
          <View style={[ms.row, ms.ai('center'), ms.mgB(15)]}>
            <Text style={[ms.fzBC(18, '700', colors.black), ms.pdH(20)]}>
              Kategori
            </Text>
            <Gap
              height={3}
              backgroundColor={colors.grey3}
              width={(windowWidth * 65) / 100}
            />
          </View>

          {/* List Berita By Kategori */}
          <View style={[styles.cardKategori]}>
            {listkategori?.map((kategori, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  kategori={kategori}
                  onPress={()=>{
                    onClickKategori(kategori?.name)
                    dispatch({type: 'SET_KATEGORI', value: kategori?.name})
                    navigation.navigate("BeritaByKategori")
                  }}
                  style={[
                    kategori?.name == isclicked ?
                    styles.activebox : styles?.inactivebox
                  ]}
                >
                  <Text
                    style={[
                    kategori?.name == isclicked ?
                      ms.fzBC(13, '650', colors.white) :
                      ms.fzBC(13, '650', colors.greyDark)
                    ]}>
                    {capitalizeFirstLetter(kategori?.name)}
                  </Text>
                </TouchableOpacity>
              );
            })}
            
          </View>
        </View>

        {/* Media */}
        <View style={[styles.cardMedia]}>
          <View style={[ms.row, ms.ai('center'), ms.mgB(15)]}>
            <Text style={[ms.fzBC(18, '700', colors.black), ms.pdH(20)]}>
              Media
            </Text>
            <Gap
              height={3}
              backgroundColor={colors.grey3}
              width={(windowWidth * 70) / 100}
            />
          </View>

          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
              {mediaList?.slice(0,10).map((media, index) => {
                return (
                  <Media
                    key={index}
                    media={media}
                    onPress={() => {
                      dispatch({type: 'SET_MEDIA', value: media});
                      navigation.navigate('BeritaByMedia');
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
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
  },
  textInput: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.black,
    padding: 5,
    alignItems: 'center',
    // width:(windowWidth * 60) / 100
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
  // kategori: {
  //   fontSize: 13,
  //   fontWeight: '400',
  //   color: colors.black,
  //   paddingLeft: 20,
  // },
  inactivebox: {
    width: (windowWidth * 39) / 100,
    height: (windowHeight * 8) / 100,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.lightblue,
    borderRadius: 10,
    justifyContent: 'center'
  },
  activebox: {
    width: (windowWidth * 39) / 100,
    height: (windowHeight * 8) / 100,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.blue,
    borderRadius: 10,
    justifyContent: 'center'
  },
  // inner: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
});

{/* {kategoriList.map((kategori, index) => {
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
          })} */}