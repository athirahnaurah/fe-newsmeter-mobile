import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect } from 'react'
import { Logo } from '../../assets/images'
import { SafeAreaView } from 'react-native-safe-area-context'

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 2000)
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
        
    }
})