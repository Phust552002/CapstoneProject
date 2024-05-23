import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RouteParamList } from "./RouteParamList";
import { TabRoute } from "./TabRoute";
import { LoginScreen } from "../screens/Login";
import { SplashScreen } from "../screens/Splash";
import { RegisterScreen } from "../screens/Register";

const Stack = createNativeStackNavigator<RouteParamList>();

export const AuthenticationRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TabRoute" component={TabRoute} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
