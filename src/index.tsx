import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import {Provider} from "react-redux";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {Draggable} from "gsap/Draggable";

import {store} from "./store/store";
import App from "./App";


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
