import React from 'react';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: localStorage.getItem("loggedIn") === 'true'
    }
  }

  render() {
    const Component = this.props.component;
    return (

      this.state.isAuthenticated ?
        (<Component props={this.props.props}/>) : <Redirect to="/login" />
    )
  }
}
export default ProtectedRoute;