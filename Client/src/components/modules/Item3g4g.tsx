import { makeStyles } from "react-native-elements";
import { HookHelper, Mixin } from "../../helpers";
import { TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AppText from "../atoms/AppText";
import { useEffect, useState } from "react";
import { useGetNavigation } from "../../helpers/hookHelper";
import { UserActions } from "../../stores/actions";
const data = [
  { label: "TẮT/MỞ NGAY", value: "1" },
  { label: "HÀNG NGÀY", value: "2" },
  { label: "NGÀY MAI", value: "3" },
  { label: "HÀNG TUẦN", value: "4" },
];
const suppierData = [
  { label: "VIETTEL", value: "1" },
  { label: "MOBIFONE", value: "2" },
  { label: "VINAPHONE", value: "3" },
];

interface Item3g4gProps {
  isEdit?: boolean;
  service?: any;
}

interface ApiResponseState {
  error?: string; // Optional error message property
  data?: any; // Placeholder for any potential data received from the API
}

export const Item3g4g = ({ isEdit, service }: Item3g4gProps) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [days, setDays] = useState(data[0]);
  const [supplier, setSupplier] = useState(suppierData[0]);
  const { navigation } = useGetNavigation();
  const [ApiResponse, setApiResponse] = useState<ApiResponseState | null>(null);

  const addSerivce = async () => {
    setApiResponse(null);
    dispatch(
      UserActions.setService3g4g.request({
        time: days,
        supplier: supplier,
      })
    );
    try {
      const response = await fetch('/automate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Phuc gets serviceId from firebase
        body: JSON.stringify({
          serviceId: 1, 
          arguments: "",
        }),
      });
      const data = await response.json();
      setApiResponse({ error: "", data });
    }
    catch (error) {
      console.error("Error adding service:", error);
      setApiResponse({error: "Something went wrong", data:null});
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (service) {
      setDays(service.time);
      setSupplier(service.supplier);
    }
  }, []);

  return (
    <View style={styles.fontContainer}>
      <View style={styles.fontContainer}>
        <AppText style={styles.subtitle}>
          {isEdit ? "Thay đổi" : "Chọn"} thời gian:
        </AppText>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={days}
          onChange={(item) => {
            setDays(item);
          }}
        />
    
      </View>
      {isEdit ? (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.goBack()}
          >
            <AppText white h5>
              Hủy thay đổi
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={() => addSerivce()}>
            <AppText white h5>
              Thay đổi
            </AppText>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.goBack()}
          >
            <AppText white h5>
              HUỶ
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={() => addSerivce()}>
            <AppText white h5>
              THÊM
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontSize: Mixin.moderateSize(20),
    color: "#2D0C57",
    marginBottom: Mixin.moderateSize(20),
    fontWeight: "bold",
    marginTop: Mixin.moderateSize(16),
  },
  fontContainer: {
    flex: 1,
    justifyContent: "center",
  },
  dropdown: {
    height: Mixin.moderateSize(50),
    borderColor: "#323334",
    borderWidth: 1,
    paddingHorizontal: Mixin.moderateSize(14),
    backgroundColor: "white",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
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
}));
