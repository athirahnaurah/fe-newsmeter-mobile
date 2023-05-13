import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {TextInput} from 'react-native-gesture-handler';
import {Gap, Input, Loader, MainButton} from '../../components';
import { loginAction } from '../../redux/action/login';
import { useDispatch, useSelector } from 'react-redux';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoadingScreen} = useSelector(state => state.globalReducer);

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // const [isValid, setIsvalid] = useState(true);

  // const [popup, setPopup] = useState(true);

  const onValidate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!input?.email) {
      onHandleError('Email tidak boleh kosong', 'email');
      isValid = false;
    } else if (!input.email.match(/\S+@\S+\.\S+/)){
      onHandleError('Masukkan email yang valid', 'email');
      isValid = false;
    }
    
    if(!input.password){
      onHandleError('Password tidak boleh kosong', 'password');
      isValid = false;
    } 

    if(isValid){
      onLogin();
    }
  };

  const onLogin = async () => {
    let dataLogin = {
          email: input?.email,
          password: input?.password,
        };
    console.log('form login:', dataLogin);
    setInput({
      email: '',
      password: '',
    });
    
    await dispatch(loginAction(dataLogin, navigation));

  }
  
  const onHandleChange = (text, input) => {
    setInput((prevState) => ({...prevState, [input]: text}))
  }

  const onHandleError = (errorMessage, input) => {
    setErrors((prevState) => ({...prevState, [input]: errorMessage}))
  }

  return (
    <SafeAreaView style={[ms.containerPage]}>
      <Loader isVisible={isLoadingScreen}/>
      <ScrollView>
        {/* Lewati */}
        <View style={[ms.height((windowHeight * 20) / 100), styles.lewati]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainApp');
            }}>
            <Text style={[ms.fzBC(14, '400', colors.greyDark)]}>Lewati</Text>
          </TouchableOpacity>
        </View>

        <View style={[ms.height((windowHeight * 70) / 100)]}>
          {/* Input */}
          <View style={[ms.jc('center')]}>
            <Text
              style={[
                ms.fzBC(16, '700', colors.black),
                ms.pdH(20),
                ms.mgB(15),
              ]}>
              {' '}
              Masuk ke Akun Newsmeter
            </Text>

            <Input
              label="Email"
              placeholder="Masukkan email"
              error={errors.email}
              value={input.email}
              onFocus={() => {
                onHandleError(null, 'email');
              }}
              onChangeText={value => {
                onHandleChange(value, 'email');
              }}
            />

            <Input
              label="Kata sandi"
              placeholder="Masukkan kata sandi"
              password
              error={errors.password}
              value={input.password}
              onFocus={() => {
                onHandleError(null, 'password');
              }}
              onChangeText={value => {
                onHandleChange(value, 'password');
              }}
            />
          </View>

          {/* Button Masuk */}
          <View style={[ms.pdH(16), ms.mgT(15)]}>
            <MainButton
              label="Masuk"
              width={(windowWidth * 89) / 100}
              onPress={() => {
                onValidate();
              }}
            />
          </View>
        </View>

        {/* Redirect Registrasi */}
        <View style={[ms.height((windowHeight * 10) / 100)]}>
          <Gap
            width={(windowWidth * 100) / 100}
            height={1}
            backgroundColor={colors.grey}
          />

          <View style={[ms.row, ms.aiJc('center'), ms.pdV(16), ms.height((windowHeight * 7) / 100)]}>
            <Text style={[ms.fzBC(10, '400', colors.grey)]}>
              Belum punya akun?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Registrasi');
              }}>
              <Text style={[ms.fzBCLh(10, '500', colors.blue, 12)]}>
                Daftar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  lewati: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
