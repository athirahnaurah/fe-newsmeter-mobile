import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {windowHeight, windowWidth} from '../../../utils/ms/constant';
import {colors} from '../../../utils';
import ms from '../../../utils/ms';
import Share from 'react-native-share';
import RenderHTML from 'react-native-render-html';
import {useCallback} from 'react';
import {Linking} from 'react-native';

const NewsDetail = ({news, theme}) => {
  const {width: contentWidth} = ms.width((windowWidth * 90) / 100);

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
    color: theme === 'dark' ? colors.white : colors.grey_dark,
  };

  // show html content
  const sourceContent = {
    html: news?.content,
  };

  // open url news source
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

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text
          style={[
            theme === 'dark'
              ? ms.fzBC(12, '500', colors.blue_dark)
              : ms.fzBC(12, '500', colors.blue),
            ms.width((windowWidth * 75) / 100),
          ]}>
          {' '}
          {news?.original}
        </Text>
      </TouchableOpacity>
    );
  };

  // share button
  const customShare = async (id) => {
    const shareUrl = news?.original;

    const shareOptions = {
      message: news?.title,
      url: shareUrl
    };

    try {
      await Share.open(shareOptions);
    } catch (err) {
      console.log('Error : ', err);
    }
  };
  
  return (
    <ScrollView>
      {/* Title */}
      <View style={[ms.width((windowWidth * 100) / 100)]}>
        <View
          style={[
            ms.width((windowWidth * 90) / 100),
            ms.jc('center'),
            ms.mgT(12),
            ms.pdH(20),
          ]}>
          <Text
            style={[
              theme === 'dark'
                ? ms.fzBCLh(18, '700', colors.white, 19)
                : ms.fzBCLh(18, '700', colors.black, 19),
            ]}>
            {news?.title}
          </Text>
        </View>

        {/* News Information */}
        <View
          style={[
            ms.row,
            ms.mgT(10),
            ms.ai('flex-start'),
            ms.jc('space-between'),
            ms.mgR(20),
            ms.height((windowHeight * 4) / 100),
            ms.width((windowWidth * 90) / 100),
          ]}>
          <View style={[ms.row, ms.width((windowWidth * 83) / 100),]}>
            <View style={[ms.mgL(20)]}>
              <Text
                style={[
                  theme === 'dark'
                    ? ms.fzBC(12, '500', colors.blue_dark)
                    : ms.fzBC(12, '500', colors.blue),
                ]}>
                {news?.kategori}
              </Text>
            </View>
            <View style={[ms.row]}>
              <Icon2
                name="dot-single"
                size={12}
                color={theme === 'dark' ? colors.white : colors.black}
                style={[ms.mgH(3)]}
              />
              <Text
                style={[
                  theme === 'dark'
                    ? ms.fzBC(12, '400', colors.white)
                    : ms.fzBC(12, '400', colors.black),
                ]}>
                {news?.date}
              </Text>
            </View>
          </View>
          <View
            style={[
              ms.row,
              ms.ai('center'),
            ]}>
            <Text
              style={[
                theme === 'dark'
                  ? ms.fzBC(12, '400', colors.white)
                  : ms.fzBC(12, '400', colors.black),
              ]}>
              Views : {news?.views}
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View
        style={[
          ms.mgT(10),
          ms.aiJc('center'),
          ms.width((windowWidth * 100) / 100),
        ]}>
        {news?.image !== null ? (
          <View style={[ms.mgB(20)]}>
            <Image
              source={{uri: news?.image}}
              style={[
                ms.width((windowWidth * 90) / 100),
                ms.height((windowHeight * 30) / 100),
              ]}
            />
          </View>
        ) : (
          <View style={[ms.mgB(20)]}>
            <Image
              source={ImageDefault}
              style={[
                ms.width((windowWidth * 90) / 100),
                ms.height((windowHeight * 30) / 100),
              ]}
            />
          </View>
        )}

        <View style={[ms.width((windowWidth * 90) / 100), ms.jc('center')]}>
          <RenderHTML
            source={{html: news?.content}}
            contentWidth={contentWidth}
            renderers={renderers}
            baseStyle={baseStyle}
          />
        </View>
      </View>

      {/* Source */}
      <View
        style={[
          // ms.pdV(10),s
          ms.pdH(20),
          ms.row,
          ms.ai('center'),
          ms.width((windowWidth * 100) / 100),
          ms.height((windowHeight * 10) / 100),
          ms.mgB(10),
        ]}>
        <Text
          style={[
            theme === 'dark'
              ? ms.fzBC(12, '500', colors.white)
              : ms.fzBC(12, '500', colors.grey_dark),
          ]}>
          Sumber :{' '}
        </Text>
        <OpenURLButton url={news?.original}>link</OpenURLButton>
      </View>

      {/* Share Sosmed */}
      <View
        style={[
          ms.pdH(20),
          ms.ai('flex-start'),
          ms.width((windowWidth * 40) / 100),
          ms.height((windowHeight * 8) / 100),
          ms.mgB(32),
        ]}>
        <TouchableOpacity
          style={[ms.row, ms.bdC(colors.greyDark), ms.bdW(1), ms.pd(5)]}
          onPress={() => {
            customShare(news._id);
            // onShare()
          }}>
          <Icon3
            name="share"
            size={22}
            color={theme === 'dark' ? colors.white : colors.grey_dark}
            style={[]}
          />
          <Text
            style={[
              theme === 'dark'
              ? ms.fzBC(14, '400', colors.white)
              : ms.fzBC(14, '400', colors.grey_dark),
            ]}>
            | Bagikan
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewsDetail;

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
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
  },
});

{
  /* <View style={[ms.row]}> */
}

{
  /* 
      <TouchableOpacity style={[]} onPress={() => {}}>
        <Image
          source={IconTwitter}
          color={theme === 'dark' ? colors.white : colors.green}
          style={[ms.mgH(3), ms.wh(25), ms.jc('center')]}
        />
      </TouchableOpacity> */
}

{
  /* <TouchableOpacity style={[]} onPress={() => {}}>
      <Image
        source={IconInstagram}
        color={theme === 'dark' ? colors.white : colors.green}
        style={[ms.mgH(3), ms.wh(25), ms.jc('center')]}
      />
    </TouchableOpacity> */
}

{
  /* <TouchableOpacity style={[]} onPress={() => {}}>
      <Image
        source={IconWhatsapp}
        color={theme === 'dark' ? colors.white : colors.green}
        style={[ms.mgH(3), ms.wh(25), ms.jc('center')]}
      />
    </TouchableOpacity> */
}
{
  /* </View> */
}
