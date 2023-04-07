import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils';
import ms from '../../../utils/ms';
import {windowHeight, windowWidth} from '../../../utils/ms/constant';
// import {IconEkonomi, IconHiburan, IconNasional} from '../../../assets';
import { useSelector } from 'react-redux';
import {
  IconBola,
  IconEkonomi,
  IconHiburan,
  IconKesehatan,
  IconKuliner,
  IconMetropolitan,
  IconNasional,
  IconNews,
  IconOtomotif,
  IconPolitik,
  IconRegional,
  IconSport,
  IconTekno,
  IconTravel,
} from '../../../assets';

const Kategori = ({kategori, ops, onPress}) => {
  const [isclicked, setClicked] = useState(false);
  const {newsList} = useSelector(state => state.newsReducer);

  const [listkategori, setListKategori] = useState([
      {
        id: 1,
        name: 'Politik',
        icon: IconPolitik,
      },
      {
        id: 2,
        name: 'Nasional',
        icon: IconNasional,
      },
      {
        id: 3,
        name: 'Metropolitan',
        icon: IconMetropolitan,
      },
      {
        id: 4,
        name: 'Regional',
        icon: IconRegional,
      },
      {
        id: 5,
        name: 'News',
        icon: IconNews,
      },
      {
        id: 6,
        name: 'Ekonomi',
        icon: IconEkonomi,
      },
      {
        id: 7,
        name: 'Hiburan',
        icon: IconHiburan,
      },
      {
        id: 8,
        name: 'Tekno',
        icon: IconTekno,
      },
      {
        id: 9,
        name: 'Sport',
        icon: IconSport,
      },
      {
        id: 10,
        name: 'Otomotif',
        icon: IconOtomotif,
      },
      {
        id: 11,
        name: 'Travel',
        icon: IconTravel,
      },
      {
        id: 12,
        name: 'Kuliner',
        icon: IconKuliner,
      },
      {
        id: 13,
        name: 'Kesehatan',
        icon: IconKesehatan,
      },
      {
        id: 14,
        name: 'Bola',
        icon: IconBola,
      },
    ])

  const onClick = (kategori) => {
    // if(kategori == )
  }

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
      {/* <View>
        <Image source={kategori?.icon} style={[ms.width(20), ms.height(20)]} />
      </View> */}
      <Text style={[ms.fzBC(13, '600', colors.greyDark), {color: isclicked ? colors.white : colors.greyDark}]}>{listkategori?.name}</Text>
    </TouchableOpacity>
  );
};
// {color: isclicked ? colors.white : colors.grey}]}
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
    justifyContent: 'center'
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
