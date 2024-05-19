import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { makeStyles } from "react-native-elements";
import { HookHelper, Mixin } from "../../helpers";
import AppText from "../atoms/AppText";
import { useGetNavigation, useBaseHook } from "../../helpers/hookHelper";
import { UserActions } from "../../stores/actions";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { SuccessModal } from "../atoms/SuccessModal";

const data = [
  { label: "XÓA NGAY", value: "1" },
  { label: "HÀNG NGÀY", value: "2" },
  { label: "NGÀY MAI", value: "3" },
  { label: "HÀNG TUẦN", value: "4" },
];

interface ItemZaloProps {
  isEdit?: boolean;
  service?: any;
}

interface ApiResponseState {
  error?: string; // Optional error message property
  data?: any; // Placeholder for any potential data received from the API
}

export const ItemZalo = ({ isEdit, service }: ItemZaloProps) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [days, setDays] = useState(data[0]);
  const { navigation } = useGetNavigation();
  const [ApiResponse, setApiResponse] = useState<ApiResponseState | null>(null);
  const { showLoading, hideLoading } = useBaseHook();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState<{ title: string; description?: string }>();
  const addSerivce = async () => {
    showLoading();
    
    dispatch(
      UserActions.setServiceZalo.request({
        time: days,
      })
    );
    try {
      const response = await fetch('https://neutral-seemingly-shepherd.ngrok-free.app/automate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Phuc gets serviceId from localstore
        body: JSON.stringify({
          serviceId: 2,
          arguments: "",
        }),
      });
      hideLoading();

      const data = await response.json();
      if (data.error == "") {
        setShowSuccess(true);
        setMessage({
          title: "Tự động hóa thành công",
          description: 'Bạn đã xóa dữ liệu Cache của Zalo',
        });
      }
      else {
        setShowError(true);
        setMessage({
          title: "Tự động hóa thất bại",
          description: data.error,
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
      
    }
    // navigation.goBack();
  };
  useEffect(() => {
    if (service) {
      setDays(service.time);
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
