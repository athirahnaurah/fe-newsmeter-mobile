import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ms from '../../utils/ms'
import { colors } from '../../utils'
import { windowHeight, windowWidth } from '../../utils/ms/constant'
import { TextInput } from 'react-native-gesture-handler'
import { Gap, Input, MainButton } from '../../components'

const Registrasi = ({navigation}) => {
  return (
    <SafeAreaView style={[ms.containerPage]}>
      <ScrollView>
        {/* Lewati */}
        <View style={[ms.height((windowHeight * 10) / 100)]}>
        </View>
        
        {/* Input */}
        <View style={[ms.height((windowHeight * 80) / 100)]}>
          
        <View style={[ms.jc('center')]}>
          <Text style={[ms.fzBC(16, '700', colors.black), ms.pdL(20), ms.mgB(15)]}> Buat Akun Newsmeter</Text>

          <Input label="Email" placeholder="Masukkan email" />

          <Input label="Nama Lengkap" placeholder="Masukkan nama lengkap" />

          <Input label="Kata Sandi" placeholder="Masukkan kata sandi" password />

          <Input label="Konfirmasi Kata Sandi" placeholder="Masukkan kata sandi" password/>

        </View>
        
        {/* Button Masuk */}
        <View style={[ms.pdH(16), ms.mgT(15)]}>
          <MainButton label='Daftar' width={(windowWidth * 89) / 100} onPress={()=>{navigation.navigate("MinatKategori")}} />
        </View>
        </View>
        
        {/* Redirect Registrasi */}
        <View style={[ms.height((windowHeight * 7) / 100)]}>
          <Gap width={(windowWidth * 100) / 100} height={0.5} backgroundColor={colors.grey}/>
          
          <View style={[ms.row, ms.aiJc('center'), ms.pdV(16)]}>
            <Text style={[ms.fzBC(10, '400', colors.grey)]}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
              <Text style={[ms.fzBCLh(10, '400', colors.blue, 12)]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Registrasi

const styles = StyleSheet.create({
 lewati:{
  flexDirection: 'row-reverse',
  paddingHorizontal: 20,
  paddingTop: 10
 },

})