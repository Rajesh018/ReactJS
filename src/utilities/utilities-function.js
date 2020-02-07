/**
 * @description Check whether an array is empty or not
 * @param data
 * @returns {*}
 */
export const isArrayNotEmpty = (data) => {
  return (Array.isArray(data) && data.length);
};

/**
 * @description Check whether an object empty or not
 * @param data
 * @returns {boolean}
 */
export const isEmptyObject = (data) => {
  return !data || !(Object.keys(data).length)
};
