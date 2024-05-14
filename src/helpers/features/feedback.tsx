import { collection, addDoc, doc } from "firebase/firestore";
import { useAppSelector, useBaseHook } from "../hookHelper";
import { IFeedback } from "../../model/IFeedback";
import { db } from "../../../firebaseConfig";

export const useFeedback = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onAddFeedback = async (data: IFeedback) => {
    showLoading();
    try {
      if (!authenticationReducer?.accessToken) {
        hideLoading();
        return {
          error: "Unauthorized access!",
          isSuccessful: false,
        };
      }
      const feedback = {
        ...data,
        userId: authenticationReducer?.accessToken,
      };
      const userRef = collection(db, "Feedbacks");
      await addDoc(userRef, feedback);

      hideLoading();
      return {
        isSuccessful: true,
      };
    } catch (error: any) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  return {
    onAddFeedback,
  };
};
