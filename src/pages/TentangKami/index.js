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

const TentangKami = ({navigation}) => {
  const colorScheme = useColorScheme();
  const {mediaList} = useSelector(state => state.mediaReducer);

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

        <View style={[ms.height(windowHeight * 65) / 100]}>
          <View>
            <Text
              style={[
                ms.txA('justify'),
                ms.mgT(10),
                ms.mgH(20),
                ms.fzBC(
                  15,
                  '400',
                  colorScheme === 'dark' ? colors.white : colors.black,
                ),
              ]}>
              Newsmeter mengambil berita dari 92 sumber media terpercaya untuk
              memastikan Anda mendapatkan informasi yang komprehensif dan
              perspektif yang beragam dan berimbang dalam setiap topik yang Anda
              minati. Anda bisa yakin mendapatkan berita yang akurat dan
              terkini. Aplikasi ini adalah teman setia dalam menjelajahi dunia
              berita, politik, ekonomi, hiburan, dan banyak lagi. Nikmati berita
              dari berbagai sumber tepercaya, semuanya dalam satu tempat yang
              nyaman di ponsel Anda.
            </Text>
          </View>

          <View style={[ms.row]}>
            <Text
              style={[
                ms.txA('justify'),
                ms.mgT(10),
                ms.mgH(20),
                ms.fzBC(
                  15,
                  '400',
                  colorScheme === 'dark' ? colors.white : colors.black,
                ),
              ]}>
              Merekomendasikan berita yang sesuai dengan minat dan preferensi
              Anda. Berdasarkan apa yang Anda baca, aplikasi ini akan memahami
              preferensi Anda dan memberikan rekomendasi yang lebih tepat.
            </Text>
          </View>

          <View>
            <Text
              style={[
                ms.txA('justify'),
                ms.mgT(10),
                ms.mgH(20),
                ms.fzBC(
                  15,
                  '400',
                  colorScheme === 'dark' ? colors.white : colors.black,
                ),
              ]}>
              Memberikan rekomendasi berita yang paling relevan dengan apa yang
              Anda baca sebelumnya. Ini adalah aplikasi yang belajar dari Anda.
            </Text>
          </View>

          <View>
            <Text
              style={[
                ms.txA('justify'),
                ms.mgT(10),
                ms.mgH(20),
                ms.fzBC(
                  15,
                  '400',
                  colorScheme === 'dark' ? colors.white : colors.black,
                ),
              ]}>
              Memberikan akses ke berita nasional dari berbagai sumber
              terpercaya sehingga Anda dapat tetap terinformasi tentang
              perkembangan nasional.
            </Text>
          </View>

          <View style={[ms.row]}>
            <Text
              style={[
                ms.txA('justify'),
                ms.mgT(10),
                ms.mgH(20),
                ms.fzBC(
                  15,
                  '400',
                  colorScheme === 'dark' ? colors.white : colors.black,
                ),
              ]}>
              Newsmeter merupakan aplikasi agregator berita milik PT Ganesha
              Digital Solusi yang bergerak dalam bidang konsultan IT yang fokus
              pada Custom Software Development. 7 Tahun pengalaman di Industri
              IT, PT Ganesha Digital Solusi telah membuktikan komitmenya untuk
              memberi solusi IT secara tepat cepat terukur dan inovatif.
            </Text>
          </View>

          <View style={[ms.row]}>
            <Text
              style={[
                ms.txA('justify'),
                ms.mgT(10),
                ms.mgH(20),
                ms.fzBC(
                  15,
                  '400',
                  colorScheme === 'dark' ? colors.white : colors.black,
                ),
              ]}>
              Kami menghadirkan berita dari puluhan sumber media terpecaya,
              seperti :
            </Text>
          </View>

          <View style={[styles.cardItem]}>
            {mediaList?.map((media, index) => (
              <View key={index} style={[styles.item]}>
                <View style={[ms.row, ms.ai('center')]}>
                  <Icon1 name="circle" size={5} color={colorScheme === 'dark' ? colors.white : colors.black_dark} />
                  <Text
                    style={[
                      colorScheme === 'dark'
                        ? ms.fzBCLh(14, '650', colors.white, 17)
                        : ms.fzBCLh(14, '650', colors.black_dark, 17),
                      ms.mgL(4),
                    ]}>
                    {media.name}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default TentangKami;

const styles = StyleSheet.create({
  back: {
    width: (windowWidth * 35) / 100,
  },
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
  },
  cardItem: {
    margin: 20,
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
});
