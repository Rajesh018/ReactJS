import React from 'react';

import Gallery from "./pages/gallery"

import {ToastContainer} from "react-toastify"
import "react-toastify/scss/main.scss"

import './App.scss';



function App() {
  return (
    <div className="App">
      <header className={"app__header"}>
        {
          // @todo Add these section if required
        }
      </header>
      <main className={"app__main"}>
        {
          // Router area  Can add router when app get more features
        }
        <Gallery/>
        {
          // End Router area
        }
      </main>
      <footer className={"app__footer"}>
        {
          // @todo Add these section if required
        }
      </footer>
      <ToastContainer/>
    </div>
  );
}

export default App;
