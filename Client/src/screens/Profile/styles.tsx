import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    backgroundColor: theme.colors?.backgroundItem,
    justifyContent: 'center',
    paddingHorizontal: Mixin.moderateSize(16),
    height: '100%',
  },
  
}));
