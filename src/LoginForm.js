import React from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log(this.props);
    //localStorage.setItem("loggedIn", true);
    // check credentials here with POST
    this.checkLoginCredentials(values);
    
  };

  checkLoginCredentials = (values) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
    }
    // axios post request with body as email and password
    axios.post("https://cors-anywhere.herokuapp.com/34.226.214.56/api/authenticate", {
      "email": values.email,
      "password": values.password
    },
      { headers: headers }
    )
      .then(response => {
        console.log(response);
        localStorage.setItem("loggedIn", response.data.authenticated);
        return response.data.authenticated;

      })
      .catch(err => {
        console.log(err);
        return false;
      });

  };



  render() {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
        </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
        </Button>
        Or <a href="/register">Register now!</a>
        </Form.Item>
      </Form>
    );
  };
}

export default LoginForm;