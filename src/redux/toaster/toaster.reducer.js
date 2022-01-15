import { ToasterActionTypes } from "./toaster.types";

const INITIAL_STATE = {
  toasterConfig: {
    show: false,
    message: null,
    className: null,
  },
};

const toasterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ToasterActionTypes.SET_TOASTER:
      return {
        ...state,
        toasterConfig: action.payload,
      };

    default:
      return state;
  }
};

export default toasterReducer;
