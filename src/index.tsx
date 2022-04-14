import React from "react";
import ReactDOM from "react-dom/client";
import "core/styles/tailwind.css";
import App from "./App";
import store from "core/redux/store";
import { Provider } from "react-redux";
// import reportWebVitals from "./reportWebVitals";

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

// reportWebVitals();
