import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ms from '../../utils/ms'
import { colors, showToast, showToasty } from '../../utils'
import { windowHeight, windowWidth } from '../../utils/ms/constant'
import { TextInput } from 'react-native-gesture-handler'
import { Gap, Input, InputCheck, MainButton } from '../../components'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
// import { showMessage } from 'react-native-flash-message'
import { registrasiAction } from '../../redux/action'

const Registrasi = ({navigation}) => {
  const dispatch = useDispatch();
  const [registrasi, setRegistrasi] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isValid, setIsvalid] = useState(true);

  const onRegister = async () => {

    if (!registrasi?.name){
      setIsvalid(false);
      // showToasty('Nama Anda belum diisi', 'warning');
    } else if (!registrasi?.email){
      setIsvalid(false);
      // showMessage('Email Anda belum diisi', 'danger');   
    } if(!registrasi.email.match(/\S+@\S+\.\S+/)){
      setIsvalid(false);
      // showMessage('Masukkan email yang valid', 'danger');
      // isValid = false;
    } else if (!registrasi?.password){
      setIsvalid(false);
      // showMessage('Password Anda belum diisi', 'danger');
      // isValid = false;
    } else if (!registrasi?.confirmPassword){
      setIsvalid(false);
      // showMessage('Konfirmasi Password Anda belum diisi', 'danger');
      // isValid = false;
    } if (registrasi?.confirmPassword != registrasi?.confirmPassword){
      setIsvalid(false);
      // showMessage('Pastikan password sesuai', 'danger');
      // isValid = false;
    }

    setIsvalid(true)
    if (isValid){
      const dataRegistrasi = (
        {
          name: registrasi?.name,
          email: registrasi?.email,
          password: registrasi?.password,
        }
      )
      console.log('form regis:', dataRegistrasi);

      await dispatch(registrasiAction(dataRegistrasi, navigation));
    }
    
  }


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

          <Input label="Email" placeholder="Masukkan email" 
            value={registrasi?.email}
            onChangeText={(value) => {
              setRegistrasi({
                ...registrasi,
                email: value,
              })
            }}
            
          />          

          <Input label="Nama Lengkap" placeholder="Masukkan nama lengkap" 
          value={registrasi?.name}
          onChangeText={(value) => {
            setRegistrasi({
              ...registrasi,
              name: value,
            })
          }}/>

          <Input label="Kata Sandi" placeholder="Masukkan kata sandi" password 
          value={registrasi?.password}
          onChangeText={(value) => {
            setRegistrasi({
              ...registrasi,
              password: value,
            })
          }}/>

          <Input label="Konfirmasi Kata Sandi" placeholder="Masukkan kata sandi" password
          value={registrasi?.confirmPassword}
          onChangeText={(value) => {
            setRegistrasi({
              ...registrasi,
              confirmPassword: value,
            })
          }}/>

        </View>
        
        {/* Button Masuk */}
        <View style={[ms.pdH(16), ms.mgT(15)]}>
          <MainButton label='Daftar' width={(windowWidth * 89) / 100} onPress={()=>{onRegister()}} />
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