import { createSelector } from "reselect";

const selectToaster = (state) => state.toaster;

export const selectToasterInfo = createSelector([selectToaster], (toaster) => toaster.toasterConfig);
