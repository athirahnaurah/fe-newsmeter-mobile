import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Logo} from '../../assets';
import ms from '../../utils/ms';
import {colors} from '../../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {slice} from 'lodash';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {getMedia} from '../../redux/action';
import {ListMedia, MediaList} from '../../components';

const DaftarMedia = ({navigation}) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    console.log(colorScheme);
  }, [colorScheme]);
  const dispatch = useDispatch();
  const {medList, med} = useSelector(state => state.mediaReducer);
  const {isLoadingScreen} = useSelector(state => state.globalReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [i, setI] = useState(15);
  const initialGet = slice(medList, 0, i);
  const [isCompleted, setIsCompleted] = useState(false);

  // console?.log('med: ', media);

  const data = [];

  const mediamap = dt => {
    for (let i; i < dt.length; i++) {
      return dt[i];
    }
  };

  const init = async () => {
    // await dispatch(getMedia());
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => {
      setRefreshing(false);
      init();
    });
  }, []);

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const loadMore = () => {
    setI(i + 15);
    console.log('index', i);
    if (i >= medList.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
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

      <View style={styles.title}>
        <Text
          style={[
            colorScheme === 'dark'
              ? ms.fzBCLh(18, '900', colors.white, 22)
              : ms.fzBCLh(18, '900', colors.black, 22),
          ]}>
          Media
        </Text>
      </View>

      {/* List Media */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoadingScreen ? (
          <ActivityIndicator
            color={colorScheme === 'dark' ? colors.white : colors.black}
            style={{margin: 5}}
          />
        ) : (
          <View style={[]}>
            {/* <ListMedia /> */}
            {initialGet.map((med, index) => (
              <ListMedia
                key={index}
                med={med}
                theme={colorScheme}
                // width={'60%'}
                // height={65}
                onPress={() => {
                  dispatch({type: 'SET_MED', value: med});
                  navigation.navigate('BeritaByMedia');
                }}
              />
            ))}
            <View
              style={[
                colorScheme === 'dark'
                  ? styles.containerPageD
                  : ms.containerPage,
                ms.width(windowWidth * 100) / 100,
                ms.aiJc('center'),
                ms.mgT(20),
                ms.mgB(10),
              ]}>
              {isCompleted ? (
                <TouchableOpacity
                  onPress={loadMore}
                  activeOpacity={0.9}
                  style={[
                    colorScheme === 'dark'
                      ? styles.loadMoreDeactiveD
                      : styles.loadMoreDeactive,
                  ]}>
                  <Text style={[ms.fzBC(12, '500', colors.white)]}>
                    Tampilkan lebih banyak
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={loadMore}
                  activeOpacity={0.9}
                  style={[styles.loadMoreActive]}>
                  <Text style={[ms.fzBC(12, '700', colors.white)]}>
                    Tampilkan lebih banyak
                  </Text>
                  {isLoadingScreen ? (
                    <ActivityIndicator
                      color={colors.white}
                      style={{marginLeft: 5}}
                    />
                  ) : null}
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DaftarMedia;

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
  back: {
    width: (windowWidth * 35) / 100,
  },
  background: {
    justifyContent: 'center',
    paddingVertical: 5,
    // width: (windowWidth * 70) / 100,
    // height: (windowHeight * 6) / 100,
  },
  logo: {
    height: (windowHeight * 6) / 100,
    width: (windowWidth * 35) / 100,
  },
  title: {
    height: (windowHeight * 3) / 100,
    marginVertical: 10,
    marginLeft: 20,
  },

  loadMoreActive: {
    width: (windowWidth * 50) / 100,
    height: (windowHeight * 4) / 100,
    // padding: 10,
    marginVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreDeactive: {
    width: (windowWidth * 50) / 100,
    height: (windowHeight * 4) / 100,
    // padding: 10,
    marginVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.grey3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreDeactiveD: {
    width: (windowWidth * 50) / 100,
    height: (windowHeight * 4) / 100,
    // padding: 10,
    marginVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.grey_dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonews: {
    height: (windowHeight * 85) / 100,
    fontSize: 12,
    fontWeight: '500',
    color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonewsD: {
    height: (windowHeight * 85) / 100,
    fontSize: 12,
    fontWeight: '500',
    color: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPageD: {
    backgroundColor: '#131313',
    flex: 1,
  },
});
