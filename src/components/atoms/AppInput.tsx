import _, { set } from 'lodash';
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  StyleProp,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  TextInput,
  TextStyle,
} from 'react-native';
import {Icon, makeStyles, Text, useTheme} from 'react-native-elements';
import GlobalStyles from '../../utils/styles/GlobalStyles';
import { images } from '../../../assets';
import AppText from './AppText';
import { HookHelper, Mixin } from '../../helpers';
interface IAppInputProps extends TextInputProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  isPassword?: boolean;
  error?: string;
  filled?: boolean;
  alternative?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  renderRight?: React.ReactNode;
  shadow?: boolean;
  hideLabel?: boolean;
  isClear?: boolean;
  disabledLabel?: boolean;
  onPress?: () => void;
}
export interface IAppInputRef {
  focus: () => void;
}
const useStyles = makeStyles(theme => ({
  inputContainer: {
    ...Mixin.padding(8, 16, 8, 14),
    backgroundColor: theme.colors?.white,
    borderRadius: Mixin.moderateSize(8),
    height: Mixin.moderateSize(40),
    // width: Mixin.moderateSize(343),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#C6C6C6',
    borderWidth: 1,
  },
  filledContainer: {
    backgroundColor: 'white',
  },
  shadow: {
    ...GlobalStyles.shadow,
  },
  inputContainerFocused: {
    borderWidth: 1,
    borderColor: theme.colors?.primary,
  },
  inputContainerError: {
    borderWidth: 1,
    borderColor: theme.colors?.error,
  },
  alternative: {
    backgroundColor: theme.colors?.inputAlternative,
  },
  input: {
    fontWeight: '500',
    fontSize: Mixin.moderateSize(14),
    flex: 1,
    color: 'black',
    marginTop: Mixin.moderateSize(4),
    textAlignVertical: 'top',
    paddingVertical: 0,
    paddingLeft: 0,
  },
  floatedLabel: {
    fontSize: Mixin.moderateSize(12),
  },
  disabledLabel: {
    color: theme.colors?.grey3,
  },
  label: {
    // height: Mixin.moderateSize(38),
    fontSize: Mixin.moderateSize(14),
    flex: 1,
    color: theme.colors?.grey3,
  },
  focusLabel: {
    color: theme.colors?.primary,
  },
  errorLabel: {
    color: theme.colors?.error,
  },
  errorMessage: {
    fontSize: Mixin.moderateSize(16),
    lineHeight: Mixin.moderateSize(24),
    color: theme.colors?.error,
  },
  renderRightContainer: {
    marginLeft: Mixin.moderateSize(4),
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  showPassword: {
    fontSize: Mixin.moderateSize(14),
    color: theme.colors?.primary,
    fontWeight: '500',
  },
}));

const AppInput = forwardRef((props: IAppInputProps, ref: Ref<IAppInputRef>) => {
  const {label, value} = props;
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [hidePassword, setHidePassword] = useState(props.isPassword);
  const onFocus = () => {
    if (props.editable === false) {
      return;
    }
    setIsFocus(true);
    setTimeout(() => {
      if (inputRef) {
        inputRef.current?.focus();
      }
    }, 100);
  };
  useImperativeHandle(ref, () => ({
    focus() {
      onFocus();
    },
  }));
  const checkFloatedLabel = () => {
    if (!_.isEmpty(value)) {
      return true;
    }
    if (isFocus) {
      return true;
    }
    return false;
  };
  const showError = () => {
    if (isFocus) {
      return false;
    }
    if (!_.isEmpty(props.error)) {
      return true;
    }
    return false;
  };
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.onPress ? props.onPress() : onFocus()}
        style={[
          styles.inputContainer,
          props.filled ? styles.filledContainer : null,
          props.alternative ? styles.alternative : null,
          props.shadow ? styles.shadow : null,
          isFocus ? styles.inputContainerFocused : null,
          showError() ? styles.inputContainerError : null,
          props.containerStyles,
        ]}>
        {checkFloatedLabel() ? (
          <View style={{flex: 1}}>
            {props.hideLabel && (
              <Text
                style={[
                  styles.floatedLabel,
                  isFocus ? styles.focusLabel : null,
                  showError() ? styles.errorLabel : null,
                  props.disabledLabel ? styles.disabledLabel : null,
                ]}>
                {label}
              </Text>
            )}
            <TextInput
              {...props}
              secureTextEntry={hidePassword}
              onChangeText={text => {
                if (props.onChangeText) {
                  if (
                    props.keyboardType === 'decimal-pad' &&
                    _.last(text) === ','
                  ) {
                    props.onChangeText(text.replace(/.$/, '.'));
                  } else {
                    props.onChangeText(text);
                  }
                }
              }}
              onFocus={e => {
                setIsFocus(true);
                if (props.onFocus) {
                  props.onFocus(e);
                }
              }}
              onBlur={e => {
                setIsFocus(false);
                if (props.onBlur) {
                  props.onBlur(e);
                }
              }}
              ref={inputRef}
              style={[styles.input, props.style]}

            />
          </View>
        ) : (
          <Text style={[styles.label, props.labelStyle]}>{label}</Text>
        )}
        {props.isClear && value?.length > 0 ? (
          <TouchableOpacity
            onPress={() => props.onChangeText('')}
            style={{width: 20, height: 20}}>
            {
              <Image
                resizeMode={'contain'}
                source={images.closeIcon}
                style={styles.closeIcon}
              />
            }
          </TouchableOpacity>
        ) : null}
        {props.isPassword && value?.length > 0 ? (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={{height: 20, justifyContent: 'center'}}>
            {
            //  <AppText style={styles.showPassword}>{hidePassword ? "Show" : "Hide"}</AppText>
              <Icon name={hidePassword ? 'eye-off' : 'eye'} type="feather" size={16}/>
            }
          </TouchableOpacity>
        ) : null}
        {props.renderRight && props.renderRight}
      </TouchableOpacity>

      {showError() ? (
        <Text style={styles.errorMessage}>{props.error}</Text>
      ) : null}
    </View>
  );
});

export default AppInput;
