import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    height: '100%',
  },
  header: {
    paddingHorizontal: Mixin.moderateSize(16),
  },
  title: {
    fontSize: Mixin.moderateSize(28),
    color: "#2D0C57",
    marginBottom: Mixin.moderateSize(20),
    fontWeight: "bold",
  },
  bottomContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: Mixin.moderateSize(20),
    borderTopLeftRadius: Mixin.moderateSize(20),
    width: '100%',
    padding: Mixin.moderateSize(20),
    flex: 1,
  },
  feedbackTitle: {
    fontWeight: '900',
    fontSize: Mixin.moderateSize(18),
    marginBottom: Mixin.moderateSize(8),
  },
  buttonStyle: {
    backgroundColor: '#6366F1',
    height: Mixin.moderateSize(40),
    marginTop: Mixin.moderateSize(20),
  },
  nameInputStyle: {
    borderWidth: 2,
    borderColor: '#CDD1E0',
    borderRadius: Mixin.moderateSize(12),
    height: Mixin.moderateSize(100),
    textAlignVertical: "top",
    marginTop: Mixin.moderateSize(40),
    padding: Mixin.moderateSize(12),
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: '#CDD1E0',
    borderRadius: Mixin.moderateSize(12),
    height: Mixin.moderateSize(200),
    textAlignVertical: "top",
    marginTop: Mixin.moderateSize(40),
    padding: Mixin.moderateSize(12),
    margin: 0
  }
}));
