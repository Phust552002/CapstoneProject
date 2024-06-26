
import React from 'react';
import {View} from 'react-native';
import {Image, makeStyles} from 'react-native-elements';
import AppText from './AppText';
import { BottomModal, IBottomModal } from './BottomModal';
import { useBaseHook } from '../../helpers/hookHelper';
import { Mixin } from '../../helpers';
import { images } from '../../../assets';

interface IErrorModal extends IBottomModal {
  title: string;
  description?: string;
}
const useStyles = makeStyles(theme => ({
  icon: {
    width: Mixin.moderateSize(80),
    height: Mixin.moderateSize(80),
    marginTop: Mixin.moderateSize(30),
  },
  confirmTitle: {
    width: '80%',
    textAlign: 'center',
    marginTop: Mixin.moderateSize(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonConfirm: {
    marginHorizontal: Mixin.moderateSize(4),
    flex: 1,
  },
}));

export const SuccessModal = (props: IErrorModal) => {
  const {theme} = useBaseHook();
  const styles = useStyles(theme);
  return (
    <BottomModal {...props}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <Image source={images.success} style={styles.icon} />
        <AppText style={styles.confirmTitle} h6>
          {props.title}
        </AppText>
        {props.description && (
          <AppText style={styles.confirmTitle} caption>
            {props.description}
          </AppText>
        )}
      </View>
    </BottomModal>
  );
};
