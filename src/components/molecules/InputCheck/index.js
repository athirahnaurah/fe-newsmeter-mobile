import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InputCheck = ({email, email2, nama, password, password2, ...props}) => {
  return (
    <View>
    {email && (
          <View style={[ms.pdH(25), ms.pdB(8)]}>
            <Text style={[ms.fzBC(12, '500', '#D9435E')]}>Email tidak boleh kosong</Text>
          </View>
    )}
    {email2 && (
          <View style={[ms.pdH(25), ms.pdB(8)]}>
            <Text style={[ms.fzBC(12, '500', '#D9435E')]}>Masukkan email yang valid</Text>
          </View>
    )}
    {password && (
          <View style={[ms.pdH(25), ms.pdB(8)]}>
            <Text style={[ms.fzBC(12, '500', '#D9435E')]}>Masukkan kata sandi minimal 8 karakter</Text>
          </View>
    )}
    {nama && (
          <View style={[ms.pdH(25), ms.pdB(8)]}>
            <Text style={[ms.fzBC(12, '500', '#D9435E')]}>Nama tidak boleh kosong</Text>
          </View>
    )}
    {password2 && (
          <View style={[ms.pdH(25), ms.pdB(8)]}>
            <Text style={[ms.fzBC(12, '500', '#D9435E')]}>Kata sandi tidak sesuai</Text>
          </View>
    )}
    </View>
  )
}

export default InputCheck

const styles = StyleSheet.create({})