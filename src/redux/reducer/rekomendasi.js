import {Logo, SportImg} from '../../assets';

const initStateNewsList = {
  // newsList: {},
  recomByHistory: [],
  // recommendation: {},
};

export const rekomendasiReducer = (state = initStateNewsList, action) => {
  if (action.type === 'SET_NEWS_RECOMMEND_BY_HISTORY') {
    return {
      ...state,
      recomByHistory: action.value,
    };
  }
  // if (action.type === 'SET_REKOMENDASI') {
  //   return {
  //     ...state,
  //     rekomendasi: action.value,
  //   };
  // }
  return state;
};
