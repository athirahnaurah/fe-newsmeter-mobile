import {Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ms from '../../utils/ms';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {colors, getData} from '../../utils';
import {Kategori, Loader, MainButton} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getKategori, postPreference, setParameterValue} from '../../redux/action';
import { event } from 'react-native-reanimated';
import { Alert } from 'react-native';

const MAX_CATEGORY = 3;

const MinatKategori = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {kategoriList} = useSelector(state => state.kategoriReducer);
  const {parameterValue} = useSelector(state => state.globalReducer);
  const [isclicked, setClicked] = useState([]);
  const {isLoadingScreen} = useSelector(state => state.globalReducer);
  const [emailValue, setEmailValue] = useState('');
  // console.log('kategoriList: ', kategoriList);
  // console.log('param val: ', parameterValue);

  const init = async () => {
    await dispatch(getKategori());

    getData('authUser').then(resAuthUser => {
      if(resAuthUser?.data.email){
        setEmailValue(resAuthUser?.data.email) 
      } else {
         setEmailValue(route.params.email)
      }
    })
  };
  
  const onHandleChange = (text, input) => {
    setInput((prevState) => ({...prevState, [input]: text}))
  }

  const onClickKategori = (kategori) => {
    if(isclicked.includes(kategori)){
      setClicked(isclicked.filter((k) => k !== kategori));
    } else if (isclicked.length < MAX_CATEGORY){
      setClicked([...isclicked, kategori])

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

  const onClickNext = async () => {
    // console.log('kategori dipilih: ', isclicked);
    if (isclicked.length === 0){
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
  }

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

  

  // const parseDeepLink = (url) => {
  //   const params = new URLSearchParams(url.split(':')[1]);
  //   const email = params.get('email');
  //   console.log('email to: ', email)
  //   return {email};
  // }

  // const handleDeepLink = async (event) => {
  //   // const data = parseDeepLink(event.url)
  //   // const params = new URLSearchParams(event.url.split(':')[1]);
  //   // const email = params.get('email');
  //   const deeplink = event.url;
  //   const email = deeplink.substring(deeplink.indexOf(':') + 18);
  //   const emailValue = JSON.stringify(email);
  //   dispatch(setParameterValue(emailValue));
  //   console.log('data: ', emailValue);

  // };

  // const getDeepLink = () => {
  //   const item = navigation.getParam('email', {});

  //   return console.log('item: ', item)
  // }

  useEffect(() => {
    if (navigation.isFocused) {
      init();
      
    }
    
  }, [navigation]);

  return (
    <SafeAreaView style={[ms.containerPage]}>
      <Loader isVisible={isLoadingScreen}/>
      <ScrollView>
        {/* Header */}
        <View
          style={[ms.height(windowHeight * 10) / 100, ms.pdH(20), ms.pdV(30)]}>
          <Text style={[ms.fzBC(14, '700', colors.black), ms.mgB(10)]}>
            Pilih Minat Bacaan Anda
          </Text>
          <Text style={[ms.fzBC(12, '400', colors.grey)]}>
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
                isclicked.includes(kategoriparam)
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
                  isclicked.includes(kategoriparam)
                    ? ms.fzBC(13, '650', colors.white)
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
            style={[isclicked.length == 0 ? styles.inactiveButton : styles.activeButton]}
            onPress={()=>{onClickNext()}}
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
  button: {
    flexDirection: 'row-reverse',
    marginHorizontal: 20,
  },
  activeButton: {
    width: (windowWidth * 40) / 100,
    height: 40,
    fontSize : 12,
    fontWeight : '700',
    color : colors.white,
    margin : 5,
    borderColor : colors.blue,
    borderRadius : 12,
    borderWidth : 0.5,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactiveButton: {
    width: (windowWidth * 40) / 100,
    height: 40,
    fontSize : 12,
    fontWeight : '700',
    color : colors.blue,
    margin : 5,
    borderColor : colors.grey3,
    borderRadius : 12,
    borderWidth : 0.5,
    backgroundColor : colors.grey3,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
