import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import AppInput from "../../components/atoms/AppInput";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import AppText from "../../components/atoms/AppText";
import { AppCheckBox } from "../../components/atoms/AppCheckBox";
import { AuthenticationActions } from "../../stores/actions";
import { useAuth } from "../../helpers/features/auth";

export const LoginScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();

  const [phoneString, setPhoneString] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const { onLogin, onGetUserInfo } = useAuth();
  const onNext = async () => {
    if (!validatePhone(phoneString)) {
      setError({
        title: "Số điện thoại không hợp lệ",
        description: "Số điện thoại phải có từ 9 đến 10 chữ số",
      });
      setShowError(true);
      return;
    }
    try {
      const response = await onLogin(phoneString, passwordString);
      if (response.isSuccessful) {
        const userData = await onGetUserInfo(
          response.userCredential?.user.uid!
        );
        dispatch(
          AuthenticationActions.setAuthenticationData.request({
            accessToken: response?.userCredential?.user.uid,
            userInfo: userData,
          })
        );
      } else {
        setTimeout(() => {
          setShowError(true);
          setError({
            title: "Error",
            description: response.error.message,
          });
        }, 200);
      }
    } catch (error: any) {
      setShowError(true);
      setError({
        title: "Error",
        description: error.message,
      });
    }
  };
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{9,10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <View style={styles.container}>
      <View>
        <AppText style={styles.title}>Xin chào! 👋</AppText>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Số điện thoại</AppText>
          <AppInput
            label={"Hãy nhập số điện thoại"}
            value={phoneString}
            onChangeText={(text) => setPhoneString(text)}
            containerStyles={styles.inputStyle}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Mật khẩu</AppText>
          <AppInput
            label={"Hãy nhập mật khẩu"}
            value={passwordString}
            maxLength={100}
            isPassword
            keyboardType="default"
            onChangeText={(text) => setPasswordString(text)}
            containerStyles={styles.inputStyle}
          />
        </View>
      </View>
      <View style={styles.rowView}>
        <View style={styles.rememberContainer}>
          <AppCheckBox
            isSelected={savePassword}
            setSelection={setSavePassword}
          />
          <AppText>Ghi nhớ đăng nhập</AppText>
        </View>
        <AppText style={styles.forgotText}>Quên mật khẩu</AppText>
      </View>
      <AppButton
        title={"Đăng nhập"}
        onPress={() => onNext()}
        customBtnStyle={styles.buttonStyle}
      />
      <View style={styles.registerContainer}>
        <AppText style={styles.unregisterText}>Chưa tạo tại khoản ? </AppText>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <AppText style={styles.primaryText}>Đăng ký ngay</AppText>
        </TouchableOpacity>
      </View>
      <ErrorModal
        confirmTitle={"Thử lại"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </View>
  );
};
