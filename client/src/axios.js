import axios from "axios";
// import { redirectTo } from "./utilities/utility";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // window.open("/usersignup/", "_blank");
      // //   redirectTo("/usersignup");
    }
    return Promise.reject(error);
  }
);

export default axios;
