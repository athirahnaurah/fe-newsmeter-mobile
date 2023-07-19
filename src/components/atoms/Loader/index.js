import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'

const Loader = ({isVisible = false, theme}) => {
  const {width, height} = useWindowDimensions();
    return isVisible && 
    <View style={[
        theme === 'dark'
                ? styles.containerD
                : styles.container,
        , {height, width}]}>
        <View style={[
            theme === 'dark'
            ? styles.loaderD
            : styles.loader]}>
            <ActivityIndicator size="large" color={
                theme === 'dark'
                ? colors.white
                : colors.blue} />
        </View>
    </View>
}

export default Loader

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0,5)',
        justifyContent: 'center'
    },
    containerD:{
        position:'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0,5)',
        justifyContent: 'center'
    },
    loader: {
       height: 65,
       backgroundColor: colors.white,
        marginHorizontal: 160,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    loaderD: {
        height: 65,
        backgroundColor: colors.black_dark,
         marginHorizontal: 160,
         borderRadius: 5,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
         paddingHorizontal: 20
     }
})