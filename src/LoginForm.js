import React from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';

class LoginForm extends React.Component {
  formRef = React.createRef();
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
    axios.post("https://owenthurm.com/api/user/authenticate", {
      "email": values.email,
      "password": values.password
    },
      { headers: headers }
    )
      .then(response => {
        console.log(response)
        if(response.data.authenticated) {
          localStorage.setItem("loggedIn", response.data.authenticated);
          localStorage.setItem("email",values.email);
          localStorage.setItem("username", response.data.data)
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
  };

  render() {
    return (
      <div style={{margin: 80}}>
        <Form
          ref={this.formRef}
          autoComplete='off'
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          style={{backgroundColor: 'rgb(36, 36, 52)'}}
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
            style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}/>
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
              type="password"
              placeholder="Password"
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
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
          Or <a href="/register">Register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  };
}

export default LoginForm;