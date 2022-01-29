import { UserActionTypes } from "./user.types";

export const setCurrentUserToken = (token) => ({
  type: UserActionTypes.SET_CURRENT_USER_TOKEN,
  payload: token,
});

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
