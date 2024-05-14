import React, { useEffect } from "react";
import {
  FlatList,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { HookHelper } from "../../helpers";
import useStyles from "./styles";
import AppText from "../../components/atoms/AppText";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import { Icon } from "react-native-elements";
import AppHeader from "../../components/atoms/Header";
import { images } from "../../../assets";
import { useFocusEffect } from "@react-navigation/native";
import { UserActions } from "../../stores/actions";

const data = [
  {
    id: 1,
    title: "Hủy gia hạn 3g/4g",
    description:
      "Tự động kiểm tra và hủy gia hạn 3g/4g vào thời gian đã chọn\nb1 : Chọn thời gian hàng ngày bạn muốn hủy gia hạn ...\nb2: Chọn nhà mạng",
    image: images.image3g4g,
  },
  {
    id: 2,
    title: "Xóa bộ nhớ Zalo",
    description: "Tự động kiểm tra và xóa bộ nhớ Zalo",
    image: images.zalo,
  },
  {
    id: 3,
    title: "Điều chỉnh cỡ chữ",
    description: "Tự động phóng to hay thu nhỏ cỡ chữ trên điện thoại",
    image: images.font,
  },
];

const Item = ({ item, getData }: any) => {
  const { title, image } = item;
  const { theme, dispatch } = HookHelper.useBaseHook();

  const styles = useStyles();
  const { navigation } = useGetNavigation();

  const deleteItem = () => {
    switch (item.id) {
      case 1:
        dispatch(UserActions.setService3g4g.request(undefined));
        break;
      case 2:
        dispatch(UserActions.setServiceZalo.request(undefined));
        break;
      case 3:
        dispatch(UserActions.setServiceFont.request(undefined));
        break;
    }
    getData();
  };

  return (
    <View style={styles.itemContainer}>
      <Image source={image} style={styles.itemImage} />
      <View style={styles.itemContentContainer}>
        <View style={{ flex: 1 }}>
          <AppText h6>{title}</AppText>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.addBtn} onPress={() => deleteItem()}>
            <AppText white caption>
              Xóa
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() =>
              navigation.navigate("EditService", { service: item })
            }
          >
            <AppText white caption>
              Thay đổi
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const HomeScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const [searchText, setSearchText] = React.useState("");
  const styles = useStyles(theme);
  const userReducer = useAppSelector((state) => state.UserReducer);
  const [serviceData, setServiceData] = React.useState<any>([]);

  const getData = () => {
    const tempData = [];
    if (userReducer.service3g4g) {
      const service = { ...data[0], ...userReducer.service3g4g };
      tempData.push(service);
    }
    if (userReducer.serviceZalo) {
      const service = { ...data[1], ...userReducer.serviceZalo };
      tempData.push(service);
    }
    if (userReducer.serviceFont) {
      const service = { ...data[2], ...userReducer.serviceFont };
      tempData.push(service);
    }
    setServiceData(tempData);
  };

  useEffect(() => {
    getData();
  }, [userReducer]);

  return (
    <View style={styles.container}>
      <AppHeader title={""} />
      <AppText style={styles.title}>Công việc đang chạy</AppText>

      {/* <View style={styles.searchContainer}>
        <Icon name="search" type="feather" color={"black"} size={20} />
        <TextInput
          style={styles.exploreSearchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View> */}

      <FlatList
        data={serviceData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item item={item} getData={getData} />}
      />
    </View>
  );
};
