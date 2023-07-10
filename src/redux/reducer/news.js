import {Logo, SportImg} from '../../assets';

const initStateNewsList = {
  newsList: [],
  news: {},
  bykategori: [],
  newsbykategori: {},
  bymedia: [],
  newsbymedia: {},
  newsListSearch: [],
  search: {},
  recomByKategori: [],
  newsbyid: {},
};

export const newsReducer = (state = initStateNewsList, action) => {
  if (action.type === 'SET_NEWSLIST') {
    return {
      ...state,
      newsList: action.value,
    };
  }
  if (action.type === 'SET_NEWS') {
    return {
      ...state,
      news: action.value,
    };
  }
  if (action.type === 'SET_NEWSLIST_BY_KATEGORI') {
    return {
      ...state,
      bykategori: action.value,
    };
  }
  if (action.type === 'SET_NEWS_BY_KATEGORI') {
    return {
      ...state,
      newsbykategori: action.value,
    };
  }
  if (action.type === 'SET_NEWSLIST_BY_MEDIA') {
    return {
      ...state,
      bymedia: action.value,
    };
  }
  if (action.type === 'SET_NEWS_BY_MEDIA') {
    return {
      ...state,
      newsbymedia: action.value,
    };
  }
  if (action.type === 'SET_NEWSLIST_SEARCH') {
    return {
      ...state,
      newsListSearch: action.value,
    };
  }
  if (action.type === 'SET_SEARCH') {
    return {
      ...state,
      search: action.value,
    };
  }
  if (action.type === 'SET_NEWS_RECOMMEND_BY_KATEGORI') {
    return {
      ...state,
      recomByKategori: action.value,
    };
  }
  if (action.type === 'SET_NEWS_BY_ID') {
    return {
      ...state,
      newsbyid: action.value,
    };
  }
  return state;
};
