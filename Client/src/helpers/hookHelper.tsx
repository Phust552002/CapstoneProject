import {useTheme} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {useLoadingContext} from './loadingHelper';
import { RouteParamList } from '../navigation/RouteParamList';
import { RootReducer } from '../stores/configurations/rootReducer';

export const useBaseHook = () => {
  const {theme} = useTheme();
  const {showLoading, hideLoading} = useLoadingContext();
  const dispatch = useDispatch();
  return {
    theme,
    dispatch,
    showLoading,
    hideLoading,
  };
};
export const useGetNavigation = <T extends keyof RouteParamList | never>() => {
  type screenProps = NativeStackNavigationProp<RouteParamList>;
  let route;
  type RootRouteProps<RouteName extends keyof RouteParamList> = RouteProp<
    RouteParamList,
    RouteName
  >;
  route = useRoute<RootRouteProps<T>>();
  const navigation = useNavigation<screenProps>();
  return {
    navigation,
    route,
  };
};

// const store = configureStore().store;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;
