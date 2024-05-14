import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

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

export const RegisterScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();

  const [phoneString, setPhoneString] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const [confirmPasswordString, setConfirmPasswordString] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const { onRegister } = useAuth();

  const onNext = async () => {
    if (!validatePhone(phoneString)) {
      setError({
        title: "Số điện thoại không hợp lệ",
        description: "Số điện thoại phải có từ 9 đến 10 chữ số",
      });
      setShowError(true);
      return;
    }

    if (!validatePassword(passwordString, confirmPasswordString)) {
      setError({
        title: "Mật khẩu không khớp",
        description: "Mật khẩu và xác nhận mật khẩu phải giống nhau",
      });
      setShowError(true);
      return;
    }
    // dispatch(AuthenticationActions.setAccountNumber.request("phoneString"));
    const response = await onRegister(phoneString, passwordString);
    if (response.isSuccessful) {
      navigation.navigate("Login");
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: "Error",
          description: response.error?.message || "Something went wrong",
        });
      }, 200);
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

  const validatePassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  return (
    <View style={styles.container}>
      <View>
        <AppText style={styles.title}>Tạo tài khoản</AppText>
        <AppText style={styles.unregisterText}>
          Sử dụng app ngay hôm nay
        </AppText>

        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Số điện thoại</AppText>

          <View style={styles.phoneInput}>
            <View style={styles.phonePrefix}>
              <AppText>+84</AppText>
            </View>
            <TextInput
              style={styles.phoneInputStyle}
              placeholder="Nhập số điện thoại"
              value={phoneString}
              onChangeText={(text) => setPhoneString(text)}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Mật khẩu</AppText>
          <AppInput
            label={"Nhập mật khẩu"}
            value={passwordString}
            maxLength={100}
            isPassword
            keyboardType="default"
            onChangeText={(text) => setPasswordString(text)}
            containerStyles={styles.inputStyle}
          />
        </View>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Xác nhận mật khẩu</AppText>
          <AppInput
            label={"Nhập lại mật khẩu"}
            value={confirmPasswordString}
            maxLength={100}
            isPassword
            keyboardType="default"
            onChangeText={(text) => setConfirmPasswordString(text)}
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
      </View>
      <AppButton
        title={"Đăng ký"}
        onPress={() => onNext()}
        customBtnStyle={styles.buttonStyle}
      />
      <View style={styles.registerContainer}>
        <AppText style={styles.unregisterText}>Đã có tài khoản </AppText>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <AppText style={styles.primaryText}>Đăng nhập ngay</AppText>
        </TouchableOpacity>
      </View>
      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </View>
  );
};
