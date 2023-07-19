import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import ms from '../../utils/ms';
import {colors, getData} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {TextInput} from 'react-native-gesture-handler';
import {Gap, Input, Loader, MainButton} from '../../components';
import {loginAction} from '../../redux/action/login';
import {useDispatch, useSelector} from 'react-redux';
import {getPreference} from '../../redux/action/kategori';
import {useEffect} from 'react';

// Login Page

const Login = ({navigation}) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {isLoadingScreen} = useSelector(state => state.globalReducer);

  useEffect(() => {
    console.log(colorScheme);
  }, [colorScheme]);

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // Input Validation
  const onValidate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!input?.email) {
      onHandleError('Email tidak boleh kosong', 'email');
      isValid = false;
    } else if (!input.email.match(/\S+@\S+\.\S+/)) {
      onHandleError('Masukkan email yang valid', 'email');
      isValid = false;
    }

    if (!input.password) {
      onHandleError('Password tidak boleh kosong', 'password');
      isValid = false;
    }

    if (isValid) {
      onLogin();
    }
  };

  // Login function
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
  };

  const onHandleChange = (text, input) => {
    setInput(prevState => ({...prevState, [input]: text}));
  };

  const onHandleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  return (
    <SafeAreaView
      style={[
        colorScheme === 'dark' ? styles.containerPageD : ms.containerPage,
        ms.height((windowHeight * 100) / 100),
      ]}>
      <Loader isVisible={isLoadingScreen} theme={colorScheme} />
      <ScrollView>
        {/* Lewati */}
        <View style={[ms.height((windowHeight * 20) / 100), styles.lewati]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainApp');
            }}
            style={[ms.height((windowHeight * 3) / 100)]}>
            <Text
              style={[
                colorScheme === 'dark'
                  ? ms.fzBC(14, '500', colors.white)
                  : ms.fzBC(14, '500', colors.greyDark),
              ]}>
              Lewati
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[ms.height((windowHeight * 70) / 100)]}>
          {/* Input */}
          <View style={[ms.jc('center')]}>
            <Text
              style={[
                ms.pdH(20),
                ms.mgB(15),
                colorScheme === 'dark'
                  ? ms.fzBC(16, '700', colors.white)
                  : ms.fzBC(16, '700', colors.black),
              ]}>
              {' '}
              Masuk ke Akun Newsmeter
            </Text>

            <Input
              height={(windowHeight * 12) / 100}
              label="Email"
              placeholder="Masukkan email"
              error={errors.email}
              value={input.email}
              theme={colorScheme}
              onFocus={() => {
                onHandleError(null, 'email');
              }}
              onChangeText={value => {
                onHandleChange(value, 'email');
              }}
            />

            <Input
              height={(windowHeight * 12) / 100}
              label="Kata sandi"
              placeholder="Masukkan kata sandi"
              password
              error={errors.password}
              value={input.password}
              theme={colorScheme}
              onFocus={() => {
                onHandleError(null, 'password');
              }}
              onChangeText={value => {
                onHandleChange(value, 'password');
              }}
            />
          </View>

          {/* Button Masuk */}
          <View
            style={[
              ms.pdH(16),
              ms.mgT(15),
              ms.width((windowWidth * 100) / 100),
              ms.height((windowHeight * 12) / 100),
            ]}>
            <MainButton
              label="Masuk"
              width={(windowWidth * 90) / 100}
              onPress={() => {
                onValidate();
              }}
            />
            {/* Forgot Password */}
            <TouchableOpacity style={[ms.aiJc('center'), ms.mgT(15)]} onPress={()=>{navigation.navigate("ForgotPassword")}}>
              <Text
                style={[
                  colorScheme === 'dark'
                    ? ms.fzBC(12, '500', colors.white)
                    : ms.fzBC(12, '700', colors.blue),
                ]}>
                Lupa Kata Sandi?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Redirect Registrasi */}
        <View style={[]}>
          <Gap
            width={(windowWidth * 100) / 100}
            height={1}
            backgroundColor={
              colorScheme === 'dark' ? colors.white : colors.grey
            }
          />

          <View>
            <View
              style={[
                ms.row,
                ms.aiJc('center'),
                ms.height((windowHeight * 6) / 100),
              ]}>
              <Text
                style={[
                  colorScheme === 'dark'
                    ? ms.fzBC(11, '500', colors.white)
                    : ms.fzBC(11, '500', colors.grey),
                ]}>
                Belum punya akun?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Registrasi');
                }}>
                <Text
                  style={[
                    colorScheme === 'dark'
                      ? ms.fzBCLh(10, '500', colors.blue_dark, 12)
                      : ms.fzBCLh(10, '500', colors.blue, 12),
                  ]}>
                  Daftar
                </Text>
              </TouchableOpacity>
            </View>
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
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
  },
});
