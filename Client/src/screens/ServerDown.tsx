import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import AppText from "../components/atoms/AppText";
import { images } from "../../assets";
import { theme } from "../utils/styles/theme";

export const ServerDown = () => {
  return (
    <View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors?.primary,
          width: "100%",
          padding: 20,
        }}
      >
        {/* <Image
          source={images.logo}
          resizeMode="contain"
          style={{ width: 250, height: 50 }}
        /> */}
        <AppText style={{ textAlign: "center", marginTop: 24 }} body1 white>
          Our services are updating, please try again later
        </AppText>
      </View>
    </View>
  );
};
