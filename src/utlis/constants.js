export const API_URLS = {
  SEND_OTP: "4001/v1/users/signup",
  VERIFY_OTP: "4001/v1/users/verify",
  UPDATE_USER: "4001/v1/users/update_user",
  FETCH_VENDORS: "4001/v1/users/filterVendors",
  FETCH_CITIES: "4001/v1/users/findCities",
  CREATE_PAYMENT: "4001/v1/users/book_service",
  GET_ALL_BOOKINGS: "4001/v1/users/get_all_bookings",

  CREATE_SERVICE: "4003/v1/create_service",
  VIEW_SERVICES: "4003/v1/view_service",
  DELETE_SERVICE: "4003/v1/delete_service",
  UPDATE_SERVICE: "4003/v1/update_service",

  UPDATE_VENDOR: "4002/v1/vendor/update_vendor",

  // SEND_OTP: "/v1/users/signup",
  // VERIFY_OTP: "/v1/users/verify",
  // UPDATE_USER: "/v1/users/update_user",

  // CREATE_SERVICE: "admin/v1/create_service",
  // VIEW_SERVICES: "admin/v1/view_service",
  // DELETE_SERVICE: "admin/v1/delete_service",
  // UPDATE_SERVICE: "admin/v1/update_service",
};

export const config = {
  ENCRYPTION_KEY: "EZZIFY-PESTO",
  ENVIRONMENT: "DEV",
  BASE_URL: "http://localhost:",
};
