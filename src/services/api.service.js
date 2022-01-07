import env from "react-dotenv";
import React from "react";
import axios from "axios";
import { decryption, encyption } from "../utlis/security.utlis";

export const ApiCallsContext = React.createContext();

const ApiContext = ({ children }) => {
  const getData = (url, options) => {
    return new Promise((resolve, reject) => {
      const path = `${env.BASE_URL}${url}`;
      axios
        .get(path, options)
        .then((response) => {
          let resData = response.data.data;
          if (env.ENVIRONMENT === "PROD") {
            resData = decryption(resData);
          }
          resolve(resData);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const postData = (url, postObj, options) => {
    return new Promise((resolve, reject) => {
      const path = `${env.BASE_URL}${url}`;

      let data = postObj;
      if (env.ENVIRONMENT === "PROD") {
        data = {
          data: encyption(postObj),
        };
      }

      axios
        .post(path, data, options)
        .then((response) => {
          let resData = response.data.data;
          if (env.ENVIRONMENT === "PROD") {
            resData = decryption(resData);
          }
          resolve(resData);
        })
        .catch((err) => {
          const errorResponse = err.response.data;
          reject(errorResponse);
        });
    });
  };

  const patchData = (url, postObj, options) => {
    return new Promise((resolve, reject) => {
      const path = `${env.BASE_URL}${url}`;

      let data = postObj;
      if (env.ENVIRONMENT === "PROD") {
        data = {
          data: encyption(postObj),
        };
      }

      axios
        .patch(path, data, options)
        .then((response) => {
          let resData = response.data.data;
          if (env.ENVIRONMENT === "PROD") {
            resData = decryption(resData);
          }
          resolve(resData);
        })
        .catch((err) => {
          const errorResponse = err.response.data;
          reject(errorResponse);
        });
    });
  };

  return <ApiCallsContext.Provider value={{ getData, postData, patchData }}>{children}</ApiCallsContext.Provider>;
};

export default ApiContext;
