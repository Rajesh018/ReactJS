import axios from "./axios";
import {appendLanguageToURL, getResponseStatus, getSlug} from "./helper";


/**
 *
 * HTTP delete verb (Delete http request method)
 * @method
 * @name getRequest
 * @summary HTTP_METHOD::getRequest, use to call get requests
 * @description Common get request function
 * @param {string} url URL
 * @param {Object} config Object contain config, params
 * @example
 *  getRequest(<URL>).then((response) => {
 *    / Handle success response
 *  }, (error) => {
 *    // Handle error
 *  })
 * @returns {Promise} response
 */
export const getRequest = (url, config={}) => {
  return new Promise((resolve, reject) => {
    if (!config.params) {
      config.params = {};
    }
    axios.get(url, config)
      .then((response) => {
        const {data, status} = response;
        if (getResponseStatus(status, 200)) {
          resolve(data);
        }
      }).catch((error) => {
      reject(error);
    });
  });
};

/**
 *
 * HTTP delete verb (Delete http request method)
 * @method
 * @name deleteRequest
 * @summary HTTP_METHOD::deleteRequest, use to call delete requests
 * @description Common delete request function
 * @param {String} url URL
 * @param {Object} config config params
 * @example
 *  deleteRequest(<URL>, [Config]).then((response) => {
 *    / Handle success response
 *  }, (error) => {
 *    // Handle error
 *  })
 * @returns {Promise} response
 */
export const deleteRequest = (url, config) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, config)
      .then((response) => {
        const {data, status} = response;
        if (getResponseStatus(status, 200)) {
          resolve(data);
        }
      }).catch(() => {
      reject();
    });
  });
};

/**
 * HTTP post request
 * @method
 * @kind function
 * @name postRequest
 * @summary HTTP_METHOD::postRequest, use to call post requests
 * @description Common post request function
 * @param {String} url URL
 * @param {Object} data Object contain various data, example form data
 * @param {Object} config Other configurations
 * @example
 *  postRequest(<URL>, {name:"john doe", password:"****"})
 *    .then((response) => {
 *      // Success response
 *     }, (error) => {
 *      // Error handler
 *     })
 * @returns {Promise}
 */
export const postRequest = (url, data={}, config={}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config)
      .then((response) => {
        const {data, status} = response;
        if (getResponseStatus(status, 200)) {
          resolve(data);
        }
      }).catch((error) => {
      reject(error);
    });
  });
};

/**
 * HTTP put request
 * @method
 * @kind function
 * @name putRequest
 * @summary HTTP_METHOD::putRequest, use to call put requests
 * @description Common put request function
 * @param {String} url URL
 * @param {Object} data Object contain various data, example form data
 * @param {Object} config Configuration params
 * @example
 *  putRequest(<URL>, {name:"john doe", password:"****"})
 *    .then((response) => {
 *      // Success response
 *     }, (error) => {
 *      // Error handler
 *     })
 * @returns {Promise}
 */
export const putRequest = (url, data, config) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data, config)
      .then((response) => {
        const {data, status} = response;
        if (getResponseStatus(status, 200)) {
          resolve(data);
        }
      }).catch((error) => {
      reject(error);
    });
  });
};

/**
 * HTTP patch request
 * @method
 * @kind function
 * @name patchRequest
 * @summary HTTP_METHOD::patchRequest, use to call patch requests
 * @description Common patch request function
 * @param {String} url URL
 * @param {Object} data Object contain various data, example form data
 * @example
 *  patchRequest(<URL>, {name:"john doe", password:"****"})
 *    .then((response) => {
 *      // Success response
 *     }, (error) => {
 *      // Error handler
 *     })
 * @returns {Promise}

 */
export const patchRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((response) => {
        const {data, status} = response;
        if (getResponseStatus(status, 200)) {
          resolve(data);
        }
      }).catch((error) => {
      reject(error);
    });
  });
};

export const setTokenInHeader = (config) => {

  let token, user;
  // token = sessionStorage.getItem("JWT_TOKEN");
  // user = sessionStorage.getItem("user");
  token = localStorage.getItem("JWT_TOKEN");
  user = localStorage.getItem("user");
  if(user){
    user = JSON.parse(user);
  }
  let headers = {};
  if (token) {
    // Authorization: `Bearer ${token}` for token based auth
    headers = {
      Authorization: `Basic ${token}`,
    };
    if(user && (user._id || user.userid)){
      if(!user._id){
        user["_id"] = user.userid;
      }
      headers["X_CURRENT_USER_ID"] = user._id;
      if(config.hasOwnProperty("admin")){
        headers["X_USER_TYPE"] = "admin";
      }
      // Updated to add user type, which will use in backend api
      if(user && user.roles && Array.isArray(user.roles)){
        const userRoles = user.roles;
        if(userRoles.indexOf("admin") > -1){
          headers["X_USER_TYPE"] = "admin";
        }
        if(userRoles.indexOf("super_admin") > -1){
          headers["X_USER_TYPE"] = "super_admin";
        }
      }
    }
    if(Object.keys(headers).length){
      config["headers"] = headers;
    }
    return config;
  }
};

export const getTokenRequest = (url, params={}, config_params) => {
  let config = {};
  if(params && Object.keys(params).length){
    config["params"] = params;
  }

  config = {...config, ...config_params};
  config = setTokenInHeader(config);

  if(config_params && Object.keys(config_params).length){
    config["headers"] = {...config_params.headers, ...config.headers};
    config = {...config_params, ...config};
  }
  url = appendLanguageToURL(url);
  return getRequest(url, config);
};

export const postTokenRequest = (url, data, config={}) => {
  config = setTokenInHeader(config);
  url = appendLanguageToURL(url);
  return postRequest(url, data, config)
};

export const putTokenRequest = (url, data, config={}) => {
  config = setTokenInHeader(config);
  url = appendLanguageToURL(url);
  return putRequest(url, data, config)
};

export const deleteTokenRequest = (url, data, config={}) => {
  config = setTokenInHeader(config);
  url = appendLanguageToURL(url);
  return deleteRequest(url, config);
}