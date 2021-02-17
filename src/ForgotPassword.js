import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined } from '@ant-design/icons'
import axios from 'axios';

class ForgotPassword extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  sendResetEmail = values => {
    //axios post to https://owenthurm.com/api/forgotpassword
    console.log('calledresetemail', values)

    axios.post('https://owenthurm.com/api/user/forgotpassword',
    {
      'email': values.email
    }).then(response => {
      console.log(response)
      if(response.data.message == "invalid") {
        this.formRef.current.setFields([
          {
            name: 'email',
            errors: ['Invalid email!']
          }
        ]);
      } else if(response.data.message == "No user corresponding to email") {
        this.formRef.current.setFields([
          {
            name: 'email',
            errors: ['Email does not correspond to an account!']
          }
        ]);
      } else {
        this.formRef.current.resetFields();
        message.success('Reset Password Email Sent!\n (Be sure to check spam)')
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      <div className="form" style={{ marginLeft: 80, marginRight: 80, marginTop: 80 }}>
        <h2 className="form-header">Forgot Password?</h2>
        <Form onFinish={this.sendResetEmail} ref={this.formRef}>
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
              className="form-field"/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType="submit">
              Send a Reset Password Email
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

}

export default ForgotPassword;