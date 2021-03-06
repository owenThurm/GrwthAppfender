import React from 'react';

import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Forms.css';
import Logo from './images/whitelabel.png';

class LoginForm extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onFinish = (values) => {
    values.email = values.email.toLowerCase()
    // check credentials here with POST
    this.checkLoginCredentials(values);
  };

  checkLoginCredentials = (values) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
    }
    let queryString = window.location.search;
    let parameters = new URLSearchParams(queryString);
    let token = parameters.get('token');

    if(token != null) {
      // axios post to the auth with email validation endpoint
      axios.post("https://owenthurm.com/api/user/authenticateemail", {
        "email": values.email,
        "password": values.password,
        "email_validation_token": token,
      }).then(response => {
        console.log(response)
        if (response.data.authenticated) {
          localStorage.setItem("token", response.data.token)
          window.location.replace("/");
        } else if (response.data.message == "invalid email validation token"
        || response.data.message == "email validation token invalid") {
          message.warning('invalid or outdated email verification token')
        } else if (response.data.message == "invalid credentials") {
          this.formRef.current.setFields([
            {
              name: 'email',
              errors: ['Invalid email or password!']
            },
            {
              name: 'password',
              errors: ['Invalid email or password!']
            }
          ])
        }
      }).catch(err => {
        console.log(err);
      })
    } else {
      // axios post request with body as email and password
      axios.post("https://owenthurm.com/api/user/authenticate", {
        "email": values.email,
        "password": values.password
      },
        { headers: headers }
      )
        .then(response => {
          console.log(response)
          if (response.data.authenticated) {
            localStorage.setItem("token", response.data.token)
            window.location.replace("/");
          } else {
            this.formRef.current.setFields([
              {
                name: 'email',
                errors: ['Invalid email or password!']
              },
              {
                name: 'password',
                errors: ['Invalid email or password!']
              }
            ])
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
  };

  render() {
    return (
      <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={12} align="center" >
          <img src={Logo} className="form-logo" alt="GA_Logo" style={{"width":"100%" }} />
        </Col>

        <Col>
          <div className="form" style={{ marginLeft: 80, marginRight: 80 }}>
            <h2 className="form-header">Sign In</h2>
            <Form
              ref={this.formRef}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              style={{ backgroundColor: 'rgb(36, 36, 52)' }}
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
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  className="form-field"
                  style={{}} />
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
                  iconRender={visible => (visible ? <EyeOutlined style={{ color: 'white' }} /> : <EyeInvisibleOutlined style={{ color: 'white' }} />)}
                  type="password"
                  placeholder="Password"
                  className="form-field"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox style={{ "color": "white" }}>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="/forgotpassword" style={{ "float": "right", "textDecorationLine": "underline" }}>
                  Forgot password?
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                <a href="/register" style={{ "float": "right", "textDecorationLine": "underline" }}>
                  Create an account
                </a>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    );
  };
}

export default LoginForm;