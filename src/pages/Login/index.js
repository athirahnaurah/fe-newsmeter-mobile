import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ms from '../../utils/ms'
import { colors } from '../../utils'
import { windowHeight, windowWidth } from '../../utils/ms/constant'
import { TextInput } from 'react-native-gesture-handler'
import { Gap, Input, MainButton } from '../../components'

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={[ms.containerPage]}>
      <ScrollView>
        {/* Lewati */}
        <View style={[ms.height((windowHeight * 20) / 100), styles.lewati]}>
        <TouchableOpacity onPress={() => {
              navigation.navigate("MainApp")}}>
          <Text style={[ms.fzBC(14, '400', colors.greyDark)]}>Lewati</Text>
        </TouchableOpacity>
        </View>
        
        <View style={[ms.height((windowHeight * 70) / 100)]}>
          {/* Input */}
        <View style={[ms.jc('center')]}>
          <Text style={[ms.fzBC(16, '700', colors.black), ms.pdH(20), ms.mgB(15)]}> Masuk ke Akun Newsmeter</Text>

          <Input label="Email" placeholder="Masukkan email" />

          <Input label="Kata Sandi" placeholder="Masukkan kata sandi" password/>

        </View>
        
        {/* Button Masuk */}
        <View style={[ms.pdH(16), ms.mgT(15)]}>
          <MainButton label='Masuk' width={(windowWidth * 89) / 100} onPress={()=>{navigation.navigate("MainApp")}} />
        </View>
        </View>
        
        {/* Redirect Registrasi */}
        <View style={[ms.height((windowHeight * 7) / 100)]}>
          <Gap width={(windowWidth * 100) / 100} height={1} backgroundColor={colors.grey}/>
          
          <View style={[ms.row, ms.aiJc('center'), ms.pdV(16)]}>
            <Text style={[ms.fzBC(10, '400', colors.grey)]}>Belum punya akun? </Text>
              <TouchableOpacity onPress={() => {navigation.navigate("Registrasi")}}>
                <Text style={[ms.fzBCLh(10, '500', colors.blue, 12)]}>Daftar</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
 lewati:{
  flexDirection: 'row-reverse',
  paddingHorizontal: 20,
  paddingTop: 10
 },

})