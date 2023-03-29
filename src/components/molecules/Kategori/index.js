import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils';
import ms from '../../../utils/ms';
import {windowHeight, windowWidth} from '../../../utils/ms/constant';
import {IconEkonomi, IconHiburan, IconNasional} from '../../../assets';

const Kategori = ({kategori, ops, onPress}) => {
  const [isclicked, setClicked] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.box,
        {backgroundColor: isclicked ? colors.blue : colors.lightblue},
      ]}
      onPress={onPress}
      // onLongPress={() => {
      //   setClicked(!isclicked);
      // }}
      >
      <View>
        <Image source={kategori?.icon} style={[ms.width(20), ms.height(20)]} />
      </View>
      <Text style={[ms.fzBC(13, '400', colors.grey), {color: isclicked ? colors.white : colors.grey}]}>{kategori?.name}</Text>
    </TouchableOpacity>
  );
};

export default Kategori;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.black,
    paddingLeft: 20,
  },
  box: {
    width: (windowWidth * 39) / 100,
    height: (windowHeight * 8) / 100,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    // backgroundColor: colors.lightblue,
    borderRadius: 10,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
  },
});

{
  /* <View>
        {kategori?.id > 7 && (
          <TouchableOpacity style={[styles.cardInput]} onPress={onPress}>
            <Image source={kategori?.icon} style={[ms.wh('10%')]} />
            <Text>{kategori?.name}</Text>
          </TouchableOpacity>
        )}
      </View> */
}

{
  /* <TouchableOpacity style={[styles.cardInput]} onPress={onPress}>
        <IconNasional style={[ms.wh('10%')]} />
        <Text>Nasional</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.cardInput]} onPress={onPress}>
        <IconEkonomi style={[ms.wh('10%')]} />
        <Text>Ekonomi</Text>
      </TouchableOpacity> */
}
