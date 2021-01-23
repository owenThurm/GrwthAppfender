import React from 'react';

import { Redirect } from 'react-router-dom';
import AppLayout from './AppLayout';

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: localStorage.getItem("loggedIn") === 'true'
    }
  }

  updateAuthentication(value) {
    this.setState({ isAuthenticated: value })
    console.log("Updated!");
    console.log(this.state.isAuthenticated);
  }

  render() {
    const Component = this.props.component;
    console.log("meow: " + this.state.isAuthenticated);
    console.log(localStorage.getItem("loggedIn"));

    return (
      this.state.isAuthenticated ?
        (<Component />) : <Redirect to="/login" />
    )
  }
}
export default ProtectedRoute;