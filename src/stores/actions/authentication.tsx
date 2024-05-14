import {ReduxHelper} from '../../helpers';
import { IAuthenticationState } from '../reducers/authentication';

export const prefix = 'AUTHENTICATION';

export const setAuthenticationData =
  ReduxHelper.generateLocalAction<IAuthenticationState>(prefix, 'SET_AUTHENTICATION_DATA');


export const setAccountNumber = ReduxHelper.generateLocalAction<string>(
  prefix,
  'SET_ACCOUNT_NUMBER',
);
export const setInitAccessToken = ReduxHelper.generateLocalAction<string>(
  prefix,
  'INIT_ACCESS_TOKEN',
);

export const logout = ReduxHelper.generateActions<undefined>(prefix, 'LOGOUT');
