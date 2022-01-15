import { ToasterActionTypes } from "./toaster.types";

const INITIAL_STATE = {
  toasterConfig: {
    show: true,
    message: "Harshit is a very good boy",
    className: "success",
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
