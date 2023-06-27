import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ms from '../../../utils/ms';
import {colors} from '../../../utils';
import {IconValidasi, ImageDefault, Point} from '../../../assets';
import {Gap} from '../../atoms';
import Icon from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../../../utils/ms/constant';
import Icon2 from 'react-native-vector-icons/Entypo';

const Rekomendasi = ({theme, rekom, onPress}) => {
  const percentage = score => {
    return (score * 100).toFixed(0);
  };
  return (
    <TouchableOpacity onPress={onPress}>
      {/* List Berita */}
      <View style={[styles.NewsCard]}>
        <View style={[ms.row, ms.pdV(17), ms.mgB(5), ms.jc('space-between')]}>
          <View style={[ms.width('60%'), ms.height(67), ms.pdL(20)]}>
            <Text
              numberOfLines={2}
              style={[
                theme === 'dark'
                  ? ms.fzBC(12.8, '700', colors.white)
                  : ms.fzBC(12.8, '700', colors.black),
              ]}>
              {rekom?.title}
            </Text>
            <Text
              style={[
                theme === 'dark'
                  ? ms.fzBC(11, '400', colors.white)
                  : ms.fzBC(11, '400', colors.black),
              ]}>
              {rekom?.media}
            </Text>

            <View style={[ms.row, ms.mgT(5)]}>
              <View style={[]}>
                <Text
                  style={[
                    theme === 'dark'
                      ? ms.fzBC(10, '500', colors.blue_dark)
                      : ms.fzBC(10, '500', colors.blue),
                  ]}>
                  {rekom?.kategori}
                </Text>
              </View>
              <View style={[ms.width('100%'), ms.row]}>
                <Icon2
                  name="dot-single"
                  size={12}
                  color={theme === 'dark' ? colors.white : colors.black}
                  style={[ms.mgH(3)]}
                />
                <Text
                  style={[
                    theme === 'dark'
                      ? ms.fzBC(10, '400', colors.white)
                      : ms.fzBC(10, '400', colors.black),
                  ]}>
                  {rekom?.date}
                </Text>
              </View>
            </View>
            <View style={[ms.row, ms.ai('center'), ms.mgT(3)]}>
              <Icon
                name="checkmark-circle"
                size={18}
                color={colors.green}
                style={[ms.width((windowWidth * 4.5) / 100)]}
              />
              <Text
                style={[
                  theme === 'dark'
                    ? ms.fzBC(12, '500', colors.white)
                    : ms.fzBC(12, '500', colors.black),
                ]}>
                {' '}
                {percentage(rekom?.score)}% mirip dengan bacaanmu.
              </Text>
            </View>
          </View>

          {rekom?.image !== null ? (
            <View style={[ms.width('40%'), ms.ai('center')]}>
              <Image
                source={{uri: rekom?.image}}
                style={[ms.width('75%'), ms.height('100%')]}
              />
            </View>
          ) : (
            <View style={[ms.width('40%'), ms.ai('center')]}>
              <Image
                source={ImageDefault}
                style={[ms.width('75%'), ms.height('100%')]}
              />
            </View>
          )}
        </View>

        <View style={[ms.mgH(20), ms.mgT(3)]}>
          <Gap
            height={1}
            backgroundColor={theme === 'dark' ? colors.white : colors.grey}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Rekomendasi;

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
