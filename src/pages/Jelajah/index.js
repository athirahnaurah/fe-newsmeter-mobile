import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Gap, Input, Kategori, Media } from '../../components'
import ms from '../../utils/ms'
import { colors } from '../../utils'
import { windowHeight, windowWidth } from '../../utils/ms/constant'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { CNN, Detik, Gelora, Kompas, Kumparan, Liputan6, Merdeka, Okezone, SindoNews, Tempo } from '../../assets'
import KategoriBerita from '../KategoriBerita'

const Jelajah = ({navigation}) => {
  const dispatch = useDispatch();
  const {kategoriList} = useSelector((state => state.kategoriReducer));
  const {mediaList} = useSelector((state => state.mediaReducer));

  return (
    <SafeAreaView style={[ms.containerPage]}>
      <ScrollView>
        {/* Search Bar */}
        <View style={[styles.cardInput]}>
          <Icon style={[ms.pdL(10), ms.ai('center'), ms.fzBC(13, '400', colors.grey)]} name='search' />
          <TextInput style={[styles.textInput]} placeholder='Cari Judul Berita' />
        </View>

        {/* Kategori */}
        <View>
          <View style={[ms.row, ms.ai('center'), ms.mgB(15)]}>
              <Text style={[ms.fzBC(18, '700', colors.black), ms.pdH(20)]}>Kategori</Text>
              <Gap height={3} backgroundColor={colors.grey3} width={(windowWidth*65)/100}/>
          </View>

          <View style={[styles.cardKategori]}>
          {kategoriList.map((kategori, index) => {
            return (
              <Kategori
                key={index}
                kategori={kategori}
                onPress={() => {
                  dispatch({type: 'SET_KATEGORI', value: kategori});
                  navigation.navigate("KategoriBerita");
                }}
              />
            );
          })}
          </View>
        </View>

        {/* Media */}
        <View style={[styles.cardMedia]}>
          <View style={[ms.row, ms.ai('center'), ms.mgB(15)]}>
              <Text style={[ms.fzBC(18, '700', colors.black), ms.pdH(20)]}>Media</Text>
              <Gap height={3} backgroundColor={colors.grey3} width={(windowWidth*70)/100}/>
          </View>

          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
              {mediaList?.map((media, index) => {
                  return(
                    <Media 
                      key={index}
                      media={media}
                      onPress={()=>{
                        dispatch({type: 'SET_MEDIA', value: media})
                        navigation.navigate("MediaBerita")
                      }}
                    />
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Jelajah

const styles = StyleSheet.create({
  cardInput: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: colors.grey3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: (windowHeight*5)/100
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
})