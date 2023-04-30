import {
  ActivityIndicator,
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ms from '../../utils/ms';
import {colors, showToast, showToasty} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {TextInput} from 'react-native-gesture-handler';
import {
  Gap,
  Input,
  InputCheck,
  Loader,
  MainButton,
  PopUpMessage,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
// import { showMessage } from 'react-native-flash-message'
import {registrasiAction} from '../../redux/action';
// import popUpMessage from '../../utils/PopUpMessage'

const Registrasi = ({navigation}) => {
  const dispatch = useDispatch();
  // const {registrationSuccess} = useSelector(state => state.globalReducer);
  const {isLoadingScreen} = useSelector(state => state.globalReducer);

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if(!input.name){
      onHandleError('Nama tidak boleh kosong', 'name');
      isValid = false;
    }
    if(!input.password){
      onHandleError('Password tidak boleh kosong', 'password');
      isValid = false;
    } else if (input.password.length < 8){
      onHandleError('Masukkan kata sandi minimal 8 karakter', 'password');
      isValid = false;
    }
    if(!input.confirmPassword){
      onHandleError('Konfirmasi kata sandi', 'confirmPassword');
      isValid = false;
    }else if (input.confirmPassword !== input.password){
      onHandleError('Kata sandi tidak sesuai', 'confirmPassword');
      isValid = false;
    }

    if(isValid){
      onRegister();
    }
  };

  const onRegister = async () => {
    let dataRegistrasi = {
          name: input?.name,
          email: input?.email,
          password: input?.password,
        };
    console.log('form regis:', dataRegistrasi);
    setInput({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    
    await dispatch(registrasiAction(dataRegistrasi));


   
  }
  
  const onHandleChange = (text, input) => {
    setInput((prevState) => ({...prevState, [input]: text}))
  }

  const onHandleError = (errorMessage, input) => {
    setErrors((prevState) => ({...prevState, [input]: errorMessage}))
  }
  
  // console.log('input', input)

  return (
    <SafeAreaView style={[ms.containerPage]}>
      <Loader isVisible={isLoadingScreen}/>
      <ScrollView>
        
          <View>
            {/* */}
            <View style={[ms.height((windowHeight * 10) / 100)]}></View>

            {/* Input */}
            <View style={[ms.height((windowHeight * 80) / 100)]}>
              <View style={[ms.jc('center')]}>
                <Text
                  style={[
                    ms.fzBC(16, '700', colors.black),
                    ms.pdL(20),
                    ms.mgB(15),
                  ]}>
                  {' '}
                  Buat Akun Newsmeter
                </Text>

                <Input
                  label="Email"
                  placeholder="Masukkan email"
                  error={errors.email}
                  value={input.email}
                  onFocus={() => {
                    onHandleError(null, 'email')
                  }}
                  onChangeText={(value) => {
                    onHandleChange(value, "email")
                  }}
                />

                <Input
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  error={errors.name}
                  value={input.name}
                  onFocus={() => {
                    onHandleError(null, 'name')
                  }}
                  onChangeText={(value) => {
                    onHandleChange(value, "name")
                  }}
                />

                <Input
                  label="Kata Sandi"
                  placeholder="Masukkan kata sandi"
                  password
                  error={errors.password}
                  value={input.password}
                  onFocus={() => {
                    onHandleError(null, 'password')
                  }}
                  onChangeText={(value) => {
                    onHandleChange(value, "password")
                  }}
                />

                <Input
                  label="Konfirmasi Kata Sandi"
                  placeholder="Masukkan kata sandi"
                  password
                  error={errors.confirmPassword}
                  value={input.confirmPassword}
                  onFocus={() => {
                    onHandleError(null, 'confirmPassword')
                  }}
                  onChangeText={(value) => {
                    onHandleChange(value, "confirmPassword")
                  }}
                />
              </View>

              {/* {
                registrationSuccess ? showAlertSuccess() : null
                // <PopUpMessage message='Please check email to activate your account' isVisible={popup} onclose={handleClosePopup} />
              } */}

              {/* Button Masuk */}
              <View style={[ms.pdH(16), ms.mgT(15)]}>
                <MainButton
                  label="Daftar"
                  width={(windowWidth * 89) / 100}
                  onPress={() => {
                    onValidate();
                  }}
                />
              </View>
            </View>

            {/* Redirect Registrasi */}
            <View style={[ms.height((windowHeight * 7) / 100)]}>
              <Gap
                width={(windowWidth * 100) / 100}
                height={1}
                backgroundColor={colors.grey}
              />

              <View style={[ms.row, ms.aiJc('center'), ms.mgT(20)]}>
                <Text style={[ms.fzBC(11, '500', colors.grey)]}>
                  Sudah punya akun?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={[ms.fzBCLh(11, '500', colors.blue, 12)]}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

// {isLoadingScreen ? (
//   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.5}}>
//     <ActivityIndicator
//       color={colors.black}
//       size={'large'}
//       style={[ms.mgT((windowHeight*50)/100)]}
//     />
//   </View>
// ) : ()}

export default Registrasi;

const styles = StyleSheet.create({
  lewati: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
