import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectToken = createSelector(
    [selectUser],
    (user) => user.token
);