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
  useColorScheme
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {ImageDefault, Logo, Point, SportImg} from '../../assets/images';
import RenderHTML from 'react-native-render-html';
import { Linking } from 'react-native';
import { useState } from 'react';

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
  const colorScheme = useColorScheme();
  useEffect(() => {
    console.log(colorScheme);
  }, [colorScheme]);

  const [htmlData, setHtmlData] = useState('');
  const {news} = useSelector(state => state.newsReducer);
  const {width : contentWidth} = ms.width((windowWidth * 90) / 100);
  
  const removeImg = (htmlAttribs, children, convertedCSSStyles, passProps) => {
    return null;
  }
  const renderers = {
    img: removeImg,
  }
  const baseStyle = {
    color : colorScheme === 'dark' ? colors.white : colors.grey_dark
  }
  const source = {
    html: news?.content
  }

  const OpenURLButton = ({url}) => {
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
  
    return <TouchableOpacity onPress={handlePress}><Text style={[colorScheme === 'dark' ? ms.fzBC(12, '500', colors.blue_dark) : ms.fzBC(12, '500', colors.blue), ms.width((windowWidth * 75) / 100),]}> {news?.original}</Text></TouchableOpacity>;
  };

  return (

    <SafeAreaView style={[colorScheme === 'dark' ? styles.containerPageD : ms.containerPage]}>
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
            <Text style={[
              colorScheme === 'dark' ?
              ms.fzBCLh(18, '700', colors.white, 19) :
              ms.fzBCLh(18, '700', colors.black, 19)]}>
              {news?.title}
            </Text>
          </View>

          <View style={[ms.row, ms.mgT(10)]}>
              <View style={[ms.mgL(20),]}>
                <Text style={[
                  colorScheme === 'dark' ?
                  ms.fzBC(12, '500', colors.blue_dark) : ms.fzBC(12, '500', colors.blue)]}>
                  {news?.kategori}
                </Text>
              </View>
            <View style={[ms.width((windowWidth * 50) / 100), ms.row]}>
            <Icon2
                  name='dot-single'
                  size={12}
                  color={colorScheme === 'dark' ? colors.white : colors.black}
                  style={[ ms.mgH(3)]}
                />
                <Text style={[
                  colorScheme === 'dark' ?
                  ms.fzBC(12, '400', colors.white) : ms.fzBC(12, '400', colors.black)]}>
                  {news?.date}
                </Text>
              </View>
          </View>
        </View>

        {/* Content */}
        <View
          style={[
            ms.mgT(20),
            ms.aiJc('center'),
            ms.width((windowWidth * 100) / 100),
          ]}>

          {news?.image !== null ? (
            <View style={[ms.mgB(20)]}>
            <Image
              source={{uri: news?.image}}
              style={[ms.width((windowWidth * 90) / 100),
              ms.height((windowHeight * 30) / 100),]}
            />
          </View>
          ) : (
            <View style={[ms.mgB(20)]}>
            <Image
              source={ImageDefault}
              style={[ms.width((windowWidth * 90) / 100),
              ms.height((windowHeight * 30) / 100),]}
            />
          </View>
          )}

          <View style={[ms.width((windowWidth * 90) / 100), ms.jc('center')]}>
            <RenderHTML source={source} contentWidth={contentWidth} renderers={renderers} baseStyle={baseStyle} />
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
          <Text style={[
            colorScheme === 'dark' ?
            ms.fzBC(12, '500', colors.white) : ms.fzBC(12, '500', colors.grey_dark)]}>Sumber : </Text>
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
    justifyContent: 'flex-start'
  },
  background: {
    // width: (windowWidth * 70) / 100,
    // height: (windowHeight * 6) / 100,
    paddingVertical: 5,
    justifyContent: 'center'
  },
  back: {
    width: (windowWidth * 35) / 100,
  },
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
  }
});
