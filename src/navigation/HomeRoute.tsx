import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RouteParamList } from "./RouteParamList";
import { TabRoute } from "./TabRoute";
import { AddServiceScreen } from "../screens/AddService";
import { EditServiceScreen } from "../screens/EditService";
import { FeedbackScreen } from "../screens/Feedback";

const Stack = createNativeStackNavigator<RouteParamList>();

export const HomeRoute = () => {
  const navigationRef = useNavigationContainerRef<any>();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        // initialRouteName="MyQr"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TabRoute" component={TabRoute} />
        <Stack.Screen name="AddService" component={AddServiceScreen} />
        <Stack.Screen name="EditService" component={EditServiceScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
