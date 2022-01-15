import { ToasterActionTypes } from "./toaster.types";

export const setToasterConfig = (toasterConfig) => ({
  type: ToasterActionTypes.SET_TOASTER,
  payload: toasterConfig,
});
