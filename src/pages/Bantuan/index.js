import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../../utils/ms/constant';
import { Logo } from '../../assets';
import TentangKami from '../TentangKami';

const Bantuan = ({navigation}) => {
  const colorScheme = useColorScheme();

  const sendEmailButton = () => {
    const emailAddress = 'newsmeterid@gmail.com';
    const subject = 'Pertanyaan Tentang Aplikasi';
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}`;
    Linking.openURL(mailtoUrl)
      .then(() => console.log('Email app opened'))
      .catch(err => console.error('Error opening email', err));
  };

  return (
    <SafeAreaView
      style={[
        colorScheme === 'dark' ? styles.containerPageD : ms.containerPage,
      ]}>
      {/* Header */}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}>
          <Icon1
            name="arrowleft"
            size={22}
            color={colors.white}
            style={[ms.mgL(20)]}
          />
        </TouchableOpacity>

        <View style={[styles.background]}>
          <Image source={Logo} />
        </View>
      </View>

      <View
        style={[
          ms.width((windowWidth * 100) / 100),
          ms.height((windowHeight * 70) / 100),
          ms.mgH(20),
        ]}>
        <TouchableOpacity
          onPress={() => {navigation.navigate("HubungiKami")}}
          style={[ms.row, ms.ai('center'), ms.pdV(10)]}>
          <Icon
            name="people"
            size={20}
            color={colorScheme === 'dark' ? colors.white : colors.black}
            style={[ms.width((windowWidth * 8) / 100)]}
          />
          <Text
            style={[
              colorScheme === 'dark'
                ? ms.fzBC(13, '400', colors.white)
                : ms.fzBC(13, '400', colors.black),
              ms.width((windowWidth * 78) / 100),
            ]}>
            Hubungi Kami
          </Text>
          <Icon
            name="chevron-forward"
            size={18}
            color={colorScheme === 'dark' ? colors.white : colors.black}
            style={[ms.width((windowWidth * 12) / 100), ms.pdR(20)]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {navigation.navigate("TentangKami")}}
          style={[ms.row, ms.ai('center'), ms.pdV(10)]}>
          <Icon
            name="information-circle-outline"
            size={20}
            color={colorScheme === 'dark' ? colors.white : colors.black}
            style={[ms.width((windowWidth * 8) / 100)]}
          />
          <Text
            style={[
              colorScheme === 'dark'
                ? ms.fzBC(13, '400', colors.white)
                : ms.fzBC(13, '400', colors.black),
              ms.width((windowWidth * 78) / 100),
            ]}>
            Tentang Kami
          </Text>
          <Icon
            name="chevron-forward"
            size={18}
            color={colorScheme === 'dark' ? colors.white : colors.black}
            style={[ms.width((windowWidth * 12) / 100), ms.pdR(20)]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Bantuan;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#346CB3',
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth * 100) / 100,
        height: (windowHeight * 6) / 100,
        flexDirection: 'row',
        // justifyContent: 'flex-start'
      },
      background: {
        justifyContent: 'center',
        // paddingVertical: 5
        width: (windowWidth * 70) / 100,
        height: (windowHeight * 6) / 100,
      },
      back: {
        width: (windowWidth * 35) / 100,
      },
      containerPageD: {
        backgroundColor: '#131313',
        flex: 1,
      },
});
