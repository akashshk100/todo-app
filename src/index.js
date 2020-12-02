import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from './store/reducer'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Axios from 'axios'

Axios.interceptors.request.use( config => {
  config.headers = {
    'Authorization': 'Bearer '+localStorage.getItem('authToken') 
  }
  return config
} )

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}><BrowserRouter> <App /> </BrowserRouter></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
