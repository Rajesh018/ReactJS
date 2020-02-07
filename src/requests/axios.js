// import {  toast } from "react-toastify";
import axios from "axios";
import {  getResponseStatus } from "./helper";
import {toast} from "react-toastify";


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  try{
    if(["PATCH", "PUT", "POST", "DELETE"].indexOf((response.config.method).toUpperCase()) >= 0){
      const { status } = response;
      if(getResponseStatus(status, 400) || getResponseStatus(status, 500)){
        // toast.error("Something unexpected happened");
      }
    }
  }catch (e) {
  }
  return response;
}, function (error) {
  if(error){
    const { response } = error;

    if(response && response.status &&  getResponseStatus(response.status, 400)){
      const {	statusText, status, data: {	detail, details } } = response;
      try{
        if(statusText === "Bad Request"){
          // toast.error(detail || details);
        } else if(statusText === "Forbidden" || statusText === "Unauthorized") {
          // toast.error("Redirecting to login page");
          setTimeout(() => {
            // window.location.reload();
            // window.location.href = `/sign-in`;
          }, 1000);
        } else{
          // toast.error("We couldn't complete your request. Please refresh your page. If you get same error, Please contact System Admin");
        }
        if(status === 503){
          toast.error("Backend API server not functioning")
        }
      }catch (e) {
        toast.error("We couldn't complete your request. Please refresh your page. If you get same error, Please contact System Admin");
      }
    }
  }
  // Do something with response error
  return Promise.reject(error);
});
export  default axios;