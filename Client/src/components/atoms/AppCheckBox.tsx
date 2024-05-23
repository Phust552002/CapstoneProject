import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import { Mixin } from '../../helpers';
import { useBaseHook } from '../../helpers/hookHelper';
import { CheckBox, CheckBoxProps } from 'react-native-elements';

interface IAppCheckboxProps extends CheckBoxProps {
  isSelected: boolean;
  setSelection: any;
}
const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
  },
  container: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0
  },
});
export const AppCheckBox = (props: IAppCheckboxProps) => {
  const {theme} = useBaseHook();
  return (
    <CheckBox
      checkedIcon={'checkbox-outline'}
      uncheckedIcon={'checkbox-blank-outline'}
      checkedColor={theme.colors?.primary}
      textStyle={styles.text}
      checked={props.isSelected}
      onPress={() => props.setSelection(!props.isSelected)}
      {...props}
      containerStyle={[styles.container, props.containerStyle]}
    />
  );
};
