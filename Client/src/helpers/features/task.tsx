import { collection, addDoc, doc } from "firebase/firestore";
import { useAppSelector, useBaseHook } from "../hookHelper";
import { ITask } from "../../model/ITask";
import { db } from "../../../firebaseConfig";

export const useTask = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onAddTask = async (data: ITask) => {
    showLoading();
    try {
      if (!authenticationReducer?.accessToken) {
        hideLoading();
        return {
          error: "Unauthorized access!",
          isSuccessful: false,
        };
      }
      const taskdata = {
        ...data,
        userId: authenticationReducer?.accessToken,
      };
      const userRef = collection(db, "Tasks Result");
      await addDoc(userRef, taskdata);

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
    onAddTask,
  };
};
