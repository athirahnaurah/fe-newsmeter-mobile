import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Button,
  Alert,
} from 'react-native';
import React, { useCallback } from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {Logo, Point, SportImg} from '../../assets/images';
import RenderHTML from 'react-native-render-html';
import { Linking } from 'react-native';

const DetailBerita = ({navigation}) => {
  // const tagsStyles = {
  //   a: {
  //     textDecorationLine: 'none',
  //   },
  // };

  // function contentDisplay(html){
  //   const {width : contentWidth} = useWindowDimensions();
  //   return(
  //     <RenderHTML 
  //       contentWidth={contentWidth}
  //       source={html}
  //       tagsStyles={tagsStyles}
  //     />
  //   ) 
  // } 

  const {news} = useSelector(state => state.newsReducer);
  const {width : contentWidth} = ms.width((windowWidth * 90) / 100);
  const source = {
    html: news?.content
  }

  const OpenURLButton = ({url, node}) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.openURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <TouchableOpacity onPress={handlePress}><Text style={[ms.fzBC(12, '400', colors.blue), ms.width((windowWidth * 75) / 100),]}> {news?.original}</Text></TouchableOpacity>;
  };

  return (

    <SafeAreaView style={[ms.containerPage]}>
      <ScrollView>
        {/* Header */}
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.back}>
            <Icon
              name="arrowleft"
              size={24}
              color={colors.white}
              style={[ms.mgL(20)]}
            />
          </TouchableOpacity>

          <View style={[styles.background]}>
            <Image source={Logo}  />
          </View>
        </View>

        {/* Title */}
        <View
          style={[
            ms.width((windowWidth * 100) / 100),
          ]}>
          <View
            style={[
              ms.width((windowWidth * 90) / 100),
              ms.jc('center'),
              ms.mgT(12),
              ms.pdH(20),
            ]}>
            <Text style={[ms.fzBCLh(18, '700', colors.black, 19)]}>
              {news?.title}
            </Text>
          </View>

          <View style={[ms.row, ms.mgT(10)]}>
              <View style={[ms.mgL(20),]}>
                <Text style={[ms.fzBC(12, '500', colors.blue)]}>
                  {news?.kategori}
                </Text>
              </View>
            <View style={[ms.width((windowWidth * 50) / 100), ms.row]}>
                <Image source={Point} style={[ms.mgT(7), ms.mgH(10)]} />
                <Text style={[ms.fzBC(12, '400', colors.black)]}>
                  {news?.date}
                </Text>
              </View>
          </View>
        </View>

        {/* Content */}
        {/* https://medium.com/@nutanbhogendrasharma/how-to-display-html-content-in-react-native-mobile-app-b43cfda8325 */}
        <View
          style={[
            ms.mgT(20),
            ms.aiJc('center'),
            ms.width((windowWidth * 100) / 100),
          ]}>
          <View style={[ms.mgB(20)]}>
            <Image
              source={{uri : news?.image}}
              style={[
                ms.width((windowWidth * 90) / 100),
                ms.height((windowHeight * 30) / 100),
              ]}
            />
          </View>
          <View style={[ms.width((windowWidth * 90) / 100), ms.jc('center')]}>
            <RenderHTML source={source} contentWidth={contentWidth}/>
        
          </View>
        </View>

        {/* Sumber */}
        <View
          style={[
            ms.mgT(20),
            ms.pdH(20),
            ms.row,
            ms.ai('center'),
            ms.width((windowWidth * 100) / 100),
            ms.height((windowHeight * 10) / 100),

          ]}>
          <Text style={[ms.fzBC(12, '400', colors.black)]}>Sumber : </Text>
          <OpenURLButton url={news?.original}>link</OpenURLButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBerita;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#346CB3',
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 6) / 100,
    flexDirection: 'row',
  },
  background: {
    width: (windowWidth * 70) / 100,
    height: (windowHeight * 6) / 100,
    justifyContent: 'center'
  },
  back: {
    width: (windowWidth * 35) / 100,
  },
});
