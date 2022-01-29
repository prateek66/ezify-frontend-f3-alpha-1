import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";


import { ApiCallsContext } from "../../../../services/api.service";
import { catchHandler } from "../../../../utlis/catchHandler.utlis";
import { API_URLS } from "../../../../utlis/constants";

import CustomButton from "../../../atmoic/customButton/customButton";

import "./servicesPopup.scss";

const ServicesPopup = ({ values, prevStep, updateState, nextStep }) => {
  const ApiContext = useContext(ApiCallsContext);

  const [services, setServices] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedServices, setSelectedServices] = useState(values.services);

  const [submitBtnAttributes, setSubmitBtnAttributes] = useState({
    type: "button",
    text: "Next",
    classes: "font-weight-bold cp-2",
    disabled: true,
  });

  const backBtnAttributes = {
    type: "button",
    text: "BACK",
    classes: "font-weight-bold cp-2",
    onClick: prevStep,
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await catchHandler(fetchServicesAPI);

    if (Array.isArray(response) && response.length > 0) {
      const services = [];
      response.forEach((data) => {
        services.push({
          label: data.name,
          value: data._id,
          basePrice: 0,
        });
      });
      setServices(services);
      setOptions(services);
    }

    if (values.services.length === 3) {
      setOptions([]);
    }
  };

  const fetchServicesAPI = async () => {
    const data = await ApiContext.getData(API_URLS.VIEW_SERVICES);
    return data;
  };

  const onServiceChange = (el) => {
    setSelectedServices(el);
    if (el.length >= 3) {
      setOptions([]);
    } else {
      setOptions(services);
    }
  };

  const onBasePriceChange = (value, id) => {
    const listedServices = selectedServices.map((service) => {
      if (service.value === id) {
        service.basePrice = +value;
      }

      return service;
    });

    setSelectedServices(listedServices);
  };

  useEffect(() => {
    console.log(selectedServices);

    updateState("services", selectedServices);
    selectedServices.forEach((service) => {
      if (service.basePrice <= 0) {
        setSubmitBtnAttributes({
          type: "button",
          text: "Next",
          classes: "font-weight-bold cp-2",
          disabled: true,
        });
      } else {
        setSubmitBtnAttributes({
          type: "button",
          text: "Next",
          classes: "font-weight-bold cp-2",
          disabled: false,
          onClick: nextStep,
        });
      }
    });
  }, [selectedServices]);

  return (
    <div className="servicesPopup">
      <Modal.Header closeButton>📃 Hi, {values.firstName}</Modal.Header>
      <Modal.Body>
        <div className="container">
          <p>
            Select the services you are going to <br />
            provide to the users with base price. <br />
            <small>
              <b>Note: You can select at most 3 services only</b>
            </small>
          </p>

          <form>
            <div className="row mb-3">
              <div className="col-12">
                <Select id="servicesList" options={options} defaultValue={values.services} isMulti onChange={onServiceChange} />
              </div>
            </div>
            {selectedServices.length > 0 && (
              <div className="row">
                <div className="col-6">
                  <div className="font-weight-bold mb-2">Service Name</div>
                  <div className="d-flex flex-column justify-content-between">
                    {selectedServices.map((service, index) => {
                      return (
                        <div key={index} className="mb-2">
                          {service.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-4">
                  <div className="font-weight-bold">Base Price (₹)</div>
                  {selectedServices.map((service, index) => {
                    return (
                      <input
                        key={index}
                        type="number"
                        onChange={(e) => onBasePriceChange(e.target.value, service.value)}
                        className="mb-2 form-control formControl-input"
                        value={service.basePrice}
                      ></input>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="row mt-3">
              <div className="col-12 d-flex align-items-center justify-content-between">
                <CustomButton {...backBtnAttributes} />
                <CustomButton {...submitBtnAttributes} />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </div>
  );
};

export default ServicesPopup;
