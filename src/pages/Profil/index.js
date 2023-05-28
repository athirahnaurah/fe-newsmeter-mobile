import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
// import BackgroundService from 'react-native-background-actions';

const Profil = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.globalReducer);
  const {isLogin} = useSelector(state => state.globalReducer);
  // console.log('user: ', user);

  const init = async () => {
    getData('token').then(resAuth => {
      dispatch(getUser(resAuth, navigation));
    });
    // getData('authUser').then(resAuthUser => {
    //   if (resAuthUser?.data.email) {
    //     getData('token').then(resAuth => {
    //       dispatch(getUser(resAuthUser?.data.email, resAuth));
    //     });
    //   }
    // });
  };

  const onLogout = async () => {
    AsyncStorage.clear();
    // navigation.navigate('Splash')
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
    // await BackgroundService.stop();
    // console.log('[Save Recommendation] dibatalkan',)
    // dispatch(logoutAction(navigation));
    // getData('authUser').then(resAuthUser => {
    //   if(resAuthUser?.data.email){
    //     dispatch(logoutAction(navigation));
    //   }})
  };

  useEffect(() => {
    if (navigation.isFocused) {
      init();
    }
  }, [navigation]);

  return (
    <SafeAreaView style={[ms.containerPage]}>
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
            <Text style={[ms.fzBC(12, '400', colors.black), ms.mgT(10)]}>
              {user?.name}
            </Text>
            <Text style={[ms.fzBC(10, '400', colors.black)]}>
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
            <Text style={[ms.fzBC(12, '400', colors.black), ms.mgT(10)]}>
              -
            </Text>
            <Text style={[ms.fzBC(10, '400', colors.black)]}>-</Text>
          </View>
        )}

        <View
          style={[
            ms.width((windowWidth * 100) / 100),
            ms.height((windowHeight * 70) / 100),
            ms.mgH(20),
          ]}>
          <Text style={[ms.fzBC(14, '600', colors.black), ms.mgB(10)]}>
            Pengaturan
          </Text>
          <TouchableOpacity
            onPress={() => {}}
            style={[ms.row, ms.ai('center'), ms.pdV(10)]}>
            <Icon
              name="search-circle-outline"
              size={20}
              color={colors.black}
              style={[ms.width((windowWidth * 8) / 100)]}
            />
            <Text
              style={[
                ms.fzBC(12, '400', colors.black),
                ms.width((windowWidth * 78) / 100),
              ]}>
              Kunjungi Website
            </Text>
            <Icon
              name="chevron-forward"
              size={18}
              color={colors.black}
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
                color={colors.black}
                style={[ms.width((windowWidth * 8) / 100)]}
              />
              <Text
                style={[
                  ms.fzBC(12, '400', colors.black),
                  ms.width((windowWidth * 78) / 100),
                ]}>
                Keluar
              </Text>
              <Icon
                name="chevron-forward"
                size={18}
                color={colors.black}
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
                color={colors.black}
                style={[ms.width((windowWidth * 8) / 100)]}
              />
              <Text
                style={[
                  ms.fzBC(12, '400', colors.black),
                  ms.width((windowWidth * 78) / 100),
                ]}>
                Masuk
              </Text>
              <Icon
                name="chevron-forward"
                size={18}
                color={colors.black}
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

const styles = StyleSheet.create({});
