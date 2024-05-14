import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Button, ButtonProps} from 'react-native-elements';
import GlobalStyles from '../../utils/styles/GlobalStyles';
import { Mixin } from '../../helpers';
import { theme } from '../../utils/styles/theme';

interface IAppButtonProps extends ButtonProps {
  shadow?: boolean;
  disabled?: boolean;
  cancel?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  filled?: boolean;
  customBtnStyle?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: Mixin.moderateSize(50),
    marginTop: Mixin.moderateSize(16),
    color: '#0BCE83',
  },
  button: {
    borderRadius: Mixin.moderateSize(10),
    height: '100%',
    maxHeight: Mixin.moderateSize(100),
    backgroundColor: '#0BCE83',
  },
  disableButton: {
    backgroundColor: theme.colors?.disabledButton,
  },
  cancelButton: {
    backgroundColor: '#ECF0F3',
  },
  title: {
    fontWeight: '600',
    fontSize: Mixin.moderateSize(16),
  },
  cancelTitle: {
    color: 'black',
  },
  filledContainer: {
    backgroundColor: 'transparent',
  },
  filledTitle: {
    fontWeight: '600',
    fontSize: Mixin.moderateSize(14),
    color: '#0BCE83',
  },
});

const AppButton = (props: IAppButtonProps) => {
  return (
    <View
      style={[
        styles.buttonContainer,
        props.shadow ? GlobalStyles.shadow : null,
        props.buttonStyle ? props.buttonStyle : null,
      ]}>
      <Button
        disabledTitleStyle={{color: 'white'}}
        disabledStyle={styles.disableButton}
        disabled={props.disabled}
        titleStyle={[
          styles.title,
          props.cancel ? styles.cancelTitle : null,
          props.filled ? styles.filledTitle : null,
        ]}
        {...props}
        buttonStyle={[
          styles.button,
          props.cancel ? styles.cancelButton : null,
          props.filled ? styles.filledContainer : null,
          props.customBtnStyle,
        ]}
      />
    </View>
  );
};
export default AppButton;
