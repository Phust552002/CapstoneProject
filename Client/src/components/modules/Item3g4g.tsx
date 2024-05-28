import { makeStyles } from "react-native-elements";
import { HookHelper, Mixin } from "../../helpers";
import { TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AppText from "../atoms/AppText";
import { useEffect, useState } from "react";
import { useGetNavigation, useBaseHook } from "../../helpers/hookHelper";
import { UserActions } from "../../stores/actions";
import { useTask } from "../../helpers/features/task";
import * as Device from "expo-device";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { SuccessModal } from "../atoms/SuccessModal";


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
  const { showLoading, hideLoading } = useBaseHook();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const [serviceName, setServiceName] = useState("");
  const { onAddTask } = useTask();
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");

  const [message, setMessage] = useState<{ title: string; description?: string }>();
  const addService = async () => {
    showLoading();
    
    dispatch(
      UserActions.setService3g4g.request({
        time: days,
        supplier: supplier,
      })
    );
    try {
      const response = await fetch('https://ideal-noticeably-wasp.ngrok-free.app/automate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Phuc gets serviceId from firebase
        body: JSON.stringify({
          serviceId: 1, 
          arguments: Device.manufacturer,
        }),
      });
      hideLoading();
      const data = await response.json();
      if (data.error == "") {
        setShowSuccess(true);
        setMessage({
          title: "Tự động hóa thành công",
          description: '3G/4G hiện đã được tắt',
        });
        setServiceName("3G/4G Service");
        setNote("Success");
        setNoteError("");

        await onAddTask({
          serviceName: "3G/4G Service",
          state: "Success",
          error: "",
        });
      }
      else {
        setShowError(true);
        setMessage({
          title: "Tự động hóa thất bại",
          description: data.error,
        });
        setServiceName("3G/4G Service");
        setNote("Failure");
        setNoteError(data.error);

        await onAddTask({
          serviceName: "3G/4G Service",
          state: "Failure",
          error: data.error,
        });
      }
    }
    catch (error) {
      hideLoading();
      setShowError(true);
      setMessage({
        title: "Tự động hóa thất bại",
        description: String(error),
      });
      console.error("Error adding service:", error);
      await onAddTask({
        serviceName: "3G/4G Service",
        state: "Error",
        error: String(error),
      });
    }
    // navigation.goBack();
  };

  useEffect(() => {
    if (service) {
      setDays(service.time);
      setSupplier(service.supplier);
    }
  }, [service]);

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
          <TouchableOpacity style={styles.addBtn} onPress={() => addService()}>
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
          <TouchableOpacity style={styles.addBtn} onPress={() => addService()}>
            <AppText white h5>
              THÊM
            </AppText>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.container}>
        <ErrorModal
          confirmTitle={"Đã hiểu"}
          onConfirm={() => navigation.goBack()}
          isVisible={showError}
          title={message?.title || ""}
          description={message?.description}
        />
        <SuccessModal
          confirmTitle={"Đã hiểu"}
          onConfirm={() => navigation.goBack()}
          isVisible={showSuccess}
          title={message?.title || ""}
          description={message?.description}
        />
      </View>
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
  container: {
    paddingHorizontal: Mixin.moderateSize(28),
    width: "100%",
    backgroundColor: theme.colors?.white,
    flex: 1,
    paddingTop: Mixin.moderateSize(60),
  },
}));
