import {  getRequest } from "../http-methods";
import ENV from "../../env";

/**
 * @description Collect images from API
 * @returns {Promise}
 */
export const getImages = () => {
  const URL = `${ENV.PHOTO_API}/list`;
  return getRequest(URL);
};
