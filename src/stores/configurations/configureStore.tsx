import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import rootReducers, { RootReducer } from "./rootReducer";
import _ from "lodash";
import { PersistConfig } from "redux-persist/es/types";

const config: PersistConfig<RootReducer> = {
  key: "root",
  timeout: 0,
  storage: AsyncStorage,
  debug: true,
  stateReconciler: hardSet,
};
const middleware = [];

const reducers = persistReducer(config, rootReducers);
const persistConfig = {};
const store = createStore(reducers, {}, compose());
const persistor = persistStore(store, persistConfig as any, () => {});
const configureStore = () => {
  return { persistor, store };
};
export default configureStore;
