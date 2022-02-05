import React from "react";
import axios from "axios";
import { decryption, encyption } from "../utlis/security.utlis";
import { setSpinner } from "../redux/spinner/spinner.actions";
import { connect } from "react-redux";
import { API_URLS, config } from "../utlis/constants";

export const ApiCallsContext = React.createContext();

const ApiContext = ({ children, setSpinner }) => {
  const getData = (url, options) => {
    setSpinner(true);
    return new Promise((resolve, reject) => {
      const path = `${config.BASE_URL}${url}`;
      axios
        .get(path, options)
        .then((response) => {
          let resData = response.data.data;
          if (config.ENVIRONMENT === "PROD") {
            resData = decryption(resData);
          }
          setSpinner(false);
          resolve(resData);
        })
        .catch((err) => {
          setSpinner(false);
          reject(err);
        });
    });
  };

  const postData = (url, postObj, options) => {
    setSpinner(true);
    return new Promise((resolve, reject) => {
      const path = `${config.BASE_URL}${url}`;

      console.log(postObj);

      let data = postObj;
      if (config.ENVIRONMENT === "PROD") {
        data = {
          data: encyption(postObj),
        };
      }

      axios
        .post(path, data, options)
        .then((response) => {
          console.log(response.data);
          let resData = response.data.data;
          if (config.ENVIRONMENT === "PROD") {
            resData = decryption(resData);

            console.log(resData);
          }

          setSpinner(false);
          resolve(resData);
        })
        .catch((err) => {
          console.log(err);
          setSpinner(false);
          const errorResponse = err.response.data;
          reject(errorResponse);
        });
    });
  };

  const patchData = (url, postObj, options) => {
    setSpinner(true);
    return new Promise((resolve, reject) => {
      const path = `${config.BASE_URL}${url}`;

      console.log(url !== API_URLS.UPDATE_VENDOR);
      console.log(url);
      console.log(API_URLS.UPDATE_VENDOR);

      let data = postObj;
      if (config.ENVIRONMENT === "PROD" && url !== API_URLS.UPDATE_USER && url !== API_URLS.UPDATE_VENDOR) {
        data = {
          data: encyption(postObj),
        };
      }

      axios
        .patch(path, data, options)
        .then((response) => {
          let resData = response.data.data;
          if (config.ENVIRONMENT === "PROD") {
            resData = decryption(resData);
          }
          setSpinner(false);
          resolve(resData);
        })
        .catch((err) => {
          setSpinner(false);
          const errorResponse = err.response.data;
          reject(errorResponse);
        });
    });
  };

  const deleteData = (url, options) => {
    setSpinner(true);
    return new Promise((resolve, reject) => {
      const path = `${config.BASE_URL}${url}`;

      axios
        .delete(path, options)
        .then((response) => {
          let resData = response.data.data;
          if (config.ENVIRONMENT === "PROD") {
            resData = decryption(resData);
          }
          setSpinner(false);
          resolve(resData);
        })
        .catch((err) => {
          setSpinner(false);
          const errorResponse = err.response.data;
          reject(errorResponse);
        });
    });
  };

  return <ApiCallsContext.Provider value={{ getData, postData, patchData, deleteData }}>{children}</ApiCallsContext.Provider>;
};

const mapDispatchToProps = (dispatch) => ({
  setSpinner: (config) => dispatch(setSpinner(config)),
});

export default connect(null, mapDispatchToProps)(ApiContext);
