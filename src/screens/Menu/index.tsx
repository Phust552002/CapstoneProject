import React, { useState } from 'react';
import {
  FlatList,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { HookHelper } from "../../helpers";
import useStyles from "./styles";
import AppText from "../../components/atoms/AppText";
import { useGetNavigation } from "../../helpers/hookHelper";
import { Icon } from "react-native-elements";
import AppHeader from "../../components/atoms/Header";  
import { images } from "../../../assets";

const data = [
  {
    id: 1,
    title: "Tự động tắt 3g/4g",
    description:
      "Tự động kiểm tra và tắt 3g/4g vào thời gian đã chọn\nb1 : Chọn thời gian hàng ngày bạn muốn tắt tự động ...",
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
  // {
  //   id: 4,
  //   title: "Điều chỉnh cỡ chữ",
  //   description: "Tự động phóng to hay thu nhỏ cỡ chữ trên điện thoại",
  //   image: images.font,
  // },
];

const Item = (item: any) => {
  const { title, image } = item;
  const styles = useStyles();
  const [isLiked, setIsLiked] = useState(false);
  const { navigation } = useGetNavigation();
  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.itemContainer}>
      <Image source={image} style={styles.itemImage} />
      <View style={styles.itemContentContainer}>
        <View style={{ flex: 1 }}>
          <AppText h6>{title}</AppText>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.heartBtn}onPress={toggleHeart}>
          <Icon name="heart" color={isLiked ? '#FF69B4' : '#9586A8'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddService', {service: item})}>
            <Icon name="plus" type="feather" color={"white"} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const MenuScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = useState(data);

  const styles = useStyles(theme);
  const handleSearch = (text: string) => {
    const newData = data.filter((item) => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchText(text);
    setFilteredData(newData);
  };

  return (
    <View style={{ ...styles.container, flex: 1 }}>
      <AppHeader title={""} />
      <AppText style={styles.title}>Hệ thống</AppText>

      {/* <View style={styles.searchContainer}>
        <Icon name="search" type="feather" color={"black"} size={20} />
        <TextInput
          style={styles.exploreSearchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => handleSearch(text)}
        />
      </View> */}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item {...item} />
        )}
        style={{flex: 1}} 
      />
    </View>
  );
};
