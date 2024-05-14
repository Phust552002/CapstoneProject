import React from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppText from "../../components/atoms/AppText";
import { BannerSlider } from "../../components/modules/BannerSlider";
import { Item3g4g } from "../../components/modules/Item3g4g";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { ItemZalo } from "../../components/modules/ItemZalo";
import { ItemFont } from "../../components/modules/ItemFont";

export const AddServiceScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation, route } = useGetNavigation<"AddService">();

  const service = route.params.service;

  const styles = useStyles(theme);

  const renderContent = () => {
    switch (service.id) {
      case 1:
        return <Item3g4g />;
      case 2:
        return <ItemZalo />;
      case 3:
        return <ItemFont />;
      default:
        return <View />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
        <Icon name="chevron-left" size={30} />
      </TouchableOpacity>

      <BannerSlider
        images={[
          service.image,
          service.image,
          service.image,
          service.image,
          service.image,
        ]}
      />

      <View style={styles.bottomContainer}>
        <AppText style={styles.title}>{service.title}</AppText>
        <AppText style={styles.descriptionText}>{service.description}</AppText>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

export default AddServiceScreen;
