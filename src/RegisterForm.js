import React from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

function RegisterForm() {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    createUser(values);
  };

  const createUser = (values) => {
    // axios post request to register
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
    }
    // axios post request with body as email and password
    axios.post("https://cors-anywhere.herokuapp.com/34.226.214.56/api/user", {
      "email": values.email,
      "username": values.username,
      "password": values.password,
      "location": values.location,
      "brand_name": values.brandName
    },
      { headers: headers }
    )
      .then(response => {
        console.log(response);
        localStorage.setItem("loggedIn", response.data.message == "saved");
        localStorage.setItem("username",values.username);
        localStorage.setItem("brand",values.brandName);
        return response.data.message == "saved";

      })
      .catch(err => {
        console.log(err);
        return false;
      });
  };



  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter Your Email" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Enter Your Username"
        />
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
          placeholder="Enter Your Password"
        />
      </Form.Item>
      <Form.Item
        name="brandName"
        rules={[
          {
            required: true,
            message: 'Please input your brand name!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Enter Your brand name"
        />
      </Form.Item>
      <Form.Item
        name="location"
        rules={[
          {
            required: true,
            message: 'Please input your state and country!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Enter Your state and country"
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
        <Button type="primary" htmlType="submit" className="register-form-button">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;