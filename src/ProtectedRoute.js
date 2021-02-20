import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAuthenticated: false,
      token: localStorage.getItem('token'),
    }
  }

  componentDidMount() {
    //axios call to authenticate user
    axios.post('https://owenthurm.com/api/user/getidentity', {
      'token': localStorage.getItem('token')
    }).then(response => {
      if(response.data.message === "user identity") {
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('username', response.data.username)
        this.setState({
          loading: false,
          isAuthenticated: true
        })
      } else {
        this.setState({
          loading: false,
          isAuthenticated: false
        })
      }
    }).catch(err => {
      console.log(err)
    });
  }

  render() {
    const Component = this.props.component;
    return (
      this.state.isAuthenticated ?
        (<Component props={this.props.props}/>) :
        this.state.loading ?
        <div style={{position: 'absolute', top: '50vh', left: 0, right: 0}}>
        <Spin style={{position: 'absolute', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0}}
        size='large'/>
      </div> : <Redirect to="/login" />
    )
  }
}
export default ProtectedRoute;