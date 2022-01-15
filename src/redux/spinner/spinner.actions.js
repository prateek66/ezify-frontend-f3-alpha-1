import { SpinnerActionTypes } from "./spinner.types";

export const setSpinner = (spinnerConfig) => ({
  type: SpinnerActionTypes.SET_SPINNER,
  payload: spinnerConfig,
});
