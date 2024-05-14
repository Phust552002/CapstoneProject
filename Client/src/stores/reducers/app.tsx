import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  IBaseReducerState,
  createHandleReducer,
} from '../../helpers/reduxHelpers';
import {AppActions} from '../actions';
interface IAppState extends IBaseReducerState {
  appConfig: Partial<any>;
  is_server_down?: boolean;
}

const initialState: IAppState = {
  appConfig: {},
};

const AppReducer = createHandleReducer(initialState, builder => {
  builder
    .addCase(
      AppActions.setConfig.request,
      (state: IAppState, action: PayloadAction<any>) => {
        state.appConfig = {
          ...state.appConfig,
          ...action.payload,
        };
      },
    )
    .addCase(
      AppActions.setServerDown.request,
      (state: IAppState, action: PayloadAction<boolean>) => {
        state.is_server_down = action.payload;
      },
    );
});

export default AppReducer;
