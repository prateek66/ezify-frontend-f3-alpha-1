import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { State, City } from "country-state-city";

import { ApiCallsContext } from "../../services/api.service";
import { catchHandler } from "../../utlis/catchHandler.utlis";
import { API_URLS } from "../../utlis/constants";

import CustomButton from "../atmoic/customButton/customButton";
import FormControl from "../atmoic/formControl/formControl";

import "./bannerForm.scss";
import { withRouter } from "react-router-dom";

const BannerForm = ({ history }) => {
  const ApiContext = useContext(ApiCallsContext);

  const formik = useFormik({
    initialValues: {
      city: "",
      serviceId: "",
      serviceName: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("Required"),
      serviceId: Yup.string().required("Required"),
      serviceName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const { city, serviceId, serviceName } = values;
      history.push(`/services/${serviceName}/${serviceId}/${city}`);
    },
  });

  const [btnAttributes, setBtnAttributes] = useState({
    type: "submit",
    text: "Search",
    classes: "cp-2",
    disabled: true,
  });

  const [services, setServices] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    formik.validateForm();
    fetchServices();
    fetchCities();
  }, []);

  const fetchServices = async () => {
    const response = await catchHandler(fetchServicesAPI);
    if (Array.isArray(response) && response.length > 0) {
      let fetchedServices = [];
      response.forEach((service) => {
        fetchedServices.push({
          label: service.name,
          value: service._id,
        });
      });
      setServices(fetchedServices);
    }
  };

  const fetchServicesAPI = async () => {
    const data = await ApiContext.getData(API_URLS.VIEW_SERVICES);
    return data;
  };

  const fetchCities = async () => {
    const response = await catchHandler(fetchCitiesAPI);

    console.log(response);
    if (Array.isArray(response) && response.length > 0) {
      let fetchedCities = [];
      response.forEach((city) => {
        if (city.trim().length > 0) {
          fetchedCities.push({
            label: city,
            value: city,
          });
        }
      });
      setCities(fetchedCities);
    }
  };

  const fetchCitiesAPI = async () => {
    const data = await ApiContext.getData(API_URLS.FETCH_CITIES);
    return data;
  };

  useEffect(() => {
    setBtnAttributes({
      type: "submit",
      text: "Search",
      classes: "cp-2",
      disabled: !formik.isValid,
    });
  }, [formik.isValid]);

  const cityFormControlAttributes = {
    id: "city",
    label: "City",
    isMandatory: true,
    type: "select-formik",
    options: cities,
    noOptionsMessage: "No vendor available in this city",
    onChange: (value) => {
      formik.setFieldValue("city", value.value);
    },
    formik,
  };

  const servicesFormControlAttributes = {
    id: "service",
    label: "Services",
    isMandatory: true,
    type: "select-formik",
    options: services,
    onChange: async (value) => {
      await formik.setFieldValue("serviceId", value.value);
      await formik.setFieldValue("serviceName", value.label);
    },
    formik,
  };

  return (
    <div className="bannerForm">
      <div className="bannerForm-heading">Find Services</div>

      <form className="bannerForm-form" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-12">
            <FormControl {...cityFormControlAttributes}></FormControl>
          </div>
          <div className="col-12">
            <FormControl {...servicesFormControlAttributes}></FormControl>
          </div>
          <div className="col-12 mt-2 d-flex align-items-center justify-content-end">
            <CustomButton {...btnAttributes}></CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(BannerForm);
