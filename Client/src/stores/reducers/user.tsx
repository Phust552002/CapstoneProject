import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  IBaseReducerState,
  createHandleReducer,
} from "../../helpers/reduxHelpers";
import { UserActions } from "../actions";
import { IService3g4g, IServiceFont, IServiceZalo } from "../../model/IService";
interface IUserState extends IBaseReducerState {
  service3g4g?: IService3g4g;
  serviceFont?: IServiceFont;
  serviceZalo?: IServiceZalo;
}

const initialState: IUserState = {};

const setService3g4g = (
  state: IUserState,
  action: PayloadAction<IService3g4g>
) => {
  state.service3g4g = action.payload;
};

const setServiceFont = (
  state: IUserState,
  action: PayloadAction<IServiceFont>
) => {
  state.serviceFont = action.payload;
};

const setServiceZalo = (
  state: IUserState,
  action: PayloadAction<IServiceZalo>
) => {
  state.serviceZalo = action.payload;
};

const UserReducer = createHandleReducer(initialState, (builder) => {
  builder
    .addCase(UserActions.setService3g4g.request, setService3g4g)
    .addCase(UserActions.setServiceFont.request, setServiceFont)
    .addCase(UserActions.setServiceZalo.request, setServiceZalo);
});

export default UserReducer;
