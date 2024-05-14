import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { useAppSelector, useBaseHook } from "../hookHelper";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const useAuth = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onLogin = async (phoneString: string, passwordString: string) => {
    showLoading();
    const gmailString = `${phoneString}@gmail.com`;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        gmailString,
        passwordString
      );
      hideLoading();
      return {
        userCredential: userCredential,
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

  const onRegister = async (phoneString: string, passwordString: string) => {
    showLoading();
    const gmailString = `${phoneString}@gmail.com`;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        gmailString,
        passwordString
      );
      const userInfo = {
        phone: phoneString,
        password: passwordString,
        token: userCredential.user.uid,
      };

      const userRef = doc(db, "Users", userCredential.user.uid);
      await setDoc(userRef, userInfo);

      hideLoading();
      return {
        userCredential: userCredential,
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

  const onGetUserInfo = async (userToken: string) => {
    showLoading();
    try {
      if (!userToken) {
        hideLoading();
        return {
          error: "Unauthorized access!",
          isSuccessful: false,
        };
      }
      const userRef = doc(db, "Users", userToken);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
      hideLoading();
      return {
        userData: docSnap.data(),
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
    onLogin,
    onRegister,
    onGetUserInfo,
  };
};
