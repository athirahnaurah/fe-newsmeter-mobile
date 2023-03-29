import {StyleSheet, Text, TouchableOpacity} from 'react-native';
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

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === "Beranda")
      return isFocused ? <IconBeranda /> : <IconBerandaOutline />
    if (label === "Jelajah")
      return isFocused ? <IconJelajahOutline /> : <IconJelajah />
    if (label === "Untukmu")
      return isFocused ? <IconUntukmu /> : <IconUntukmuOutline />
    if (label === "Profil")
      return isFocused ? <IconProfil /> : <IconProfilOutline />

    return <IconBerandaOutline />
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.item}>
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
    item: {
        alignItems: 'center'
    },
    text: (isFocused) => ({
        fontSize: 12,
        color: isFocused ? '#fff' : '#fff',
        fontWeight: isFocused ? '600' : '400',
        marginTop: 3
    })
});
