import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {colors, windowHeight, windowWidth} from '../../../utils';
import ms from '../../../utils/ms';
import {Gap} from '../../atoms';
import {Point} from '../../../assets';

const SearchList = ({search, onPress, width, height}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* List Berita */}
      <View style={[styles.NewsCard]}>
        <View style={[ms.row, ms.mgT(5), ms.mgB(30)]}>
          <View style={[ms.width('60%'), ms.height(65), ms.pdL(20)]}>
            <Text numberOfLines={3} style={[ms.fzBC(12.8, '700', colors.black)]}>
              {search?.title}
            </Text>
            <Text style={[ms.fzBC(11, '400', colors.black)]}>
              {search?.media}
            </Text>

            <View style={[ms.row, ms.mgT(5)]}>
              <View style={[]}>
                <Text style={[ms.fzBC(10, '500', colors.blue)]}>
                  {search?.kategori}
                </Text>
              </View>
              <View style={[ms.width('100%'), ms.row]}>
                <Image source={Point} style={[ms.width(2), ms.height(2), ms.mgT(7), ms.mgH(5)]} />
                <Text style={[ms.fzBC(10, '400', colors.black)]}>
                  {search?.date}
                </Text>
              </View>
            </View>
          </View>

          <View style={[ms.width('40%'), ms.ai('center')]}>
            <Image
              source={{uri : search?.image}}
              style={[ms.width('75%'), ms.height('100%')]}
            />
          </View>
        </View>

        <View style={[ms.mgH(20)]}>
          <Gap height={1} backgroundColor={colors.grey3}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

{
  /* <View style={[styles.NewsCard]}>
          <View style={[ms.row, ms.pdV(17)]}>
            <View style={[ms.width(windowWidth * 50 / 100), ms.height(windowHeight * 35 /100), ms.pdL(20)]}>
            <Text style={[ms.fzBC(12.8 , '700', colors.black)]}>{news?.title}</Text>
            <Text style={[ms.fzBC(12.8 , '400', colors.black)]}>{news?.media}</Text>
            </View>

            <View style={[ms.width(windowWidth * 50 /100), ms.height(windowHeight * 20 /100), ms.ai('center')]}>
              <Image source={news?.img} style={[ms.width(windowWidth * 40 /100), ms.height(windowHeight * 13 /100)]}/>
            </View>
          </View>
        </View> */
}

export default SearchList;

const styles = StyleSheet.create({
  NewsCard: {
    width: '100%',
    height: '100%',
    //   backgroundColor: colors.grey,
    flex: 1,
    justifyContent: 'center',
    // flexDirection: 'row',
  },
});
