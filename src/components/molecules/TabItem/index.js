import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import {
  IconBeranda,
  IconBerandaOutline,
  IconJelajah,
  IconJelajahOutline,
  IconLineBar,
  IconProfil,
  IconProfilOutline,
  IconUntukmu,
  IconUntukmuOutline,
} from '../../../assets';

const IconApp = ({label, isFocused}) => {
  if (label === 'Beranda') {
    return isFocused ? (
      <Image
        // animation="rubberBand"
        // // duration={1000}
        // resizeMode="contain"
        source={IconBeranda}
        style={{width: 22, height: 22}}
      />
    ) : (
      <Image
        // animation="rubberBand"
        // // duration={1000}
        // resizeMode="contain"
        source={IconBerandaOutline}
        style={{width: 22, height: 22}}
      />
    );
  }
  if (label === 'Jelajah') {
    return isFocused ? (
      <Image
        // animation="rubberBand"
        // // duration={1000}
        // resizeMode="contain"
        source={IconJelajah}
        style={{width: 22, height: 22}}
      />
    ) : (
      <Image
        // animation="rubberBand"
        // // duration={1000}
        // resizeMode="contain"
        source={IconJelajahOutline}
        style={{width: 22, height: 22}}
      />
    );
  }
  if (label === 'Untukmu') {
    return isFocused ? (
      <Image
        // animation="rubberBand"
        // // duration={1000}
        // resizeMode="contain"
        source={IconUntukmu}
        style={{width: 22, height: 22}}
      />
    ) : (
      <Image
        // animation="rubberBand"
        // // duration={1000}
        // resizeMode="contain"
        source={IconUntukmuOutline}
        style={{width: 22, height: 22}}
      />
    );
  }
  if (label === 'Profil') {
    return isFocused ? (
      <Image
        // animation="rubberBand"
        // // duration={1000}
        // resizeMode="contain"
        source={IconProfil}
        style={{width: 22, height: 22}}
      />
    ) : (
      <Image
        // animation="rubberBand"
        // // duration={1000}
        // resizeMode="contain"
        source={IconProfilOutline}
        style={{width: 22, height: 22}}
      />
    );
  }

  return <Image
      animation="rubberBand"
      // duration={1000}
      resizeMode="contain"
      source={IconBerandaOutline}
      style={{width: 22, height: 22}}
    />;
};
const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.item}>
      <View>
      <IconApp label={label} isFocused={isFocused} />
      </View>
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  text: isFocused => ({
    fontSize: 10,
    color: isFocused ? '#fff' : '#fff',
    fontWeight: isFocused ? '700' : '400',
    marginTop: 3,
  }),
});
