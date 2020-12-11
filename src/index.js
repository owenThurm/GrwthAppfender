import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard/Dashboard';
import AppMenu from './AppMenu';
import './index.css';
import { Row, Image, Col } from 'antd';
import AppLayout from './AppLayout';


ReactDOM.render(
  <React.StrictMode>
     <AppLayout />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
