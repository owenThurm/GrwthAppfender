import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import AppLayout from './AppLayout';
import LoginForm from './LoginForm';
import RegisterForm  from './RegisterForm';
import ProtectedRoute from './ProtectedRoute';
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const LoginContainer = () => {

  return(
  <div className="container">
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={LoginForm}/>
    <Route path="/register" component={RegisterForm} />
  </div>
  )
};

const DefaultContainer = () => (
  <div className="container">
    <Switch>
      <ProtectedRoute path="/" component={AppLayout} />
    </Switch>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/register" component={LoginContainer} />
        <Route exact path="/forgotpassword/reset" component={ResetPassword} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route component={DefaultContainer} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
