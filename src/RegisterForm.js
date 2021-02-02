import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, SkinOutlined,
  EnvironmentOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
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
    axios.post("https://owenthurm.com/api/user", {
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
        localStorage.setItem("email",values.email);
        localStorage.setItem("username", values.username)
        if(response.data.message == 'saved') {
          window.location.replace("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div style={{margin: 80}}>
      <Form
        autoComplete='off'
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
          <Input prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Enter Your Email"
          style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}
          />
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
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter Your Username"
            style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}
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
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            iconRender={visible => (visible ? <EyeOutlined style={{color: 'white'}}/> : <EyeInvisibleOutlined style={{color:'white'}}/>)}
            placeholder="Enter Your Password"
            style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}
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
            prefix={<SkinOutlined className="site-form-item-icon" />}
            placeholder="Enter Your brand name"
            style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}
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
            prefix={<EnvironmentOutlined className="site-form-item-icon" />}
            placeholder="Enter Your state and country"
            style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}
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
    </div>
  );
};

export default RegisterForm;