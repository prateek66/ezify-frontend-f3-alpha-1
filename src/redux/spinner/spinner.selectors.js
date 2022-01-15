import { createSelector } from "reselect";

const selectSpinner = (state) => state.spinner;

export const selectSpinnerInfo = createSelector([selectSpinner], (spinner) => spinner.show);
