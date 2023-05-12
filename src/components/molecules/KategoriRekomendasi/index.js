import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ms from '../../../utils/ms';
import {colors} from '../../../utils';
import {windowHeight, windowWidth} from '../../../utils/ms/constant';
import {Gap} from '../../atoms';
import {Point} from '../../../assets';

const KategoriRekomendasi = ({rekomendasi, onPress}) => {
  return (
    <View
      style={[
        ms.width(windowWidth * 100) / 100,
        ms.height(windowHeight * 30) / 100,

        styles.card,
      ]}>
      <TouchableOpacity style={[ms.jc('center')]} onPress={onPress}>
        <View style={[ms.ai('center')]}>
          <Image
            source={{uri: rekomendasi?.image}}
            style={[ms.width(120), ms.height(70)]}
          />
        </View>
        <View
          style={[
            ms.width(180),
            // ms.height(windowHeight * 30) / 100,
            ms.pdT(10),
            ms.jc('center'),
          ]}>
          <Text style={[ms.fzBC(11, '700', colors.black)]}>
            {rekomendasi?.title}
          </Text>
        </View>
        <View style={[ms.pdT(2)]}>
          <Text style={[ms.fzBC(8, '400', colors.black)]}>
            {rekomendasi?.media}
          </Text>
        </View>
        <View style={[ms.row, ms.mgT(3)]}>
          <View style={[ms.mgL()]}>
            <Text style={[ms.fzBC(9, '500', colors.blue)]}>
              {rekomendasi?.kategori}
            </Text>
          </View>
          <View style={[ms.width((windowWidth * 30) / 100), ms.row]}>
            <Image
              source={Point}
              style={[ms.width(2), ms.height(2), ms.mgT(5), ms.mgH(5)]}
            />
            <Text style={[ms.fzBC(9, '400', colors.black)]}>
              {rekomendasi?.date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default KategoriRekomendasi;

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    marginHorizontal: 15,
    padding: 5,
    backgroundColor: 'white',
    // borderRadius: 10,
    shadowColor: colors.grey,
    // shadowOffset: {
    //   width: 0,
    //   height: 8,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 10,
    elevation: 3,
    margin: 5,
  },
});
