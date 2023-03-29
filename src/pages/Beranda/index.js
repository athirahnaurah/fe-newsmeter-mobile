import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils';
import ms from '../../utils/ms';
import {Logo, SportImg} from '../../assets/images';
import {windowHeight, windowWidth} from '../../utils/ms/constant';
import { useDispatch, useSelector } from 'react-redux';
import NewsList from '../../components/molecules/NewsList';
import { getNews } from '../../redux/action';
import { useEffect } from 'react';

const Beranda = ({navigation}) => {
  // const [newsList, setnewsList] = useState([
  //   {
  //     title:'Tottenham Hotspur Masih Tanpa Conte saat Lawan Chelsea',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //   },
  //   {
  //     title:'Tottenham Hotspur Masih Tanpa Conte saat Lawan Chelsea',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //   },
  //   {
  //     title:'Tottenham Hotspur Masih Tanpa Conte saat Lawan Chelsea',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //   },
  //   {
  //     title:'Tottenham Hotspur Masih Tanpa Conte saat Lawan Chelsea',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //   },
  // ]);
  const dispatch = useDispatch();
  const {newsList} = useSelector((state => state.newsReducer))
  
  const init = () => {
   dispatch(getNews(newsList));
  }

  useEffect(() => {
    if (navigation.isFocused) {
      init();
    }
  }, [navigation]);

  return (
    <SafeAreaView style={[ms.containerPage]}>
      {/* Header */}
      <View style={styles.background}>
        <Image source={Logo} style={styles.logo} />
      </View>
      {/* Title Terbaru */}
      <View style={styles.title}>
          <Text style={[ms.fzBCLh(18, '900', colors.black, 22)]}>TERBARU</Text>
        </View>
      <ScrollView>
        {
          newsList.map((news, index) => {
            return(
              <NewsList 
                key={index}
                news={news}
                // width={'60%'}
                // height={65}
                onPress={() => {
                  dispatch({ type: 'SET_NEWS', value: news});
                  navigation.navigate("DetailBerita")
                }}
              />
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Beranda;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#346CB3',
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth * 100) / 100,
    height: (windowHeight * 6) / 100,
  },
  logo: {
    height: (windowHeight * 6) / 100,
    width: (windowWidth * 35) / 100,
  },
  title: {
    marginTop: 13,
    marginLeft: 20,
  },
  // NewsCard:{
  //   width: windowWidth * 100 /100,
  //   height: windowHeight * 18 /100,
  //   // backgroundColor: colors.grey,
  //   flex:1,
  //   justifyContent:'center',
  //   flexDirection: 'row',
  // }
});
