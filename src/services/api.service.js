import env from "react-dotenv";
import React from "react";
import axios from "axios";
import { decryption, encyption } from "../utlis/security.utlis";
import { setSpinner } from "../redux/spinner/spinner.actions";
import { connect } from "react-redux";

export const ApiCallsContext = React.createContext();

const ApiContext = ({ children, setSpinner }) => {
  const getData = (url, options) => {
    setSpinner(true);
    return new Promise((resolve, reject) => {
      const path = `${env.BASE_URL}${url}`;
      axios
        .get(path, options)
        .then((response) => {
          let resData = response.data.data;
          if (env.ENVIRONMENT === "PROD") {
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
      const path = `${env.BASE_URL}${url}`;

      console.log(path);

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
      const path = `${env.BASE_URL}${url}`;

      axios
        .delete(path, options)
        .then((response) => {
          let resData = response.data.data;
          if (env.ENVIRONMENT === "PROD") {
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
