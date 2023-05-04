import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ms from '../../utils/ms';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {colors} from '../../utils';
import {Kategori, MainButton} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getKategori} from '../../redux/action';

const MinatKategori = ({navigation}) => {
  const dispatch = useDispatch();
  const {kategoriList} = useSelector(state => state.kategoriReducer);
  const [isclicked, setClicked] = useState([]);
  console.log('kategoriList: ', kategoriList);

  const onClickKategori = (kategori) => {
    if (kategori == kategoriList) {
      setClicked(kategori);
      console?.log('kategori: ', kategoriList);
    } else {
      setClicked([]);
    }
    // setClicked(kategori)
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

  const init = async () => {
    await dispatch(getKategori());
  };

  useEffect(() => {
    if (navigation.isFocused) {
      init();
    }
  }, [navigation]);

  return (
    <SafeAreaView style={[ms.containerPage]}>
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

        <View style={[styles.button]}>
          <MainButton
            label="Berikutnya"
            width={(windowWidth * 40) / 100}
            onPress={() => navigation.navigate('Login')}
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
});
