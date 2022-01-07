import env from "react-dotenv";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./rootReducer";

const middlewares = [];

if (env.ENVIRONMENT === "DEV") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default { store };
