import { PayloadAction } from "@reduxjs/toolkit";
import {
  IBaseReducerState,
  createHandleReducer,
} from "../../helpers/reduxHelpers";
import { AuthenticationActions } from "../actions";

export interface IAuthenticationState extends IBaseReducerState {
  accountNumber?: string;
  accessToken?: string;
  userInfo?: any;
}

const initialState: IAuthenticationState = {
  accessToken: undefined,
  accountNumber: undefined,
  userInfo: undefined,
};

const setAuthenticationData = (
  state: IAuthenticationState,
  action: PayloadAction<IAuthenticationState>
) => {
  const { payload } = action;
  state.accessToken = payload.accessToken;
  state.userInfo = payload.userInfo;
};

const logOut = (state: IAuthenticationState) => {
  state.accessToken = undefined;
  state.userInfo = undefined;
};

const AuthenticationReducer = createHandleReducer(initialState, (builder) => {
  builder
    .addCase(
      AuthenticationActions.setAuthenticationData.request,
      setAuthenticationData
    )
    .addCase(AuthenticationActions.logout.request, logOut)
    .addCase(
      AuthenticationActions.setAccountNumber.request,
      (state: IAuthenticationState, action: PayloadAction<string>) => {
        state.accountNumber = action.payload;
      }
    );
});

export default AuthenticationReducer;
