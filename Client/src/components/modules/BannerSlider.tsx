import React from "react";
import { makeStyles } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";

import { View, Platform, Dimensions } from "react-native";
import _ from "lodash";
import { Mixin } from "../../helpers";
import { useBaseHook, useGetNavigation } from "../../helpers/hookHelper";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: Mixin.moderateSize(10),
  },
  background: {
    width: "100%",
    height: Mixin.moderateSize(250),
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
  },
}));
const DEVICE_WIDTH = Dimensions.get("window").width;

interface IBannerSliderProps {
  images: any[];
}

export const BannerSlider = (props: IBannerSliderProps) => {
  const { theme } = useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);
  const onPress = (index: number) => {};
  return (
    <View style={styles.container}>
      <SliderBox
        images={props.images}
        sliderBoxHeight={Mixin.moderateSize(250)}
        parentWidth={DEVICE_WIDTH}
        onCurrentImagePressed={(index: number) => onPress(index)}
        dotColor="white"
        inactiveDotColor="#90A4AE"
        autoplay
        circleLoop
        paginationBoxStyle={{
          zIndex: 100,
          bottom: 30,
        }}
      />
      <View style={styles.background} />
    </View>
  );
};
