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
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import ms from '../../utils/ms';
import {colors, getData} from '../../utils';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {ImageDefault, Logo, Point, SportImg} from '../../assets/images';
import {useState} from 'react';
import {IconInstagram, IconTwitter, IconWhatsapp} from '../../assets';
import Share from 'react-native-share';
import {getNewsById} from '../../redux/action/news';
import {NewsDetail} from '../../components';
import {getUser} from '../../redux/action/login';

// News Detail Page

const DetailBerita = ({route, navigation}) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {news, newsbyid} = useSelector(state => state.newsReducer);
  const {isLoadingScreen, isLogin} = useSelector(state => state.globalReducer);
  const [newsAvail, setNewsAvail] = useState(true);
  const {newsID, paramID} = route.params;

  useEffect(() => {
    console.log(colorScheme);
    if (navigation.isFocused) {
      init();
    }
  }, [colorScheme]);

  // Initialize req. API
  const init = async () => {
    // console.log('berita: ', news);
    console.log('news id: ', newsID);
    // console.log('param id: ', paramID);
    if (newsID !== undefined) {
      dispatch(getNewsById(newsID));
    } else{
      dispatch(getNewsById(paramID));
    }
  };

  const getNewsId = () => {
    const newsId = route.params.id;
    if (news === null) {
      setNewsAvail(false);
      dispatch(getNewsById(newsId));
      console.log(newsAvail);
      console.log('berita by id: ', newsbyid);
    } else {
      console.log('not share');
    }
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
            dispatch({type: 'SET_NEWS_BY_ID', value: null});
            navigation.navigate('MainApp');
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
