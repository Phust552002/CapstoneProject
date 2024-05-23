import React, { useState } from "react";
import { View, BackHandler, Alert } from "react-native"; // Import BackHandler và Alert
import { HookHelper } from "../../helpers";
import useStyles from "./styles";
import AppButton from "../../components/atoms/Button";
import { AuthenticationActions } from "../../stores/actions";
import { useGetNavigation } from "../../helpers/hookHelper";
import AppHeader from "../../components/atoms/Header";
import AppText from "../../components/atoms/AppText";


export const ProfileScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    try {
      dispatch(AuthenticationActions.logout.request());
      setIsLoggedOut(true); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const redirectToSplashScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "SplashScreen" }],
    });
  };
  const handleExitApp = () => {
    Alert.alert(
      "Thoát ứng dụng",
      "Bạn có chắc chắn muốn thoát ứng dụng?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <AppButton title="Thoát ứng dụng" onPress={handleExitApp} />
      <AppButton title="Đăng xuất" onPress={handleLogout} />
      <AppButton
        title="Phản hồi"
        onPress={() => navigation.navigate("Feedback")}
      />
      {isLoggedOut && (
        <View style={styles.loggedOutMessage}>
          <Text style={styles.loggedOutText}>Đã đăng xuất</Text>
        </View>
      )}
      {isLoggedOut && redirectToSplashScreen()}
    </View>
  );
};
F