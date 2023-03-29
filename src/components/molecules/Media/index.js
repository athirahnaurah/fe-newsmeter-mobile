import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ms from '../../../utils/ms'
import { windowHeight, windowWidth } from '../../../utils/ms/constant'
import { CNN, IconEkonomi } from '../../../assets'
import { colors } from '../../../utils'

const Media = ({media, onPress}) => {
  return (
    <View style={[ms.width(windowWidth*30)/100, ms.height(windowHeight*30)/100, ]}>
      <TouchableOpacity style={[ms.mgH(20), ms.aiJc('center')]} onPress={onPress}>
        <View style={[ms.width(windowWidth*15)/100, ms.height(windowHeight*15)/10]}>
            <Image source={media?.img}  style={[ms.width(50), ms.height(50)]}/>
        </View>
        <View style={[ms.width(windowWidth*15)/100, ms.pdT(10)]}>
            <Text style={[ms.fzBC(10, '400', colors.black)]}>{media?.link}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Media

const styles = StyleSheet.create({})