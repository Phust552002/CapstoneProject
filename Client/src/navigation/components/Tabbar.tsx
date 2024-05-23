import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image, makeStyles } from "react-native-elements";
import { isIphoneX } from "react-native-iphone-x-helper";
import { Mixin } from "../../helpers";
import { useBaseHook } from "../../helpers/hookHelper";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/src/types";
import { images } from "../../../assets";

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    // height: isIphoneX() ? 100 : 80,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
  },
  icon: {
    width: Mixin.moderateSize(18),
    height: Mixin.moderateSize(18),
    tintColor: "#979696",
  },
  selectedIcon: {
    width: Mixin.moderateSize(18),
    height: Mixin.moderateSize(18),
    tintColor: theme.colors?.primary,
  },
  routeContainer: {
    height: isIphoneX() ? 90 : 70,
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  firstRouteRadius: {
    borderTopLeftRadius: 20,
  },
  lastRouteRadius: {
    borderTopRightRadius: 20,
  },
  label: {
    position: "absolute",
    color: "#888888",
    bottom: isIphoneX() ? 30 : 10,
    width: "100%",
    textAlign: "center",
    fontSize: 11,
  },
  selectedLabel: {
    position: "absolute",
    color: theme.colors?.primary,
    bottom: isIphoneX() ? 30 : 10,
    width: "100%",
    textAlign: "center",
    fontSize: 11,
  },
}));

export const TabBar: React.FC<BottomTabBarProps> = (props) => {
  const { state, descriptors, navigation } = props;
  const { theme } = useBaseHook();
  const styles = useStyles(theme);
  const isFocused = (index: number) => index === state.index;

  const onPress = (index: number) => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[index].key,
      canPreventDefault: true,
    });
    if (!isFocused(index) && !event.defaultPrevented) {
      navigation.navigate(state.routes[index].name);
    }
  };

  return (
    <View>
      <View
        style={styles.container}
      >
        <TouchableOpacity
          onPress={() => onPress(0)}
          style={[styles.routeContainer, styles.firstRouteRadius]}
        >
          <Image
            style={isFocused(0) ? styles.selectedIcon : styles.icon}
            source={images.menuIcon}
          />
          <Text style={isFocused(0) ? styles.selectedLabel : styles.label}>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress(1)}
          style={styles.routeContainer}
        >
          <Image
            style={isFocused(1) ? styles.selectedIcon : styles.icon}
            source={images.homeIcon}
          />
          <Text style={isFocused(1) ? styles.selectedLabel : styles.label}>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress(2)}
          style={styles.routeContainer}
        >
          <Image
            style={isFocused(2) ? styles.selectedIcon : styles.icon}
            source={images.profileIcon}
          />
          <Text style={isFocused(2) ? styles.selectedLabel : styles.label}>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
