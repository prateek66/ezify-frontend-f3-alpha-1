import { SpinnerActionTypes } from "./spinner.types";

const INITIAL_STATE = {
  show: false,
};

const spinnerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpinnerActionTypes.SET_SPINNER:
      return {
        ...state,
        show: action.payload,
      };

    default:
      return state;
  }
};

export default spinnerReducer;
