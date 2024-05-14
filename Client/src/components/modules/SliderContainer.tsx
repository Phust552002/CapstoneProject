import { useState } from "react";
import { View } from "react-native";
import React from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { makeStyles } from "react-native-elements";
import { theme } from "../../utils/styles/theme";
const DEFAULT_VALUE = 0.2;

export const SliderContainer = (props: {
  children: React.ReactElement;
  sliderValue?: Array<number>;
  trackMarks?: Array<number>;
}) => {
  const { sliderValue, trackMarks } = props;
  const [value, setValue] = useState(sliderValue ? sliderValue : DEFAULT_VALUE);
  let renderTrackMarkComponent: any;
  const styles = useStyles(theme);

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index: number) => {
      return (
        <View>
          <View style={{ height: 20, width: 1, backgroundColor: "black" }} />
        </View>
      );
    };
  }

  const renderChildren = () => {
    return React.Children.map(props.children, (child: React.ReactElement) => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value,
        });
      }

      return child;
    });
  };

  return <View style={styles.sliderContainer}>{renderChildren()}</View>;
};

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
}));
