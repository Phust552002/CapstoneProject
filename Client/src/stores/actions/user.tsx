import { ReduxHelper } from "../../helpers";
import { IService3g4g, IServiceFont, IServiceZalo } from "../../model/IService";

export const prefix = "USER";

export const setService3g4g = ReduxHelper.generateLocalAction<IService3g4g>(
  prefix,
  "SET_SERVICE_3G4G"
);

export const setServiceFont = ReduxHelper.generateLocalAction<IServiceFont>(
  prefix,
  "SET_SERVICE_FONT"
);

export const setServiceZalo = ReduxHelper.generateLocalAction<IServiceZalo>(
  prefix,
  "SET_SERVICE_ZALO"
);
