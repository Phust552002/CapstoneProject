import { TouchableOpacity, View } from "react-native";
import { HookHelper, Mixin } from "../../helpers";
import AppText from "../atoms/AppText";
import { SliderContainer } from "./SliderContainer";
import { Slider } from "@miblanchard/react-native-slider";
import { makeStyles } from "react-native-elements";
import { useGetNavigation } from "../../helpers/hookHelper";
import { UserActions } from "../../stores/actions";
import { useEffect, useState } from "react";
import * as Device from "expo-device";

interface ItemFontProps {
  isEdit?: boolean;
  service?: any;
}
interface ApiResponseState {
  error?: string; // Optional error message property
  data?: any; // Placeholder for any potential data received from the API
}
export const ItemFont = ({ isEdit, service }: ItemFontProps) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const [size, setSize] = useState(service ? service.size : 40);
  const [ApiResponse, setApiResponse] = useState<ApiResponseState | null>(null);

  const addSerivce = async () => {
    dispatch(
      UserActions.setServiceFont.request({
        size: size,
      })
    );
    try {
      const response = await fetch('https://neutral-seemingly-shepherd.ngrok-free.app/automate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Phuc gets serviceId from firebase
        body: JSON.stringify({
          serviceId: 3, 
          arguments: Device.manufacturer + " "+ "2.0" ,
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

  return (
    <View style={styles.fontContainer}>
      <View style={styles.fontContainer}>
        <AppText style={styles.subtitle}>
          {isEdit ? "Thay đổi" : "Chọn"} cỡ chữ:
        </AppText>

        <SliderContainer sliderValue={[size]} trackMarks={[0, 20, 40, 60, 80, 100]}>
          <Slider
            onSlidingComplete={(value) => {
              setSize(value[0]);
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
