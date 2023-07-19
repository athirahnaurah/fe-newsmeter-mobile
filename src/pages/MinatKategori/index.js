import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ms from '../../utils/ms';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {colors, getData} from '../../utils';
import {Loader, MainButton} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getKategori, postPreference} from '../../redux/action';
import {Alert} from 'react-native';

const MAX_CATEGORY = 3;

// Choose Preference
const MinatKategori = ({route, navigation}) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {kategoriList} = useSelector(state => state.kategoriReducer);
  const [isclicked, setClicked] = useState([]);
  const {isLoadingScreen} = useSelector(state => state.globalReducer);
  const [emailValue, setEmailValue] = useState('');

  // console.log('kategoriList: ', kategoriList);
  // console.log('param val: ', parameterValue);

  // Initialize req. API
  const init = async () => {
    await dispatch(getKategori());

    getData('authUser').then(resAuthUser => {
      if (resAuthUser?.data.email) {
        setEmailValue(resAuthUser?.data.email);
      } else {
        setEmailValue(route.params.email);
      }
    });
  };

  const onHandleChange = (text, input) => {
    setInput(prevState => ({...prevState, [input]: text}));
  };

  // Click category
  const onClickKategori = kategori => {
    if (isclicked.includes(kategori)) {
      setClicked(isclicked.filter(k => k !== kategori));
    } else if (isclicked.length < MAX_CATEGORY) {
      setClicked([...isclicked, kategori]);
    }
    console.log('minat kategori: ', isclicked);
    // if (kategori == kategoriList) {
    //   // setClicked((prevState) => ({...prevState, [input]: kategori}));
    //   setClicked(kategori)
    //   console?.log('kategori: ', kategori);
    // } else {
    //   setClicked([]);
    // }
    // setClicked(kategori)
  };

  // Click next button
  const onClickNext = async () => {
    // console.log('kategori dipilih: ', isclicked);
    if (isclicked.length === 0) {
      Alert.alert(
        'Anda belum memilih minat bacaan',
        'Silahkan pilih 1 hingga 3 kategori untuk memberikan rekomendasi bacaan yang Anda minati.',
      );
    } else {
      let dataPreference = {
        email: emailValue,
        preference: isclicked,
      };

      console.log('data preference: ', dataPreference);
      // setClicked([]);

      await dispatch(postPreference(dataPreference, navigation));
    }
  };

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

  useEffect(() => {
    console.log(colorScheme);
    if (navigation.isFocused) {
      init();
    }
  }, [colorScheme, navigation]);

  return (
    <SafeAreaView
      style={[
        colorScheme === 'dark' ? styles.containerPageD : ms.containerPage,
      ]}>
      <Loader isVisible={isLoadingScreen} theme={colorScheme}/>
      <ScrollView>
        {/* Header */}
        <View
          style={[ms.height(windowHeight * 10) / 100, ms.pdH(20), ms.pdV(30)]}>
          <Text
            style={[
              colorScheme === 'dark'
                ? ms.fzBC(14, '700', colors.white)
                : ms.fzBC(14, '700', colors.black),
              ms.mgB(10),
            ]}>
            Pilih Minat Bacaan Anda
          </Text>
          <Text
            style={[
              colorScheme === 'dark'
                ? ms.fzBC(12, '400', colors.white)
                : ms.fzBC(12, '400', colors.grey),
            ]}>
            Untuk memberikan rekomendasi bacaan berita yang Anda minati
          </Text>
        </View>

        <View style={[styles.cardKategori]}>
          {kategoriList?.map((kategoriparam, index) => (
            <TouchableOpacity
              key={index}
              minatKategori={kategoriparam}
              onPress={() => {
                onClickKategori(kategoriparam);
                dispatch({type: 'SET_MINAT_KATEGORI', value: kategoriparam});
              }}
              style={[
                colorScheme === 'dark'
                  ? isclicked.includes(kategoriparam)
                    ? styles.activeboxD
                    : styles?.inactiveboxD
                  : isclicked.includes(kategoriparam)
                  ? styles.activebox
                  : styles?.inactivebox,
              ]}>
              <View>
                <Image
                  source={imageSelect(kategoriparam)}
                  style={[ms.width(20), ms.height(20)]}
                />
              </View>
              <Text
                style={[
                  colorScheme === 'dark'
                    ? isclicked.includes(kategoriparam)
                      ? ms.fzBC(13, '700', colors.white)
                      : ms.fzBC(13, '650', colors.white)
                    : isclicked.includes(kategoriparam)
                    ? ms.fzBC(13, '700', colors.white)
                    : ms.fzBC(13, '650', colors.greyDark),
                ]}>
                {kategoriparam}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.button]}>
          <MainButton
            label="Berikutnya"
            // width={(windowWidth * 40) / 100}
            style={[
              colorScheme === 'dark'
                ? isclicked.length == 0
                  ? styles.inactiveButtonD
                  : styles.activeButtonD
                : isclicked.length == 0
                ? styles.inactiveButton
                : styles.activeButton,
            ]}
            onPress={() => {
              onClickNext();
            }}
            // onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MinatKategori;

const styles = StyleSheet.create({
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
  inactiveboxD: {
    width: (windowWidth * 39) / 100,
    height: (windowHeight * 8) / 100,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.grey_dark,
    borderRadius: 10,
    justifyContent: 'center',
  },
  activeboxD: {
    width: (windowWidth * 39) / 100,
    height: (windowHeight * 8) / 100,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.blue,
    borderRadius: 10,
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row-reverse',
    marginHorizontal: 20,
  },
  activeButton: {
    width: (windowWidth * 40) / 100,
    height: 40,
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    margin: 5,
    borderColor: colors.blue,
    borderRadius: 12,
    borderWidth: 0.5,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveButton: {
    width: (windowWidth * 40) / 100,
    height: 40,
    fontSize: 12,
    fontWeight: '700',
    color: colors.blue,
    margin: 5,
    borderColor: colors.grey3,
    borderRadius: 12,
    borderWidth: 0.5,
    backgroundColor: colors.grey3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButtonD: {
    width: (windowWidth * 40) / 100,
    height: 40,
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    margin: 5,
    borderColor: colors.blue,
    borderRadius: 12,
    borderWidth: 0.5,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveButtonD: {
    width: (windowWidth * 40) / 100,
    height: 40,
    fontSize: 12,
    fontWeight: '700',
    color: colors.blue,
    margin: 5,
    borderColor: colors.grey_dark,
    borderRadius: 12,
    borderWidth: 0.5,
    backgroundColor: colors.grey_dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
  },
});
