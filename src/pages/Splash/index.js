import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect } from 'react'
import { Logo, NewsmeterLogo } from '../../assets/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import { windowHeight, windowWidth } from '../../utils/ms/constant'
import { getData } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../redux/action'
import { getUser } from '../../redux/action/login'

const Splash = ({ navigation }) => {
const dispatch = useDispatch();
const {user} = useSelector(state => state.globalReducer);

    const init = () => {
        getData('authUser').then((resAuthUser) => {
            if (resAuthUser?.data.email){
                getData('preference').then(resPreference => {
                    if(resPreference === null){
                        AsyncStorage.clear();
                        dispatch(setLogin(false));
                        return navigation.reset({index: 0, routes: [{name: 'Login'}]}) 
                    } else {
                        return navigation.reset({index: 0, routes: [{name: 'MainApp'}]}) 
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
                    }
                  })
            } else {
                return navigation.reset({index: 0, routes: [{name: 'Login'}]})
            }
        })
    }
    useEffect(() => {
        if(navigation?.isFocused()){
            setTimeout(() => {
                // navigation.replace('Login');
                init();
            }, 2000)
        }
        return () => {};
    }, [navigation]);

  return (
    <View style={styles.background}>
        <Image source={NewsmeterLogo} style={styles.logo}/>
    </View>   
  )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#0072BC',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: (windowWidth*25)/100,
        height: (windowHeight*10)/100
    }
})