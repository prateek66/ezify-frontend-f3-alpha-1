import React, { useContext, useEffect } from "react";
import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { API_URLS } from "../../utlis/constants";
import "./Header.scss";

const Header = () => {
  const ApiContext = useContext(ApiCallsContext);

  const sampleAPICall = async () => {
    const postObj = {
      name: "Harshit",
    };
    const data = await ApiContext.postData(API_URLS.SAMPLE_URL, postObj);

    console.log(data);
  };

  useEffect(() => {
    catchHandler(sampleAPICall);
  }, []);

  return (
    <div>
      <h1>Header</h1>
    </div>
  );
};

export default Header;
