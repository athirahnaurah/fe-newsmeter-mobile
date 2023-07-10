import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ms from '../../../utils/ms'
import { windowHeight, windowWidth } from '../../../utils/ms/constant'
import { colors } from '../../../utils'

const Media = ({theme, med, onPress}) => {
  // console.log('media', med);

  imageSelect = med => {
  
    const mediaArray = {
      '100kpj.com': require('../../../assets/icon/media/100kpj.png'),  
      'abadikini.com': require('../../../assets/icon/media/abadikini.png'),  
      'akurat.co': require('../../../assets/icon/media/akurat.png'),  
      'antvklik.com': require('../../../assets/icon/media/antvklik.png'),  
      'alinea.id': require('../../../assets/icon/media/alinea.png'),  
      'antaranews.com': require('../../../assets/icon/media/antaranews.png'),  
      'ayobandung.com': require('../../../assets/icon/media/ayobandung.png'),  
      'ayobogor.com': require('../../../assets/icon/media/ayobogor.png'),  
      'beritajatim.com': require('../../../assets/icon/media/beritajatim.png'),  
      'beritasatu.com': require('../../../assets/icon/media/beritasatu.png'),  
      'bisnis.com': require('../../../assets/icon/media/bisnis.png'),  
      'cnbcindonesia.com': require('../../../assets/icon/media/cnbcindonesia.png'),  
      'cnnindonesia.com': require('../../../assets/icon/media/cnnindonesia.png'),  
      'cyberthreat.id': require('../../../assets/icon/media/cyberthreat.png'),  
      'detik.com': require('../../../assets/icon/media/detik.png'),  
    }
  
    return mediaArray[med];

  };

  return (
    <View style={[ms.width(windowWidth*30)/100, ms.height(windowHeight*30)/100, ]}>
      <TouchableOpacity style={[ms.mgH(12), ms.aiJc('center')]} onPress={onPress}>
        <View style={[ms.width(windowWidth*15)/100, ms.height(windowHeight*15)/10]}>
        <Image source={imageSelect(med)} style={[ms.width(50), ms.height(50)]}/>
            {/* <Image source={med?.img}  style={[ms.width(50), ms.height(50)]}/> */}
        </View>
        <View style={[ms.width(windowWidth*15)/100, ms.pdT(10)]}>
            <Text style={[theme === 'dark' ? ms.fzBC(12, '400', colors.white) : ms.fzBC(12, '400', colors.black)]}>{med}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Media

const styles = StyleSheet.create({})