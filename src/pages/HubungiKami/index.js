import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import ms from '../../utils/ms';
import {Logo} from '../../assets';
import {colors} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {Gap} from '../../components';

const HubungiKami = ({navigation}) => {
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
        ms.height(windowHeight * 100) / 100,
      ]}>
      <ScrollView>
        <View
          style={[ms.bc(colors.primary), ms.height(windowHeight * 15) / 100]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={[styles.back]}>
            <Icon
              name="arrowleft"
              size={22}
              color={colors.white}
              style={[ms.mgL(10), ms.mgT(10)]}
            />
          </TouchableOpacity>

          <View
            style={[
              ms.height((windowHeight * 13) / 100),
              ms.aiJc('center'),
              ms.bdRBLR(10),
              ms.bdRBRR(10),
            ]}>
            <Image source={Logo} style={[]} />
          </View>
        </View>

        <View style={[ms.mgH(20)]}>
          <View>
            <Text
              style={[
                ms.mgT(10),
                ms.fzBC(
                  15,
                  '400',
                  colorScheme === 'dark' ? colors.white : colors.black,
                ),
              ]}>
              PT Ganesha Digital Solusi
            </Text>
          </View>
          
          <View style={[ms.mgT(15), ms.mgB(15)]}>
          <Gap
              width={(windowWidth * 90) / 100}
              height={1}
              backgroundColor={
                colorScheme === 'dark' ? colors.white : colors.grey
              }
            />
          </View>
          

          <View>
            <Text
              style={[
                ms.fzBC(
                  14,
                  '400',
                  colorScheme === 'dark' ? colors.white : colors.black,
                ),
              ]}>
              Email
            </Text>

            <TouchableOpacity onPress={sendEmailButton}>
              <Text style={[styles.textStyle]}>newsmeterid@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HubungiKami;

const styles = StyleSheet.create({
  back: {
    width: (windowWidth * 35) / 100,
  },
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
  },
  cardItem: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: (windowWidth * 90) / 100,
    // height: (windowHeight * 70) / 100,
  },
  item: {
    width: '50%',
  },
  textStyle: {
    marginTop: 4,
    textDecorationLine: 'underline',
    fontSize: 13,
    fontWeight: '450',
    color: colors.grey_dark,
  },
});
