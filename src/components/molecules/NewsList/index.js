import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {colors, windowHeight, windowWidth} from '../../../utils';
import ms from '../../../utils/ms';
import {Gap} from '../../atoms';
import {ImageDefault, Point} from '../../../assets';
import {useState} from 'react';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';

const NewsList = ({theme, news, onPress, width, height}) => {
  {
    /* Condition while there's no image in var img */
  }
  // const [imgNull, setImgNull] = useState(news?.image);

  // const stateNull = () => {
  //   setImgNull(null);
  // }

  // useEffect(() => {
  //   stateNull()
  // })

  return (
    <TouchableOpacity onPress={onPress}>
      {/* List Berita */}
      <View style={[styles.NewsCard]}>
        <View style={[ms.row, ms.mgT(16), ms.mgB(30)]}>
          <View style={[ms.width('60%'), ms.height(60), ms.pdL(20)]}>
            <Text
              numberOfLines={3}
              style={[
                theme === 'dark'
                  ? ms.fzBC(12.8, '700', colors.white)
                  : ms.fzBC(12.8, '700', colors.black),
              ]}>
              {news?.title}
            </Text>
            <Text
              style={[
                theme === 'dark'
                  ? ms.fzBC(11, '400', colors.white)
                  : ms.fzBC(11, '400', colors.black),
              ]}>
              {news?.media}
            </Text>

            <View style={[ms.row, ms.mgT(5)]}>
              <View style={[]}>
                <Text
                  style={[
                    theme === 'dark'
                      ? ms.fzBC(10, '500', colors.blue_dark)
                      : ms.fzBC(10, '500', colors.blue),
                  ]}>
                  {news?.kategori}
                </Text>
              </View>
              <View style={[ms.width('100%'), ms.row]}>
                <Icon
                  name='dot-single'
                  size={12}
                  color={theme === 'dark' ? colors.white : colors.black}
                  style={[ ms.mgH(3)]}
                />
                <Text
                  style={[
                    theme === 'dark'
                      ? ms.fzBC(10, '400', colors.white)
                      : ms.fzBC(10, '400', colors.black),
                  ]}>
                  {news?.date}
                </Text>
              </View>
            </View>
          </View>

          {news?.image !== null ? (
            <View style={[ms.width('40%'), ms.ai('center')]}>
              <Image
                source={{uri: news?.image}}
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

          {/* Condition while there's no image in var img */}
          {/* {imgNull !== null ? (
            <View style={[ms.width('40%'), ms.ai('center')]}>
            <Image
              source={{uri: news?.image}}
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
          )} */}
        </View>
        <View style={[ms.mgH(20)]}>
          <Gap
            height={1}
            backgroundColor={
              theme === 'dark' ? colors.white : colors.grey
            }
          />
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

export default NewsList;

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
