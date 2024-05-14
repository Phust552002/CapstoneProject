import React from 'react';
import {
  Image,
  TextStyle,
  Touchable,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Header, HeaderProps, makeStyles} from 'react-native-elements';
import {useBaseHook, useGetNavigation} from '../../helpers/hookHelper';
import {device_width} from '../../helpers/Mixin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../../../assets';
interface IHeaderProps extends HeaderProps {
  title?: string;
  filled?: boolean;
  hideBack?: boolean;
  rightText?: boolean;
  onPressLeft?: () => void;
  onRightButton?: () => void;
  transparent?: boolean;
  renderRight?: Element;
  customStyle?: ViewStyle;
  leftIcon?: string;
  textStyles?: TextStyle;
  shadow?: boolean;
}
const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'trasparent',
    borderBottomWidth: 0,
    // paddingHorizontal: Mixin.moderateSize(16),
    // width: device_width,
    zIndex: 9999,
    width: '100%',
    right: 20
  },
  containerFilled: {
    backgroundColor: theme.colors?.primary,
  },
  containerTransparent: {
    backgroundColor: '#ECF0F3',
  },
  title: {
    fontSize: 24,
    width: '120%',
    textAlign: 'center',
  },
  titleFilled: {
    color: '#05253D',
    fontWeight: '700',
  },
  breakLine: {
    elevation: 8,
    height: 0.5,
    width: device_width,
    backgroundColor: theme.colors?.grey5,
  },
  icon: {
    width: 18,
    height: 18,
    top: 8
  },
}));
const AppHeader = (props: IHeaderProps) => {
  const {
    filled,
    title,
    hideBack,
    transparent,
    onPressLeft,
    customStyle,
    textStyles,
    shadow,
  } = props;
  const {theme} = useBaseHook();
  const {navigation} = useGetNavigation();
  const styles = useStyles(theme);
  return (
    <View>
      <Header
        containerStyle={[
          styles.container,
          filled ? styles.containerFilled : null,
          transparent ? styles.containerTransparent : null,
          customStyle,
        ]}
        rightComponent={props.renderRight ? props.renderRight : undefined}
        leftComponent={
          !hideBack ? (
            // <TouchableOpacity
            //   style={{justifyContent: 'center', alignItems: 'center'}}
            //   onPress={onPressLeft ? onPressLeft : () => navigation.goBack()}>
            //   <Image source={images.backIcon} style={styles.icon} />
            // </TouchableOpacity>
            <Icon name="chevron-left" size={30} onPress={onPressLeft ? onPressLeft : () => navigation.goBack()} />
          ) : undefined
        }
        centerComponent={{
          text: title,
          style: {
            ...styles.title,
            ...(filled || transparent ? styles.titleFilled : {}),
            ...textStyles,
          },
        }}
        {...props}
      />
      <View style={{overflow: 'hidden', paddingBottom: 10}}>
        {shadow && <View style={styles.breakLine} />}
      </View>
    </View>
  );
};
export default AppHeader;
