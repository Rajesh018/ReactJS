import {  createStore, applyMiddleware  } from "redux"
import thunk  from "redux-thunk"

/**
 * @description Combine all reducers to single one
 */
import combineReducers from "../reducers/index"

/**
 * @description createStore with combined reducers and middleware
 * middleware will help to add other plugins which will add some functionality
 * @type {Store<{readonly "[$CombinedState]"?: undefined} & {selected_image: *; gallery_images: *[]} & S & {}, AnyAction> & Store<S & {}, A> & {dispatch: Dispatch<A>}}
 */
const store = createStore(combineReducers, applyMiddleware(thunk));

export default store;
