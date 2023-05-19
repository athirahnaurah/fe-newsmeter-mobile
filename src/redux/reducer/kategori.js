import {
  IconBola,
  IconEkonomi,
  IconHiburan,
  IconKesehatan,
  IconKuliner,
  IconMetropolitan,
  IconNasional,
  IconNews,
  IconOtomotif,
  IconPolitik,
  IconRegional,
  IconSport,
  IconTekno,
  IconTravel,
} from '../../assets';

const initStateNewsList = {
  kategoriList: [],
  kategori: {},
  minatKategori: [],
  preference: [],
};

export const kategoriReducer = (state = initStateNewsList, action) => {
  if (action.type === 'SET_KATEGORILIST') {
    return {
      ...state,
      kategoriList: action.value,
    };
  }
  if (action.type === 'SET_KATEGORI') {
    return {
      ...state,
      kategori: action.value,
    };
  }
  if (action.type === 'SET_MINAT_KATEGORI') {
    return {
      ...state,
      minatKategori: action.value,
    };
  }
  if (action.type === 'SET_PREFERENCE') {
    return {
      ...state,
      preference: action.value,
    };
  }
  return state;
};

// newsList: {},
  // kategoriList: [
  //   {
  //     id: 1,
  //     name: 'Politik',
  //     icon: IconPolitik,
  //   },
  //   {
  //     id: 2,
  //     name: 'Nasional',
  //     icon: IconNasional,
  //   },
  //   {
  //     id: 3,
  //     name: 'Metropolitan',
  //     icon: IconMetropolitan,
  //   },
  //   {
  //     id: 4,
  //     name: 'Regional',
  //     icon: IconRegional,
  //   },
  //   {
  //     id: 5,
  //     name: 'News',
  //     icon: IconNews,
  //   },
  //   {
  //     id: 6,
  //     name: 'Ekonomi',
  //     icon: IconEkonomi,
  //   },
  //   {
  //     id: 7,
  //     name: 'Hiburan',
  //     icon: IconHiburan,
  //   },
  //   {
  //     id: 8,
  //     name: 'Tekno',
  //     icon: IconTekno,
  //   },
  //   {
  //     id: 9,
  //     name: 'Sport',
  //     icon: IconSport,
  //   },
  //   {
  //     id: 10,
  //     name: 'Otomotif',
  //     icon: IconOtomotif,
  //   },
  //   {
  //     id: 11,
  //     name: 'Travel',
  //     icon: IconTravel,
  //   },
  //   {
  //     id: 12,
  //     name: 'Kuliner',
  //     icon: IconKuliner,
  //   },
  //   {
  //     id: 13,
  //     name: 'Kesehatan',
  //     icon: IconKesehatan,
  //   },
  //   {
  //     id: 14,
  //     name: 'Bola',
  //     icon: IconBola,
  //   },
  // ],