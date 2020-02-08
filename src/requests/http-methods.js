import axios from "./axios";
import {getResponseStatus, getSlug} from "./helper";


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

