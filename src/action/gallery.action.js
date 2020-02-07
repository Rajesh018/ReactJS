import {getImages} from "../requests/api/picsum.api"
import ENV from "../env";
import {getResponseStatus} from "../requests/helper";

/**
 * @method
 * @name ADD_IMAGES_GALLERY
 * @summary
 * @description Redux action, which trigger reducer and add images to reducer
 * @param data
 * @returns {{payload: {data: (ADD_IMAGES_GALLERY.props|*[])}, type: string}}
 * @constructor
 */
export const ADD_IMAGES_GALLERY = (data=[]) => {
  return {
    type: "FETCH_DATA",
    payload:{
      data
    }
  }
};

/**
 * @method
 * @name ADD_IMAGE_GALLERY
 * @summary
 * @description Redux action, Add uploaded image data to reducer
 * @param data
 * @returns {{payload: {data: (ADD_IMAGE_GALLERY.props|{})}, type: string}}
 * @constructor
 */
export const ADD_IMAGE_GALLERY = (data={}) => {
  console.log("Add image gallery...")
  console.log(data)
  return {
    type: "ADD_DATA",
    payload:{
      data
    }
  }
};

/**
 * @method
 * @description Redux action, Empty reducer object
 * @returns {{type: string}}
 * @constructor
 */
export const EMPTY_GALLERY = () => {
  return {
    type: "EMPTY_DATA"
  }
};

/**
 * @method
 * @description Redux thunk action for asyn api requests
 * @param item
 * @returns {function(...[*]=)}
 * @constructor
 */
export const FETCH_GALLERY_IMAGES = (item=[]) => {
  return (dispatch) => {
    getImages()
      .then((response) => {
        if(response){
          dispatch(ADD_IMAGES_GALLERY(response))
        }
      }).catch((error) => {
        // @todo will update later
    })
  }
};
