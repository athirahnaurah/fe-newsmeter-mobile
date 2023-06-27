import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ms from '../../../utils/ms';
import {colors} from '../../../utils';
import {windowHeight, windowWidth} from '../../../utils/ms/constant';
import {Gap} from '../../atoms';
import {ImageDefault, Point} from '../../../assets';
import Icon from 'react-native-vector-icons/Entypo';

const KategoriRekomendasi = ({theme, news, onPress}) => {
  return (
    <View
      style={[
        ms.width(windowWidth * 100) / 100,
        // ms.height(windowHeight * 40) / 100,
        theme === 'dark' ? styles.cardD : styles.card,
      ]}>
      <TouchableOpacity style={[ms.jc('center')]} onPress={onPress}>
        {news?.image !== null ? (
          <View style={[ms.ai('center')]}>
            <Image
              source={{uri: news?.image}}
              style={[
                ms.width((windowWidth * 50) / 100),
                ms.height((windowHeight * 14) / 100),
              ]}
            />
          </View>
        ) : (
          <View style={[ms.ai('center')]}>
            <Image
              source={ImageDefault}
              style={[
                ms.width((windowWidth * 50) / 100),
                ms.height((windowHeight * 14) / 100),
              ]}
            />
          </View>
        )}

        <View
          style={[
            ms.width(180),
            // ms.height(windowHeight * 30) / 100,
            ms.pdT(10),
            ms.jc('center'),
          ]}>
          <Text
            numberOfLines={2}
            style={[
              theme === 'dark'
                ? ms.fzBC(12, '700', colors.white)
                : ms.fzBC(12, '700', colors.black),
            ]}>
            {news?.title}
          </Text>
        </View>
        <View style={[ms.pdT(2)]}>
          <Text
            style={[
              theme === 'dark'
                ? ms.fzBC(10, '400', colors.white)
                : ms.fzBC(10, '400', colors.black),
            ]}>
            {news?.media}
          </Text>
        </View>
        <View style={[ms.row, ms.mgT(3)]}>
          <View style={[ms.mgL()]}>
            <Text
              style={[
                theme === 'dark'
                  ? ms.fzBC(11, '500', colors.blue_dark)
                  : ms.fzBC(11, '500', colors.blue),
              ]}>
              {news?.kategori}
            </Text>
          </View>
          <View style={[ms.width((windowWidth * 30) / 100), ms.row]}>
            <Icon
              name="dot-single"
              size={12}
              color={theme === 'dark' ? colors.white : colors.black}
              style={[ms.mgH(3)]}
            />
            <Text
              style={[
                theme === 'dark'
                  ? ms.fzBC(11, '400', colors.white)
                  : ms.fzBC(11, '400', colors.black),
              ]}>
              {news?.date}
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
    // marginBottom: 20,
    marginLeft: 20,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.23,
    shadowRadius: 10,
    elevation: 3,
    margin: 5,
  },
  cardD: {
    // marginBottom: 20,
    marginLeft: 20,
    padding: 5,
    backgroundColor: colors.grey_dark,
    borderRadius: 5,
    shadowColor: colors.grey3,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.23,
    shadowRadius: 10,
    elevation: 3,
    margin: 5,
  },
});
