import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ms from '../../../utils/ms'
import { colors } from '../../../utils'
import { IconValidasi, ImageDefault, Point } from '../../../assets'
import { Gap } from '../../atoms'

const Rekomendasi = ({rekom, onPress}) => {
   const percentage = (score) => {
    return (score * 100).toFixed(0)
   }
  return (
    <TouchableOpacity onPress={onPress}>
        {/* List Berita */}
        <View style={[styles.NewsCard]}>
        <View style={[ms.row, ms.pdV(17), ms.mgB(5), ms.jc('space-between')]}>
          <View style={[ms.width('60%'), ms.height(67), ms.pdL(20)]}>
            <Text numberOfLines={2} style={[ms.fzBC(12.8, '700', colors.black)]}>
              {rekom?.title}
            </Text>
            <Text style={[ms.fzBC(11, '400', colors.black)]}>
              {rekom?.media}
            </Text>

            <View style={[ms.row, ms.mgT(5)]}>
              <View style={[]}>
                <Text style={[ms.fzBC(10, '500', colors.blue)]}>
                  {rekom?.kategori}
                </Text>
              </View>
              <View style={[ms.width('100%'), ms.row]}>
                <Image source={Point} style={[ms.width(2), ms.height(2), ms.mgT(7), ms.mgH(5)]} />
                <Text style={[ms.fzBC(10, '400', colors.black)]}>
                  {rekom?.date}
                </Text>
              </View>
            </View>
            <View style={[ms.row, ms.ai('center'), ms.mgT(3)]}>
                <Image source={IconValidasi} style={[ms.width(8), ms.height(8)]} />
                <Text style={[ms.fzBC(9, '500', colors.black)]}> {percentage(rekom?.score)}% mirip dengan bacaanmu.</Text>
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
          <Gap height={1} backgroundColor={colors.grey3}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Rekomendasi

const styles = StyleSheet.create({
    NewsCard:{
        width: ('100%'),
        height: ('100%'),
      //   backgroundColor: colors.grey,
        flex:1,
        justifyContent:'center',
        // flexDirection: 'row',
      }
})