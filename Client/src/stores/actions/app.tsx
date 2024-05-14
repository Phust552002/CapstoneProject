import { ReduxHelper } from '../../helpers';

export const prefix = 'APP';
export const setConfig = ReduxHelper.generateLocalAction<any>(
  prefix,
  'SET_CONFIG',
);

export const setServerDown = ReduxHelper.generateLocalAction<boolean>(
  prefix,
  'SET_SERVER_DOWN',
);