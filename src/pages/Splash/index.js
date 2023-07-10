import {StyleSheet, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../assets/images';
import {getData} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../../redux/action';

// Splash Screen

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.globalReducer);
  const init = () => {
    // if (user.length !== 0) {
    // return navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    getData('authUser').then(resAuthUser => {
      if (resAuthUser?.data.email) {
        getData('preference').then(resPreference => {
          if (resPreference === null) {
            AsyncStorage.clear();
            dispatch(setLogin(false));
            return navigation.reset({index: 0, routes: [{name: 'Login'}]});
          } else {
            return navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
          }
          // getData('authUser').then(resAuthUser => {
          //     if (resAuthUser?.data.email) {
          //       getData('token').then(resAuth => {
          //         dispatch(getUser(resAuth, navigation));
          //       });
          //       if (user !== 'undefined') {
          //         return navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
          //       }
          //     }
          //   });
        });
      } else {
        return navigation.reset({index: 0, routes: [{name: 'Login'}]});
      }
    });
    // } else {
    //   dispatch(setLogin(false));
    //   return navigation.reset({index: 0, routes: [{name: 'Login'}]});
    // }
  };

  useEffect(() => {
    if (navigation?.isFocused()) {
      setTimeout(() => {
        // navigation.replace('Login');
        init();
      }, 3000);
    }
    return () => {};
  }, [navigation]);

  return (
    <View style={styles.background}>
      <Image source={Logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#346CB3',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
