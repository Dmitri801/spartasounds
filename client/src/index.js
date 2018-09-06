import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxToastr from "react-redux-toastr";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import rootReducer from "./store/reducers";
import "./styles/css/index.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import App from "./App";

const store = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);

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
        <App />
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
