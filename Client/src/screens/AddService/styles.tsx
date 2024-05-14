import { makeStyles } from "react-native-elements";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: "#F6F5F5",
    height: "100%",
  },
  bottomContainer: {
    backgroundColor: "#F6F5F5",
    borderTopRightRadius: Mixin.moderateSize(30),
    borderTopLeftRadius: Mixin.moderateSize(30),
    width: "100%",
    paddingHorizontal: Mixin.moderateSize(20),
    top: Mixin.moderateSize(-30),
    flex: 1,
    paddingTop: Mixin.moderateSize(24),
  },
  title: {
    fontSize: Mixin.moderateSize(28),
    color: "#2D0C57",
    marginBottom: Mixin.moderateSize(10),
    fontWeight: "bold",
  },

  descriptionText: {
    color: "#9586A8",
    fontSize: Mixin.moderateSize(15),
    lineHeight: Mixin.moderateSize(22),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Mixin.moderateSize(30),
  },
  addBtn: {
    backgroundColor: "#0BCE83",
    borderRadius: 8,
    width: Mixin.moderateSize(140),
    height: Mixin.moderateSize(50),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: Mixin.moderateSize(30),
    left: Mixin.moderateSize(10),
    zIndex: 9999,
  },
}));
