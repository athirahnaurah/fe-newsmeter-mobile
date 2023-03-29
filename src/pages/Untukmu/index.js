import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import NewsList from '../../components/molecules/NewsList';
import {useDispatch, useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import KategoriRekomendasi from '../../components/molecules/KategoriRekomendasi';
import { Gap, Rekomendasi } from '../../components';

const Untukmu = ({navigation}) => {
  const dispatch = useDispatch();
  const {newsList} = useSelector(state => state.newsReducer);

  return (
    <SafeAreaView style={[ms.containerPage]}>
      <ScrollView>
        {/* Rekomendasi By Kategori */}
        <View
          style={[
            styles.cardRekomendasiKategori,
            ms.width(windowWidth * 100) / 100,
            ms.height(windowHeight * 20) / 100,
          ]}>
          <Text
            style={[ms.fzBC(16, '600', colors.black), ms.mgH(20), ms.mgT(20)]}>
            Minat Kategori
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            {newsList.map((rekomendasi, index) => {
              return (
                <KategoriRekomendasi
                  key={index}
                  rekomendasi={rekomendasi}
                  onPress={() => {
                    dispatch({type: 'SET_NEWS', value: rekomendasi});
                    navigation.navigate('DetailBerita');
                    // detail rekomendasi
                  }}
                />
              );
            })}
          </ScrollView>
        </View>

        {/* Rekomendasi By Riwayat */}
        <View style={[ms.mgT(20), ms.mgH(20)]}>
          <Gap width={(windowWidth*90)/100} height={2} backgroundColor={colors.grey3}/>
        </View>

        <View style={[ms.mgH(20), ms.mgT(15)]}>
          <Text style={[ms.fzBC(17, '700', colors.black)]}>Berita Untukmu</Text>
          </View>
          <View>
          {
          newsList.map((rekom, index) => {
            return(
              <Rekomendasi 
                key={index}
                rekom={rekom}
                // width={'60%'}
                // height={65}
                onPress={() => {
                  dispatch({ type: 'SET_NEWS', value: rekom});
                  navigation.navigate("DetailBerita")
                }}
              />
            )
          })
        }
          
        </View>
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
});
