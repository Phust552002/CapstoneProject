import React from 'react';
import {View, ViewStyle} from 'react-native';
import {makeStyles, OverlayProps} from 'react-native-elements';
import {Overlay} from 'react-native-elements/dist/overlay/Overlay';
import AppButton from './Button';
import { Mixin } from '../../helpers';
import { useBaseHook } from '../../helpers/hookHelper';

export interface IBottomModal extends OverlayProps {
  canCancel?: boolean;
  cancelTitle?: string;
  confirmTitle?: string;
  disabledConfirm?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  canDismiss?: boolean;
  customStyle?: ViewStyle;
}
const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: '100%',
  },
  overlayStyles: {
    position: 'absolute',
    width: '95%',
    bottom: Mixin.moderateSize(24),
    borderRadius: Mixin.moderateSize(8),
  },
  cancelButton: {
    marginTop: Mixin.moderateSize(8),
  },
}));
export const BottomModal = (props: IBottomModal) => {
  const {theme} = useBaseHook();
  const {
    confirmTitle = "Comfirm",
    cancelTitle = "Cancel",
  } = props;
  const styles = useStyles(theme);

  return (
    <Overlay
      onBackdropPress={() =>
        props.canDismiss && props.onCancel && props.onCancel()
      }
      overlayStyle={[styles.overlayStyles, props?.customStyle]}
      {...props}>
      <View>{props.children}</View>
      <View>
        {!props.disabledConfirm && (
          <AppButton
            title={confirmTitle}
            onPress={() => {
              props.onConfirm && props.onConfirm();
            }}
          />
        )}
        {props.canCancel && (
          <AppButton
            buttonStyle={styles.cancelButton}
            title={cancelTitle}
            onPress={() => props.onCancel && props.onCancel()}
            cancel
          />
        )}
      </View>
    </Overlay>
  );
};
