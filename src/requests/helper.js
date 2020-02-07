/**
 * Find the response type whether it fall in particular http response type
 * @name getResponseStatus
 * @summary Check for http status, whether current one is in particular response type
 * @description Return true if response status with http status code
 * @param {number} response Response status like 200, 400, 403, 404, 500,
 * @param {number} type 200, 300, 400, 500 to get initial letter of response
 * @example
 *    getResponseStatus(404, 400)
 * @returns {boolean}
 */
export const getResponseStatus = (response, type) => {
  type = parseInt(type/100);
  let regex = new RegExp(`^${type}\\d{2}$`);
  return !!regex.exec(response);
};


/**
 * Convert test to slug
 * @name getSlug
 * @summary Convert text to slug
 * @description Convert to slug
 * @todo Remove special characters
 * @param {String} text Text to convert to slug format
 * @example
 * getSlug("Hello World") => "hello-world"
 * @returns {string} slug
 */
export const getSlug = (text="") => {
  try{
    text = text.toLowerCase();
    text = text.replace(/\s/g, "-");
  }catch (e) {
    // handle error
  }
  return text;
};
