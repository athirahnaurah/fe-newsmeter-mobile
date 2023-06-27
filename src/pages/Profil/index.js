import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Profile} from '../../assets';
import ms from '../../utils/ms';
import {colors, getData} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, logoutAction} from '../../redux/action/login';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from '../../redux/action';
import {Linking} from 'react-native';

const Profil = ({navigation}) => {
  const colorScheme = useColorScheme();

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.globalReducer);
  const {isLogin} = useSelector(state => state.globalReducer);
  console.log('user: ', user);

  const goToWeb = () => {
    const url = 'https://newsmeter.id/'; // Ganti dengan URL tujuan Anda
    Linking.openURL(url);
  };

  const init = async () => {
    getData('authUser').then(resAuthUser => {
      if (resAuthUser?.data.email) {
        dispatch(getUser(navigation));
      }
    });
  };

  const onLogout = async () => {
    AsyncStorage.clear();
    navigation.reset({index: 0, routes: [{name: 'Splash'}]});
    dispatch({type: 'SET_USER', value: null});
    dispatch({type: 'SET_AUTH_USER', value: null});
    dispatch({type: 'SET_TOKEN', value: null});
    dispatch({type: 'SET_PREFERENCE', value: null});
    dispatch({type: 'SET_NEWSLIST', value: null});
    dispatch({type: 'SET_NEWS', value: null});
    dispatch({type: 'SET_NEWSLIST_BY_KATEGORI', value: null});
    dispatch({type: 'SET_NEWS_BY_KATEGORI', value: null});
    dispatch({type: 'SET_NEWSLIST_BY_MEDIA', value: null});
    dispatch({type: 'SET_NEWS_BY_MEDIA', value: null});
    dispatch({type: 'SET_NEWSLIST_SEARCH', value: null});
    dispatch({type: 'SET_SEARCH', value: null});
    dispatch({type: 'SET_MEDLIST', value: null});
    dispatch({type: 'SET_MED', value: null});
    dispatch({type: 'SET_NEWS_RECOMMEND_BY_HISTORY', value: null});
    dispatch({type: 'SET_NEWS_RECOMMEND_BY_KATEGORI', value: null});

    dispatch(setLogin(false));
    getData('authUser').then(resAuthUser => {
      console.log('user : ', resAuthUser);
    });
  };

  useEffect(() => {
    if (navigation.isFocused) {
      init();
      console.log(colorScheme);
    }
  }, [navigation, colorScheme]);

  return (
    <SafeAreaView
      style={[
        colorScheme === 'dark' ? styles.containerPageD : ms.containerPage,
      ]}>
      <ScrollView>
        {isLogin ? (
          <View
            style={[
              ms.width((windowWidth * 100) / 100),
              ms.height((windowHeight * 30) / 100),
              ms.aiJc('center'),
              ms.mgT(),
            ]}>
            <Image source={Profile} />
            <Text
              style={[
                colorScheme === 'dark'
                  ? ms.fzBC(13, '400', colors.white)
                  : ms.fzBC(13, '400', colors.black),
                ms.mgT(10),
              ]}>
              {user?.name}
            </Text>
            <Text
              style={[
                colorScheme === 'dark'
                  ? ms.fzBC(11, '400', colors.white)
                  : ms.fzBC(11, '400', colors.black),
              ]}>
              {user?.email}
            </Text>
          </View>
        ) : (
          <View
            style={[
              ms.width((windowWidth * 100) / 100),
              ms.height((windowHeight * 30) / 100),
              ms.aiJc('center'),
              ms.mgT(),
            ]}>
            <Image source={Profile} />
            <Text
              style={[
                colorScheme === 'dark'
                  ? ms.fzBC(12, '400', colors.white)
                  : ms.fzBC(12, '400', colors.black),
                ms.mgT(10),
              ]}>
              -
            </Text>
            <Text
              style={[
                colorScheme === 'dark'
                  ? ms.fzBC(10, '400', colors.white)
                  : ms.fzBC(10, '400', colors.black),
              ]}>
              -
            </Text>
          </View>
        )}

        <View
          style={[
            ms.width((windowWidth * 100) / 100),
            ms.height((windowHeight * 70) / 100),
            ms.mgH(20),
          ]}>
          <TouchableOpacity
            onPress={() => {
              goToWeb();
            }}
            style={[ms.row, ms.ai('center'), ms.pdV(10)]}>
            <Icon
              name="search-circle-outline"
              size={20}
              color={colorScheme === 'dark' ? colors.white : colors.black}
              style={[ms.width((windowWidth * 8) / 100)]}
            />
            <Text
              style={[
                colorScheme === 'dark'
                  ? ms.fzBC(12, '400', colors.white)
                  : ms.fzBC(12, '400', colors.black),
                ms.width((windowWidth * 78) / 100),
              ]}>
              Kunjungi Website
            </Text>
            <Icon
              name="chevron-forward"
              size={18}
              color={colorScheme === 'dark' ? colors.white : colors.black}
              style={[ms.width((windowWidth * 12) / 100), ms.pdR(20)]}
            />
          </TouchableOpacity>

          {isLogin ? (
            <TouchableOpacity
              onPress={() => {
                onLogout();
              }}
              style={[ms.row, ms.ai('center'), ms.pdV(10)]}>
              <Icon
                name="exit-outline"
                size={20}
                color={colorScheme === 'dark' ? colors.white : colors.black}
                style={[ms.width((windowWidth * 8) / 100)]}
              />
              <Text
                style={[
                  colorScheme === 'dark'
                    ? ms.fzBC(12, '400', colors.white)
                    : ms.fzBC(12, '400', colors.black),
                  ms.width((windowWidth * 78) / 100),
                ]}>
                Keluar
              </Text>
              <Icon
                name="chevron-forward"
                size={18}
                color={colorScheme === 'dark' ? colors.white : colors.black}
                style={[ms.width((windowWidth * 12) / 100), ms.pdR(20)]}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={[ms.row, ms.ai('center'), ms.pdV(10)]}>
              <Icon
                name="enter-outline"
                size={20}
                color={colorScheme === 'dark' ? colors.white : colors.black}
                style={[ms.width((windowWidth * 8) / 100)]}
              />
              <Text
                style={[
                  colorScheme === 'dark'
                    ? ms.fzBC(12, '400', colors.white)
                    : ms.fzBC(12, '400', colors.black),
                  ms.width((windowWidth * 78) / 100),
                ]}>
                Masuk
              </Text>
              <Icon
                name="chevron-forward"
                size={18}
                color={colorScheme === 'dark' ? colors.white : colors.black}
                style={[ms.width((windowWidth * 12) / 100), ms.pdR(20)]}
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
  },
});
