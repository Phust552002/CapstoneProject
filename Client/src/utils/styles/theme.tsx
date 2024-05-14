import {Colors, FullTheme} from 'react-native-elements';
import {Mixin} from '../../helpers';

export const borderRadius = 8;

export const borderWidth = 1;

export const selectionColor = '#FF774D';

export const textColorDark2 = '#3D5E7B';
 
export const textColorDark3 = '#8AA3B9';

export const textColorWhite = '#FFFFFF';

export const textColorBlack = '#000000';

export const textColorGrey = '#979797';

export const bgGreyTransparent = 'rgba(173, 173, 173, 0.5)';
export interface IExtendColor extends Colors {
  testColor: string;
}
export const theme: Partial<FullTheme> = {
  Button: {
    titleStyle: {
      fontWeight: '600',
      fontSize: Mixin.moderateSize(14),
      lineHeight: 24,
    },
  },
  Text: {
    style: {
      lineHeight: 24,
    },
  },
  Icon: {
    type: 'material-community',
  },
  Input: {
    selectionColor: selectionColor,
    placeholderTextColor: textColorDark3,
  },
  CheckBox: {
    iconType: 'material-community',
  },
  colors: {
    primary: '#4E0189',
    secondary: '#006BE8',
    grey5: '#BDBDBD',
    grey1: '#6D7989',
    grey2: '#666666',
    error: '#D70015',
    success: '#248A3D',
    inputAlternative: '#F0EDE9',
    backgroundItem: '#F4F4F4',
    disabledButton: 'rgba(255, 115, 0, 0.5)',
    white: '#FFFFFF',
    textColor: '#05253D'
  },
};
