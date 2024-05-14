import React, { useState } from "react";
import { Image, TouchableOpacity, View, ViewStyle } from "react-native";
import { makeStyles, OverlayProps } from "react-native-elements";
import { Overlay } from "react-native-elements/dist/overlay/Overlay";
import AppButton from "./Button";
import { Mixin } from "../../helpers";
import { useBaseHook } from "../../helpers/hookHelper";
import AppText from "./AppText";
import { images } from "../../../assets";

export interface IAppRadio {
  value: any;
  selectedValue: any;
  onSelect: () => void;
}

const useStyles = makeStyles((theme) => ({
  radioButton: {
    padding: Mixin.moderateSize(16),
    borderRadius: Mixin.moderateSize(12),
    marginVertical: Mixin.moderateSize(8),
    borderWidth: 2,
    borderColor: "#F4F4F5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioButtonText: {
    fontSize: Mixin.moderateSize(14),
    fontWeight: 'bold'
  },
  icon: {
    width: Mixin.moderateSize(20),
    height: Mixin.moderateSize(20),
  }
}));

export const AppRadioButton = ({
  value,
  selectedValue,
  onSelect,
}: IAppRadio) => {
  const { theme } = useBaseHook();
  const styles = useStyles(theme);
  const isSelected = selectedValue.id == value.id;
  return (
    <TouchableOpacity
      style={[
        styles.radioButton,
        { borderColor: isSelected ? "#6366F1" : "#F4F4F5" },
      ]}
      onPress={onSelect}
    >
      <AppText style={styles.radioButtonText}>{value.title}</AppText>
      <Image source={isSelected ? images.radioSelected : images.radio} style={styles.icon} />
    </TouchableOpacity>
  );
};
