import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./Components/App";
import allReducers from "./Redux/Reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import allSagas from "./Redux/Sagas/saga";

const sagaMiddlewear = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(sagaMiddlewear));

sagaMiddlewear.run(allSagas);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
