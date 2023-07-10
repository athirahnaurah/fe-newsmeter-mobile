import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {Gap, Input, Loader, MainButton} from '../../components';
import {forgotPassAction, loginAction} from '../../redux/action/login';
import {useDispatch, useSelector} from 'react-redux';
import {getPreference} from '../../redux/action/kategori';
import {useEffect} from 'react';
import {Logo} from '../../assets';

// Forgot Password Page

const ForgotPassword = ({navigation}) => {
  const colorScheme = useColorScheme(); 
  const dispatch = useDispatch();
  const {isLoadingScreen} = useSelector(state => state.globalReducer);

  useEffect(() => {
    console.log(colorScheme);
  }, [colorScheme]);

  const [input, setInput] = useState({
    email: '',
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

    if (isValid) {
      onForgot();
    }
  };

  // Send data forgot pass
  const onForgot = async () => {
    let dataPass = {
      email: input?.email,
    };
    console.log('form forgot pass:', dataPass);
    setInput({
      email: '',
    });

    await dispatch(forgotPassAction(dataPass));
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
      <Loader isVisible={isLoadingScreen} />
      <ScrollView>
        {/* Header */}
        <View
          style={[
            ms.height((windowHeight * 15) / 100),
            ms.bc(colors.blue),
            ms.aiJc('center'),
            ms.bdRBLR(10),
            ms.bdRBRR(10),
          ]}>
          <Image source={Logo} style={[ms.aiJc('center')]} />
        </View>

        <View style={[ms.height((windowHeight * 5) / 100)]}></View>

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
              Lupa Kata Sandi?
            </Text>

            <Text
              style={[
                ms.pdH(20),
                colorScheme === 'dark'
                  ? ms.fzBC(12, '600', colors.white)
                  : ms.fzBC(12, '600', colors.greyDark),
              ]}>
              {' '}
              Masukkan email yang Anda gunakan
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
              label="Kirim"
              width={(windowWidth * 90) / 100}
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
                Sudah punya akun?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text
                  style={[
                    colorScheme === 'dark'
                      ? ms.fzBCLh(10, '500', colors.blue_dark, 12)
                      : ms.fzBCLh(10, '500', colors.blue, 12),
                  ]}>
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

export default ForgotPassword;

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
