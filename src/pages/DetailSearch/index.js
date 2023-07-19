import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {Logo, Point, SportImg} from '../../assets/images';
import RenderHTML from 'react-native-render-html';
import {Linking} from 'react-native';
import {useEffect} from 'react';
import {getNewsById} from '../../redux/action/news';

// News Detail Page for Search Result

const DetailSearch = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {search} = useSelector(state => state.newsReducer);
  const {width: contentWidth} = ms.width((windowWidth * 90) / 100);
  const colorScheme = useColorScheme();
  const {news, newsbyid} = useSelector(state => state.newsReducer);
  const {isLoadingScreen, isLogin} = useSelector(state => state.globalReducer);

  useEffect(() => {
    console.log(colorScheme);
    if (navigation.isFocused) {
      init();
    }
  }, [colorScheme]);

  // Initialize req. API
  const init = () => {
    dispatch(getNewsById(search?._id));
  };
  // remove image
  const removeImg = (htmlAttribs, children, convertedCSSStyles, passProps) => {
    return null;
  };

  // call remove image
  const renderers = {
    img: removeImg,
  };

  // theme for news content
  const baseStyle = {
    color: colorScheme === 'dark' ? colors.white : colors.grey_dark,
  };

  // show html content
  const source = {
    html: search?.content,
  };

  // Open url news source
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

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text
          style={[
            ms.fzBC(12, '400', colors.blue),
            ms.width((windowWidth * 75) / 100),
          ]}>
          {' '}
          {search?.original}
        </Text>
      </TouchableOpacity>
    );
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
            <Image source={Logo} />
          </View>
        </View>

        {isLoadingScreen ? (
          <ActivityIndicator
            color={colorScheme === 'dark' ? colors.white : colors.black}
            style={{margin: 5}}
          />
        ) : (
          <View>
            <NewsDetail news={newsbyid} theme={colorScheme} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailSearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#346CB3',
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 6) / 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  background: {
    // width: (windowWidth * 70) / 100,
    // height: (windowHeight * 6) / 100,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  back: {
    width: (windowWidth * 35) / 100,
  },
});
