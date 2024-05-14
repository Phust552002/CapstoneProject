import React, { useEffect } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import { Overlay, ThemeProvider } from "react-native-elements";
import FlashMessage from "react-native-flash-message";
import { AuthenticationRoute, HomeRoute } from ".";
import { useAppSelector } from "../helpers/hookHelper";
import { useLoadingContext } from "../helpers/loadingHelper";
import { ServerDown } from "../screens/ServerDown";
import GlobalStyles from "../utils/styles/GlobalStyles";
import { theme } from "../utils/styles/theme";

export const MainApp = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const appReducer = useAppSelector((state) => state.AppReducer);
  const { loading, hideLoading } = useLoadingContext();

  useEffect(() => {
    hideLoading();
  }, [authenticationReducer.accessToken]);

  const renderMainApp = () => {
    if (authenticationReducer.accessToken) {
      return <HomeRoute />;
    } else {
      return <AuthenticationRoute />;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors?.primary}
      />
      {appReducer.appConfig.is_server_down ? <ServerDown /> : renderMainApp()}
      <Overlay
        overlayStyle={{ backgroundColor: "transparent", elevation: 0 }}
        style={{ backgroundColor: "transparent" }}
        isVisible={loading}
      >
        <ActivityIndicator
          size={"large"}
          color={theme.colors?.primary}
          style={{ backgroundColor: "transparent" }}
        />
      </Overlay>
      <FlashMessage
        style={{
          ...GlobalStyles.shadow,
          backgroundColor: "white",
          borderBottomColor: theme.colors?.primary,
          borderBottomWidth: 1,
          marginTop: 20,
        }}
        titleStyle={{ fontWeight: "bold", color: theme.colors?.primary }}
        textStyle={{ color: "black" }}
        position="top"
      />
    </ThemeProvider>
  );
};
