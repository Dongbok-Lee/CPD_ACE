import {Dimensions} from 'react-native';

export const colors = {
    primary: '#EC8B57',
    black: '#191919',
    red: '#FF3636',
    lightBlue: '#8CBCFB',
    blue: '#2B82F5',
    green: '#8FEF73',
    grey: '#767676',
    borderGrey: '#E5E5E5',
    statusGrey: '#666666',
    textGrey: '#A2A2A2',
    darkBlue: '#83abeb',
};

export const fonts = {

};

export const basicDimensions = { 
    height: 1920,
    width: 1200
};

export const height = ( // 높이 변환 작업
  Dimensions.get('screen').height * (1 / basicDimensions.height)
).toFixed(2);

export const width = ( // 가로 변환 작업
  Dimensions.get('screen').width * (1 / basicDimensions.width)
).toFixed(2);