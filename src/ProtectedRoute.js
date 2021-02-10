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
      console.log(response)
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

  privateRoute = () => {
    /*if(this.state.isAuthenticated) {
      const Component = this.props.Component;
      return (<Component props={this.props.props}/>)
    } else if(this.state.loading) {
      return <div>hi</div>
    } else {
      return (<Redirect to="/login" />)
      const Component = this.props.Component;
    return <Component props={this.props.props}/>
    console.log(this.props)
    return (
    <div>
      {this.privateRoute()}
    </div>
    )
    }*/
  }

  render() {
    const Component = this.props.component;
    return (
      this.state.isAuthenticated ?
        (<Component props={this.props.props}/>) : this.state.loading ? <Spin /> : <Redirect to="/login" />
    )
  }
}
export default ProtectedRoute;