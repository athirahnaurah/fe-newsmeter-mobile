import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ms from '../../utils/ms';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {colors} from '../../utils';
import {Kategori, MainButton} from '../../components';
import {useDispatch, useSelector} from 'react-redux';

const MinatKategori = ({navigation}) => {
  const dispatch = useDispatch();
  const {kategoriList} = useSelector((state => state.kategoriReducer));
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

        <View style={[styles.cardInput]}>
          {kategoriList.map((kategori, index) => {
            return (
              <Kategori
                key={index}
                kategori={kategori}
                onPress={() => {
                  dispatch({type: 'SET_KATEGORI', value: kategori});
                }}
              />
            );
          })}
        </View>

        <View style={[styles.button]}>
            <MainButton label='Berikutnya' width={(windowWidth * 40)/100} onPress={() => (navigation.navigate("Login"))} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MinatKategori;

const styles = StyleSheet.create({
  cardInput: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 75) / 100,
  },
  button:{
    flexDirection: 'row-reverse',
    marginHorizontal:20
  }
});
