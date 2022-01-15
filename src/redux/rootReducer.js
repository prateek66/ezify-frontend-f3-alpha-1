import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import spinnerReducer from "./spinner/spinner.reducer";
import toasterReducer from "./toaster/toaster.reducer";

import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "toaster", "spinner"],
};

const rootReducer = combineReducers({
  user: userReducer,
  toaster: toasterReducer,
  spinner: spinnerReducer,
});

export default persistReducer(persistConfig, rootReducer);
