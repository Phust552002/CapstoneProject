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
  forgotText: {
    fontWeight: "600",
    color: '#FB344F',
    textAlign: 'right',
  },
  title: {
    fontSize: Mixin.moderateSize(24),
    marginBottom: Mixin.moderateSize(60),
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
  },
  registerContainer: {
    marginTop: Mixin.moderateSize(20),
    alignSelf: "center",
    flexDirection: 'row',
  },
  unregisterText: {
    color: '#999EA1'
  },
  primaryText: {
    color: theme.colors?.primary
  }


}));
