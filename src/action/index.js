/**
 * @method
 * @description Reducer action to select a particular
 * @param data
 * @returns {{payload: {data: SELECT_IMAGE.props}, type: string}}
 * @constructor
 */
export const SELECT_IMAGE = (data) => {
  return {
    type: "SELECTED",
    payload:{
      data
    }
  }
};

/**
 * @method
 * @description Reducer action to clear selected image
 * @returns {{payload: {}, type: string}}
 * @constructor
 */
export const CLEAR_IMAGE = () => {
  return {
    type:"CLEAR",
    payload:{}
  }
};
