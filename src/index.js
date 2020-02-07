import React from 'react';
import ReactDOM from 'react-dom';


import {  Provider } from "react-redux";

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';


import store from "./store/index"


/**
 * Provider is use to connect store with application, so state management can be done with Redux+React Redux + React
 */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
