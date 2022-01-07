import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectToken = createSelector(
    [selectUser],
    (user) => user.token
);

export const selectUserDetails = createSelector(
    [selectUser],
    (user) => user.details
);