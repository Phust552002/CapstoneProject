import { makeStyles } from "react-native-elements";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors?.backgroundItem,
    paddingHorizontal: Mixin.moderateSize(16),
    height: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors?.white,
    borderRadius: 20,
    borderColor: "#D9D0E3",
    borderWidth: 1,
    paddingStart: Mixin.moderateSize(16),
    marginBottom: Mixin.moderateSize(16),
  },
  exploreSearchInput: {
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 15,
    width: "100%",
    paddingVertical: Mixin.moderateSize(8),
    fontSize: Mixin.moderateSize(16),
  },
  title: {
    fontSize: Mixin.moderateSize(28),
    color: "#2D0C57",
    marginBottom: Mixin.moderateSize(20),
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: Mixin.moderateSize(16),
    marginTop: Mixin.moderateSize(16),
  },
  itemImage: {
    width: Mixin.moderateSize(170),
    height: Mixin.moderateSize(120),
    borderRadius: 5,
  },
  itemContentContainer: {
    flex: 1,
    justifyContent: "center"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  heartBtn: {
    backgroundColor: theme.colors?.white,
    borderRadius: 8,
    borderColor: "#D9D0E3",
    borderWidth: 1,
    paddingHorizontal: Mixin.moderateSize(20),
    paddingVertical: Mixin.moderateSize(8),
  },
  addBtn: {
    backgroundColor: "#0BCE83",
    borderRadius: 8,
    width: Mixin.moderateSize(70),
    height: Mixin.moderateSize(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
