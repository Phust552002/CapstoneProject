import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    backgroundColor: '#A259FF',
    justifyContent: 'flex-end',
    height: '100%',
  },

  bottomContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: Mixin.moderateSize(20),
    borderTopLeftRadius: Mixin.moderateSize(20),
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Mixin.moderateSize(20),
  },

  logo: {
    width: Mixin.moderateSize(70),
    height: Mixin.moderateSize(70),
    margin: Mixin.moderateSize(50),
  },

  title: {
    marginTop: Mixin.moderateSize(20),
    marginBottom: Mixin.moderateSize(150),
  },

  guessLogin: {
    color: '#9586A8',
    fontSize: Mixin.moderateSize(15),
    textTransform: 'uppercase',
    marginVertical: Mixin.moderateSize(40),
    fontWeight: 'bold',
  },
 
  
}));
