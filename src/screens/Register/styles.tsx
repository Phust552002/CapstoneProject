import { makeStyles } from "react-native-elements";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    paddingHorizontal: Mixin.moderateSize(28),
    width: "100%",
    backgroundColor: theme.colors?.white,
    flex: 1,
    paddingTop: Mixin.moderateSize(60),
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: Mixin.moderateSize(20),
  },
  inputStyle: {
    marginTop: Mixin.moderateSize(8),
  },
  phoneInputStyle: {
    ...Mixin.padding(8, 16, 8, 14),
    backgroundColor: theme.colors?.white,
    height: Mixin.moderateSize(40),
    // width: Mixin.moderateSize(343),
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotText: {
    fontWeight: "600",
    color: '#FB344F',
    textAlign: 'right',
  },
  title: {
    fontSize: Mixin.moderateSize(24),
  },
  inputLabel: {
    color: theme.colors?.primary
  },
  buttonStyle: {
    backgroundColor: theme.colors?.primary,
    height: Mixin.moderateSize(40),
  },
  inputContainer: {
    marginBottom: Mixin.moderateSize(10),
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    right: 15
  },
  registerContainer: {
    marginTop: Mixin.moderateSize(20),
    alignSelf: "center",
    flexDirection: 'row',

  },
  unregisterText: {
    color: '#999EA1',
    marginBottom: Mixin.moderateSize(40)
  },
  primaryText: {
    color: theme.colors?.primary
  },
  phoneInput: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderColor: '#C6C6C6',
    borderWidth: 1,
    borderRadius: Mixin.moderateSize(8),
    paddingStart: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(8),
  },
  phonePrefix: {
    borderRightWidth: 1,
    borderColor: '#C6C6C6',
    paddingRight: Mixin.moderateSize(8),
  }


}));
