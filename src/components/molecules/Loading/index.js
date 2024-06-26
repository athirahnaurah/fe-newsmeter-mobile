import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../../../utils';
import { windowHeight, windowWidth } from '../../../utils/ms/constant';

const Loading = ({position= 'absolute',backgroundColor='rgba(0,0,0,0.1)', size='large',height=50, icon}) => {
    return (
      <View style={styles.container(position, backgroundColor,height)}>
          <View style={styles.modal}>
            {
              !icon && (
                <ActivityIndicator size={size} color={colors.primary} />
              )
            }
            <Text>Memuat...</Text>

          </View>
      </View>
    );
  };
  
  export default Loading;
  
  const styles = StyleSheet.create({
    container: (position, backgroundColor, height)=>({
      
      position: position,
      height: height,
      flex: 1,
      backgroundColor: backgroundColor,
      width: windowWidth,
      height: windowHeight,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    modal:{
      width: 50,
      height: 50,
      borderRadius: 5,
      opacity: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors?.silverWhite,
    },
    text: {
      fontSize: 18,
      marginTop: 12,
    },
  });