import { UserActionTypes } from "./user.types";

export const setCurrentUser = (token) => ({
  type: UserActionTypes.SET_CURRENT_USER_TOKEN,
  payload: token,
});
