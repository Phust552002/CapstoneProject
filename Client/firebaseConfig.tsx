import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdY1f99a6Fb5OugHEj-i3OYUdd2KhpF5U",
  authDomain: "rpa-project-68789.firebaseapp.com",
  projectId: "rpa-project-68789",
  storageBucket: "rpa-project-68789.appspot.com",
  messagingSenderId: "925337931877",
  appId: "1:925337931877:web:e6b98db96cc2e03739b68c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
