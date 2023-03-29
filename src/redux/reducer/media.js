import { CNNIndonesia, Detik, Gelora, Kompas, Kumparan, Liputan6, Merdeka, Okezone, SindoNews, Tempo } from "../../assets";

const initStateNewsList = {
    // newsList: {},
    mediaList: [{
        id: 1,
        link: "cnnindonesia.com",
        img: CNNIndonesia
      },
      {
        id: 2,
        link: "detik.com",
        img: Detik
      },{
        id: 3,
        link: "gelora.com",
        img: Gelora
      },{
        id: 4,
        link: "kompas.com",
        img: Kompas
      },{
        id: 5,
        link: "kumparan.com",
        img: Kumparan
      },{
        id: 6,
        link: "liptan6.com",
        img: Liputan6
      },{
        id: 7,
        link: "merdeka.com",
        img: Merdeka
      },{
        id: 8,
        link: "okezone.com",
        img: Okezone
      },{
        id: 9,
        link: "sindonews.com",
        img: SindoNews
      },{
        id: 10,
        link: "tempo.com",
        img: Tempo
      },],
    media: {},
  };
  
  export const mediaReducer = (state = initStateNewsList, action) => {
    if (action.type === 'SET_MEDIALIST') {
      return {
        ...state,
        mediaList: action.value,
      };
    }
    if (action.type === 'SET_MEDIA') {
      return {
        ...state,
        media: action.value,
      };
    }
    return state;
  };