import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect } from 'react'
import { Logo } from '../../assets/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import { windowHeight, windowWidth } from '../../utils/ms/constant'
import { getData } from '../../utils'

const Splash = ({ navigation }) => {

    const init = () => {
        getData('authUser').then((resAuthUser) => {
            if (resAuthUser?.data.email){
                return navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
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
        <Image source={Logo} style={styles.logo}/>
    </View>   
  )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#346CB3',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: (windowWidth*50)/100,
        height: (windowHeight*4)/100
    }
})