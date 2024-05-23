import { TouchableOpacity, View } from "react-native";
import { HookHelper, Mixin } from "../../helpers";
import AppText from "../atoms/AppText";
import { SliderContainer } from "./SliderContainer";
import { Slider } from "@miblanchard/react-native-slider";
import { makeStyles } from "react-native-elements";
import { useGetNavigation, useBaseHook } from "../../helpers/hookHelper";
import { UserActions } from "../../stores/actions";
import { useEffect, useState } from "react";
import * as Device from "expo-device";
import { useTask } from "../../helpers/features/task";
import { ErrorModal } from "../atoms/ErrorModal";
import { SuccessModal } from "../atoms/SuccessModal";

interface ItemFontProps {
  isEdit?: boolean;
  service?: any;
}
interface ApiResponseState {
  error?: string;
  data?: any;
}
export const ItemFont = ({ isEdit, service }: ItemFontProps) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const [size, setSize] = useState(service ? service.size : 2.0);
  const [ApiResponse, setApiResponse] = useState<ApiResponseState | null>(null);
  const { showLoading, hideLoading } = useBaseHook();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const [serviceName, setServiceName] = useState("");
  const { onAddTask } = useTask();
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [message, setMessage] = useState<{
    title: string;
    description?: string;
  }>();
  const addSerivce = async () => {
    showLoading();
    dispatch(
      UserActions.setServiceFont.request({
        size: size,
      })
    );
    try {
      const response = await fetch(
        "https://ideal-noticeably-wasp.ngrok-free.app/automate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceId: 3,
            arguments: Device.manufacturer + " " + size,
          }),
        }
      );
      hideLoading();

      const data = await response.json();
      if (data.error == "") {
        setShowSuccess(true);
        setMessage({
          title: "Tự động hóa thành công",
          description: "Bạn đã thay đổi cỡ chữ thành công",
        });
        setServiceName("Font Editing Service");
        setNote("Success");
        setNoteError("");

        await onAddTask({
          serviceName: "Font Editing Service",
          state: "Success",
          error: "",
        });
      } else {
        setShowError(true);
        setMessage({
          title: "Tự động hóa thất bại",
          description: data.error,
        });
        setServiceName("Font Editing Service");
        setNote("Failure");
        setNoteError(data.error);

        await onAddTask({
          serviceName: "Font Editing Service",
          state: "Failure",
          error: data.error,
        });
      }
    } catch (error) {
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
  };

  return (
    <View style={styles.fontContainer}>
      <View style={styles.fontContainer}>
        <AppText style={styles.subtitle}>
          {isEdit ? "Thay đổi" : "Chọn"} cỡ chữ:
        </AppText>

        <SliderContainer
          sliderValue={[size * 20]}
          trackMarks={[0, 20, 40, 60, 80, 100]}
        >
          <Slider
            onSlidingComplete={(value) => {
              const newValue = Math.round(value[0] / 20).toFixed(1);
              setSize(parseFloat(newValue));
            }}
            maximumValue={100}
            minimumValue={0}
            step={20}
            trackRightPadding={0}
            thumbStyle={{ left: -10 }}
            trackStyle={{ backgroundColor: "black", height: 1 }}
            renderAboveThumbComponent={(thumbIndex, thumbValue) => (
              <View style={{ left: -20, top: 8 }}>
                <AppText h5>{thumbValue}%</AppText>
              </View>
            )}
          />
        </SliderContainer>
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
              CHỌN
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
