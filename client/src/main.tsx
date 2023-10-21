import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";

import {App} from "./App.tsx";

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
