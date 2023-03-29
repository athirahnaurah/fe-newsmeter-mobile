import { combineReducers } from 'redux';
import { kategoriReducer } from './kategori';
import { mediaReducer } from './media';
import {newsReducer} from './news';
import { rekomendasiReducer } from './rekomendasi';

const reducer = combineReducers({
    newsReducer,
    kategoriReducer,
    mediaReducer,
    rekomendasiReducer,
});

export default reducer;