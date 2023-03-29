import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Profile } from '../../assets'
import ms from '../../utils/ms'
import { colors } from '../../utils'
import { windowHeight, windowWidth } from '../../utils/ms/constant'
import Icon from 'react-native-vector-icons/Ionicons'

const Profil = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[ms.width((windowWidth*100)/100), ms.height((windowHeight*30)/100), ms.aiJc('center'), ms.mgT()]}>
          <Image source={Profile} />
          <Text style={[ms.fzBC(12, '400', colors.black), ms.mgT(10)]}>Nama</Text>
          <Text style={[ms.fzBC(10, '400', colors.black)]}>nama@example.com</Text>
        </View>

        <View style={[ms.width((windowWidth*100)/100), ms.height((windowHeight*70)/100), ms.mgH(20)]}>
          <Text style={[ms.fzBC(14, '600', colors.black), ms.mgB(10)]}>Pengaturan</Text>
          <TouchableOpacity onPress={() => {}} style={[ms.row, ms.ai('center'), ms.pdV(10)]}>
            <Icon name='search-circle-outline' size={20} color={colors.black} style={[ms.width((windowWidth*8)/100)]} />
            <Text style={[ms.fzBC(12, '400', colors.black), ms.width((windowWidth*78)/100)]}>Kunjungi Website</Text>
            <Icon name='chevron-forward' size={18} color={colors.black} style={[ms.width((windowWidth*12)/100), ms.pdR(20)]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={[ms.row, ms.ai('center'), ms.pdV(10)]}>
            <Icon name='exit-outline' size={20} color={colors.black} style={[ms.width((windowWidth*8)/100)]} />
            <Text style={[ms.fzBC(12, '400', colors.black), ms.width((windowWidth*78)/100)]}>Keluar</Text>
            <Icon name='chevron-forward' size={18} color={colors.black} style={[ms.width((windowWidth*12)/100), ms.pdR(20)]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profil

const styles = StyleSheet.create({})