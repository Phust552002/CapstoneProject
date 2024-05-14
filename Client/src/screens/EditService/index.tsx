import React, { useEffect, useRef, useState } from "react";
import { View, Image, TouchableOpacity, TextInput } from "react-native";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import AppHeader from "../../components/atoms/Header";
import AppText from "../../components/atoms/AppText";
import { Item3g4g } from "../../components/modules/Item3g4g";
import { ItemZalo } from "../../components/modules/ItemZalo";
import { ItemFont } from "../../components/modules/ItemFont";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Icon } from "react-native-elements";
import { AppRadioButton } from "../../components/atoms/AppRadio";
import { FlatList } from "react-native-gesture-handler";
import AppButton from "../../components/atoms/Button";
import { useFeedback } from "../../helpers/features/feedback";
import { showMessage } from "react-native-flash-message";

const data = [
  {
    id: 1,
    title: "Tuyệt vời",
  },
  {
    id: 2,
    title: "Ổn",
  },
  {
    id: 3,
    title: "Không hữu ích",
  },
  {
    id: 4,
    title: "Tệ",
  },
];

const ServiceFeedback = ({
  bottomSheetRef,
  bottomImproveSheetRef,
  feedbackQuanlity,
  setFeedbackQuanlity,
}: any) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  return (
    <View>
      <TouchableOpacity
        onPress={() => bottomSheetRef.current.close()}
        style={styles.closeIcon}
      >
        <Icon name="close" size={20} />
      </TouchableOpacity>
      <View style={styles.feedbackContainer}>
        <AppText style={styles.feedbackTitle}>Đánh giá chức năng</AppText>
        <AppText subtitle3>
          Chúng tôi rất vui khi được biết trải nghiệm của bạn về chức năng này!
        </AppText>
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AppRadioButton
                value={item}
                selectedValue={feedbackQuanlity}
                onSelect={() => setFeedbackQuanlity(item)}
              />
            )}
          />
        </View>
        <AppButton
          title="Tiếp"
          customBtnStyle={styles.buttonStyle}
          onPress={() => {
            bottomSheetRef.current.close();
            bottomImproveSheetRef.current.expand();
          }}
        />
      </View>
    </View>
  );
};

const ServiceImprove = ({ bottomSheetRef, note, setNote, addFeedback }: any) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          bottomSheetRef.current.close();
          setNote("");
        }}
        style={styles.closeIcon}
      >
        <Icon name="close" size={20} />
      </TouchableOpacity>
      <View style={styles.improveContainer}>
        <AppText style={styles.feedbackTitle}>
          Chúng tôi có thể làm gì để cải thiện
        </AppText>
        <AppText subtitle3>
          Chúng tôi rất tiếc khi biết bạn không thích chức năng này! Hãy chia sẻ
          những gì chúng tôi có thể làm để cải thiện.
        </AppText>
        <View>
          <TextInput
            placeholder="Chức năng có lỗi gì hay cần cải thiện như thế nào"
            multiline
            style={styles.inputStyle}
            value={note}
            onChangeText={(text) => setNote(text)}
          />
        </View>
        <AppButton
          title="Gửi"
          customBtnStyle={styles.buttonStyle}
          onPress={() => {
            addFeedback();
            bottomSheetRef.current.close();
          }}
        />
      </View>
    </View>
  );
};

export const EditServiceScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation, route } = useGetNavigation<"EditService">();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomImproveSheetRef = useRef<BottomSheet>(null);
  const [feedbackQuanlity, setFeedbackQuanlity] = useState(data[0]);
  const [note, setNote] = useState("");
  const service = route.params.service;
  const styles = useStyles(theme);

  const { onAddFeedback } = useFeedback();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const addFeedback = async () => {
    const response = await onAddFeedback({
      serviceName: service.title,
      feedback: note,
      quality: feedbackQuanlity.title,
    });
    if (response.isSuccessful) {
      showMessage({
        message: "Gửi phản hồi thành công",
        type: "success",
      });
      setFeedbackQuanlity(data[0]);
      setNote("");
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: "Error",
          description: response.error.message,
        });
      }, 200);
    }
  };
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const renderContent = () => {
    switch (service.id) {
      case 1:
        return <Item3g4g isEdit service={service} />;
      case 2:
        return <ItemZalo isEdit service={service} />;
      case 3:
        return <ItemFont isEdit service={service} />;
      default:
        return <View />;
    }
  };
  return (
    <View style={styles.container}>
      <AppHeader title={""} />
      <View style={styles.headerContainer}>
        <AppText style={styles.title}>{service.title}</AppText>
        <TouchableOpacity
          style={styles.responseBtn}
          onPress={() => {
            bottomSheetRef.current?.expand();
          }}
        >
          <AppText h5 white>
            Phản hồi
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.shadowBox}>
        <Image source={service.image} style={styles.image} />
      </View>
      {renderContent()}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        backgroundStyle={{ borderRadius: 18 }}
        children={
          <BottomSheetView style={styles.contentContainer}>
            <ServiceFeedback
              bottomSheetRef={bottomSheetRef}
              bottomImproveSheetRef={bottomImproveSheetRef}
              feedbackQuanlity={feedbackQuanlity}
              setFeedbackQuanlity={setFeedbackQuanlity}
            />
          </BottomSheetView>
        }
        snapPoints={["70%"]}
      />
      <BottomSheet
        ref={bottomImproveSheetRef}
        index={-1}
        backgroundStyle={{ borderRadius: 18 }}
        children={
          <BottomSheetView style={styles.contentContainer}>
            <ServiceImprove
              bottomSheetRef={bottomImproveSheetRef}
              note={note}
              setNote={setNote}
              addFeedback={addFeedback}
            />
          </BottomSheetView>
        }
        snapPoints={["70%"]}
      />
    </View>
  );
};
