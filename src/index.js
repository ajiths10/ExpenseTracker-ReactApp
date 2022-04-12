import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";
import store from "./store/centralStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <ContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ContextProvider>
  </Provider>
);
