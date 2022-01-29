import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  token: null,
  details: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
