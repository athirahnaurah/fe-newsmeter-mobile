import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import React, { useEffect } from 'react';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {
  Gap,
  Input,
  Loader,
  MainButton,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {registrasiAction} from '../../redux/action';

const Registrasi = ({navigation}) => {
  const colorScheme = useColorScheme();
  useEffect(() =>{
    console.log(colorScheme);
  }, [colorScheme])

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

  // Input validation
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
    }else if (input.name.length > 255){
      onHandleError('Nama maksimal 255', 'name');
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

  // Registration function
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
    <SafeAreaView style={[colorScheme === 'dark' ? styles.containerPageD : ms.containerPage]}>
      <Loader isVisible={isLoadingScreen} theme={colorScheme}/>
      <ScrollView>
        
          <View>
            {/* */}
            <View style={[ms.height((windowHeight * 10) / 100)]}></View>

            {/* Input */}
            <View style={[ms.height((windowHeight * 80) / 100)]}>
              <View style={[ms.jc('center')]}>
                <Text
                  style={[
                    ms.pdL(20),
                    ms.mgB(15),
                    colorScheme === 'dark' ?
                    ms.fzBC(16, '700', colors.white) :
                    ms.fzBC(16, '700', colors.black)
                  ]}>
                  {' '}
                  Buat Akun Newsmeter
                </Text>

                <Input
                  height={(windowHeight * 12) / 100}
                  label="Email"
                  placeholder="Masukkan email"
                  error={errors.email}
                  value={input.email}
                  theme={colorScheme}
                  onFocus={() => {
                    onHandleError(null, 'email')
                  }}
                  onChangeText={(value) => {
                    onHandleChange(value, "email")
                  }}
                />

                <Input
                height={(windowHeight * 12) / 100}
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  error={errors.name}
                  value={input.name}
                  theme={colorScheme}
                  onFocus={() => {
                    onHandleError(null, 'name')
                  }}
                  onChangeText={(value) => {
                    onHandleChange(value, "name")
                  }}
                />

                <Input
                height={(windowHeight * 12) / 100}
                  label="Kata Sandi"
                  placeholder="Masukkan kata sandi"
                  password
                  error={errors.password}
                  value={input.password}
                  theme={colorScheme}
                  onFocus={() => {
                    onHandleError(null, 'password')
                  }}
                  onChangeText={(value) => {
                    onHandleChange(value, "password")
                  }}
                />

                <Input
                height={(windowHeight * 12) / 100}
                  label="Konfirmasi Kata Sandi"
                  placeholder="Masukkan kata sandi"
                  password
                  error={errors.confirmPassword}
                  value={input.confirmPassword}
                  theme={colorScheme}
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
              <View style={[ms.pdH(16), ms.mgT(15), ms.height((windowHeight * 12) / 100)]}>
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
            <View style={[]}>
              <Gap
                width={(windowWidth * 100) / 100}
                height={1}
                backgroundColor={colorScheme === 'dark' ? colors.white : colors.grey}
              />

              <View style={[ms.row, ms.aiJc('center'), ms.height((windowHeight * 6) / 100)]}>
                <Text style={[
                  colorScheme === 'dark' ?
                  ms.fzBC(11, '500', colors.white) :
                  ms.fzBC(11, '500', colors.grey)]}>
                  Sudah punya akun?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={[
                    colorScheme === 'dark' ?
                    ms.fzBCLh(11, '500', colors.blue_dark, 12) :
                    ms.fzBCLh(11, '500', colors.blue, 12)]}>
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
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
  }
});
