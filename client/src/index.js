import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark';
import { createStore, applyMiddleware } from "redux";
import ReduxToastr from "react-redux-toastr";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import rootReducer from "./store/reducers";
import "./styles/css/index.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import App from "./App";

const store = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);
const alertOptions = {
  position: 'top center',
  zIndex: 11100000,
  timeout: 5000,
  type: "error",
  offset: '700px',
  transition: 'scale'
}
ReactDOM.render(
  <Provider
    store={store(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <div>
      <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <App />
        </AlertProvider>
      </BrowserRouter>
      <ReduxToastr
        timeOut={2000}
        newestOnTop={false}
        preventDuplicates
        position="top-center"
        transitionIn="bounceIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </div>
  </Provider>,
  document.getElementById("root")
);
