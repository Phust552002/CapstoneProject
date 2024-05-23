import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { HookHelper } from "../../helpers";
import useStyles from "./styles";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { useGetNavigation } from "../../helpers/hookHelper";
import { AuthenticationActions } from "../../stores/actions";

export const SplashScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <Image source={images.logo} style={styles.logo} />
        <AppText h3 style={styles.title}>
          Tự động hóa
        </AppText>

        <AppButton
          title="Đăng nhập"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
        <TouchableOpacity
          onPress={() =>
            dispatch(AuthenticationActions.setAccountNumber.request("1"))
          }
        >
          <AppText
            style={styles.guessLogin}
            onPress={() => navigation.navigate("Register")}
          >
            Đăng ký ngay
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
