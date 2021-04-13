import { Platform } from 'react-native';

/* eslint-disable global-require */
export const LoadFonts = {
  Arkipelago: require('../assets/fonts/Arkipelago.otf'), // title font, license: (OFL) https://studionasir.com/fonts/arkipelago/
  NotoSansJP: require('../assets/fonts/NotoSansCJKjp-Regular-stripped.otf'), // license: (OFL) https://www.google.com/get/noto/help/cjk/
  NewTegomin: require('../assets/fonts/NewTegomin-Regular-stripped.ttf'), // license: (OFL) https://fonts.google.com/specimen/New+Tegomin#license
  ShipporiMinchoB1: require('../assets/fonts/ShipporiMinchoB1-Regular-stripped.ttf'), // license: (OFL) https://fonts.google.com/specimen/Shippori+Mincho+B1#license
  HachiMaruPop: require('../assets/fonts/HachiMaruPop-Regular-stripped.ttf'), // license: (OFL) https://fonts.google.com/specimen/Hachi+Maru+Pop#license
  ...Platform.select({
    ios: {},
    default: {
      HiraKakuPro: require('../assets/fonts/HiraKakuPro-W3-stripped.otf'),
      HiraMinoPro: require('../assets/fonts/HiraMinoPro-W3-stripped.otf'),
    },
  }),
};

export const FontList = [
  { fontFamily: 'System', name: 'System' },
  {
    fontFamily: Platform.select({
      ios: 'HiraginoSans-W3',
      default: 'HiraKakuPro',
    }),
    name: 'Hiragino Kaku Gothic Pro',
  },
  {
    fontFamily: Platform.select({
      ios: 'HiraMinProN-W3',
      default: 'HiraMinoPro',
    }),
    name: 'Hiragino Mincho Pro',
  },
  { fontFamily: 'NotoSansJP', name: 'Noto Sans JP' },
  { fontFamily: 'NewTegomin', name: 'New Tegomin' },
  { fontFamily: 'ShipporiMinchoB1', name: 'Shippori Mincho B1' },
  { fontFamily: 'HachiMaruPop', name: 'Hachi Maru Pop' },
];
