import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HomeScreen } from "../screens/Home";
import { TabBar } from "./components/Tabbar";
import { MenuScreen } from "../screens/Menu";
import { ProfileScreen } from "../screens/Profile";

const Tab = createBottomTabNavigator();

export const TabRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "red",
          position: "absolute",
          height: 100,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
