import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { HookHelper } from "../../helpers";
import useStyles from "./styles";
import AppHeader from "../../components/atoms/Header";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { useFeedback } from "../../helpers/features/feedback";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { showMessage, hideMessage } from "react-native-flash-message";

export const FeedbackScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [serviceName, setServiceName] = useState("");
  const [note, setNote] = useState("");
  const { navigation } = HookHelper.useGetNavigation();
  const { onAddFeedback } = useFeedback();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const addFeedback = async () => {
    const response = await onAddFeedback({
      serviceName: serviceName,
      feedback: note,
    });
    if (response.isSuccessful) {
      showMessage({
        message: "Gửi phản hồi thành công",
        type: "success",
      });
      setServiceName("");
      setNote("");
      navigation.goBack();
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppHeader title="" />
        <AppText style={styles.title}>Phản hồi</AppText>
      </View>
      <View style={styles.bottomContainer}>
        <AppText style={styles.feedbackTitle}>
          Phản hồi của người dùng về chức năng
        </AppText>
        <AppText subtitle3>
          Chúng tôi rất vui khi được biết trải nghiệm của bạn về chức năng này!
        </AppText>
        <TextInput
          placeholder="Tên chức năng"
          multiline
          style={styles.nameInputStyle}
          value={serviceName}
          onChangeText={(text) => setServiceName(text)}
        />
        <TextInput
          placeholder="Chức năng có lỗi gì hay cần cải thiện như thế nào"
          multiline
          style={styles.inputStyle}
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <AppButton
          title="Gửi"
          customBtnStyle={styles.buttonStyle}
          onPress={() => {
            addFeedback();
          }}
        />
      </View>
      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </View>
  );
};
