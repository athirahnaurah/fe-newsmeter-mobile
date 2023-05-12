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
  // post: []
  // newsList: [
  //   {
  //     title: 'Tottenham Hotspur Masih Tanpa Conte saat Lawan Chelsea',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //     content:
  //       'Tottenham Hotspur adalah salah satu tim kontestan kompetisi teratas Liga Inggris, Premier League. Berikut ini adalah skuad Tottenham untuk musim 2021-2022. Tottenham Hotspur Football Club didirikan pada 5 September 1882. Klub yang bermarkas di Tottenham Hotspur Stadium memiliki julukan The Lilywhites. Tottenham Hotspur juga sering disebut dengan nama Spurs. Saat ini, Tottenham Hotspur dilatih oleh pelatih asal Portugal Nuno Espirito Santo',
  //     date: '16 Januari 2023, 14.09:57',
  //     views: '2',
  //     sumber: 'https://www.idntimes.com',
  //     kategori: 'Sport'
  //   },
  //   {
  //     title: 'Lagu Nasional Naik Kereta Api Bandung Lautan Api Anak-Anak',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //     content: 'Halo-halo Bandung Ibu kota Periangan Halo-halo Bandung Kota kenang-kenangan Sudah lama beta Tidak berjumpa dengan kau Sekarang telah menjadi lautan api Mari bung rebut kembali Halo-halo Bandung Ibu kota Periangan Halo-halo Bandung Kota kenang-kenangan Sudah lama beta Tidak berjumpa dengan kau Sekarang telah menjadi lautan api Mari bung rebut kembali Halo-halo Bandung Ibu kota Periangan Halo-halo Bandung Kota kenang-kenangan Sudah lama beta Tidak berjumpa dengan kau Sekarang telah menjadi lautan api Mari bung rebut kembali Mari bung rebut kembali Mari bung rebut kembali',
  //     date: '16 Januari 2023, 14.09:57',
  //     views: '2',
  //     sumber: 'https://www.idntimes.com',
  //     kategori: 'Nasional'
  //   },
  //   {
  //     title: 'Blackpink In Your Area',
  //     img: SportImg,
  //     media: 'Kompas.com',
  //     content: 'Grup K-Pop BLACKPINK beranggotakan Jennie, Lisa, Rose, dan Jisoo tampil sangat enerjik membawakan lagu-lagu hits-nya dalam konser "BLACKPINK World Tour [BORN PINK]" hari pertama di Stadion Utama Gelora Bung Karno, Jakarta, Sabtu malam (11/3), yang dipromotori oleh iME Indonesia. Konser tersebut menjadi konser pertama BLACKPINK di Indonesia dalam empat tahun terakhir, setelah "BLACKPINK in Your Area World Tour" pada tahun 2019.​​​​​​',
  //     date: '16 Januari 2023, 14.09:57',
  //     views: '2',
  //     sumber: 'https://www.kompas.com',
  //     kategori: 'Entertainment'
  //   },
  //   {
  //     title: 'Cuan Cuan Berhadiah Hanya di On The Spot',
  //     img: SportImg,
  //     media: 'IDN.Times',
  //     content: 'Grup K-Pop BLACKPINK beranggotakan Jennie, Lisa, Rose, dan Jisoo tampil sangat enerjik membawakan lagu-lagu hits-nya dalam konser "BLACKPINK World Tour [BORN PINK]" hari pertama di Stadion Utama Gelora Bung Karno, Jakarta, Sabtu malam (11/3), yang dipromotori oleh iME Indonesia. Konser tersebut menjadi konser pertama BLACKPINK di Indonesia dalam empat tahun terakhir, setelah konser cuan banyak.​​​​​​',      date: '16 Januari 2023, 14.09:57',
  //     date: '16 Januari 2023, 14.09:57',
  //     views: '0',
  //     sumber: 'https://www.idntimes.com',
  //     kategori: 'Entertainment'
  //   },
  //   {
  //     title: 'Liverpoll vs Manchaster United 7 : 0',
  //     img: SportImg,
  //     media: 'Detik.com',
  //     content: 'Performa Liverpool pada dua laga terakhir bisa dibilang ironi. Sebab, setelah tampil begitu perkasa pada duel dengan Manchester United, The Reds justru terkapar saat berjumpa tim juru kunci klasemen.Liverpool berjumpa Bournemouth pada duel pekan ke-27 Premier League 2022/2023, Sabtu (11/3/2023) malam WIB. Bermain di Vitality Stadium, Liverpool harus mengakui keunggulan sang tuan rumah dengan skor 1-0.​​​​​​',
  //     date: '16 Januari 2023, 14.09:57',
  //     views: '2',
  //     sumber: 'https://www.detik.com',
  //     kategori: 'Sport'
  //   },
  //   {
  //     title: 'Blackpink Concert',
  //     img: SportImg,
  //     media: 'Detik.com',
  //     content: 'Konser girlband BLACKPINK tengah digelar di Gelora Bung Karno (GBK), Jakarta, pada akhir pekan ini, 11-12 Maret 2023. Grup asal Korea Selatan ini terdiri atas empat personel antara lain Kim Jisoo, Kim Jennie, Park Chaeyong, dan Lalisa Manoban. Nama BLACKPINK semakin mengudara beberapa waktu belakangan, sehingga konsernya mejadi salah satu yang paling dinantikan oleh para pencinta K-Pop di tanah air. BLACKPINK juga dipercaya sebagai salah satu girlband dengan penghasilan tertinggi. Dikutip dari Stylecaster, Minggu (12/3/2023), kekayaan bersih BLACKPINK secara keseluruhan diperkirakan mencapai US$ 24 juta atau setara Rp 372 miliar (Kurs Rp 15.500) per tahunnya. Dengan demikian, setiap anggota akan membawa pulang US$ 6 juta atau setara Rp 93 miliar per tahun.',
  //     date: '16 Januari 2023, 14.09:57',
  //     views: '2',
  //     sumber: 'https://www.detik.com',
  //     kategori: 'Entertainment'
  //   },
  // ],
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
  return state;
};
