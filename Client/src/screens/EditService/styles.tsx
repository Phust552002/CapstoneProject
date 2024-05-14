import { makeStyles } from "react-native-elements";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: "#F6F5F5",
    height: "100%",
    paddingHorizontal: Mixin.moderateSize(20),
    paddingBottom: Mixin.moderateSize(20),
  },
  title: {
    fontSize: Mixin.moderateSize(28),
    color: "#2D0C57",
    fontWeight: "bold",
    flex: 1,
  },
  image: {
    width: "100%",
    height: Mixin.moderateSize(200),
    borderRadius: Mixin.moderateSize(8),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Mixin.moderateSize(30),
  },
  addBtn: {
    backgroundColor: "#0BCE83",
    borderRadius: 8,
    width: Mixin.moderateSize(140),
    height: Mixin.moderateSize(50),
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Mixin.moderateSize(20),
  },
  responseBtn: {
    backgroundColor: "#0ACF83",
    borderRadius: Mixin.moderateSize(8),
    paddingVertical: Mixin.moderateSize(8),
    paddingHorizontal: Mixin.moderateSize(4),
    left: Mixin.moderateSize(10),
  },
  shadowBox: {
    shadowColor: theme.colors?.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  feedbackContainer: {
    paddingHorizontal: Mixin.moderateSize(24),
  },
  improveContainer: {
    paddingHorizontal: Mixin.moderateSize(14),

  },
  feedbackTitle: {
    fontWeight: '900',
    fontSize: Mixin.moderateSize(18),
    marginBottom: Mixin.moderateSize(8),
  },
  closeIcon: {
    backgroundColor: 'rgba(116, 116, 128, 0.08)',
    width: Mixin.moderateSize(28),
    height: Mixin.moderateSize(28),
    borderRadius: Mixin.moderateSize(14),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginEnd: Mixin.moderateSize(8),
  },
  buttonStyle: {
    backgroundColor: '#6366F1',
    height: Mixin.moderateSize(40),
    marginTop: Mixin.moderateSize(20),
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: '#CDD1E0',
    borderRadius: Mixin.moderateSize(12),
    height: Mixin.moderateSize(200),
    textAlignVertical: "top",
    marginTop: Mixin.moderateSize(8),
    padding: Mixin.moderateSize(12),
    margin: 0
  }
}));
