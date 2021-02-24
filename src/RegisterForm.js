import React from 'react';
import { Form, Input, Button, Checkbox,Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, SkinOutlined,
  EnvironmentOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Forms.css';
import Logo from './images/whitelabel.png';

function RegisterForm() {
  const [form] = Form.useForm();

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
        if(response.data.message == 'saved') {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('isOnboarding', true);
          window.location.replace('/');
        } else {
          form.setFields([
            {
              name: 'email',
              errors: ['Must use valid and unique email!']
            },
            {
              name: 'username',
              errors: ['Must use valid and unique username!']
            }
          ])
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
  <Row type="flex" justify="center" align="middle">
    <Col span={10} align="center" >
          <img src={Logo} className="form-logo" alt="GA_Logo" style={{"width":"100%" }} />
    </Col>

    <Col>
    <div className="form" style={{margin: 80}}>
      <h2 className="form-header">Register</h2>
      <Form
        form={form}
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
          className="form-field"
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
            className="form-field"
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
            className="form-field"
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
            className="form-field"
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
            className="form-field"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ "color": "white" }}>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/forgotpassword" style={{"float":"right", "textDecorationLine": "underline" }}>
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
    </Col>
    </Row>
  );
};

export default RegisterForm;