import React from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import axios from 'axios'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

class ResetPassword extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      retypedNewPassword: '',
      loading: false,
      accountName: '',
      hasMounted: false
    }
  }

  componentDidMount() {
    let queryString = window.location.search;
    let parameters = new URLSearchParams(queryString);
    let token = parameters.get('token');
    //axios get the account name to reset the password of
    axios.get(
      'https://owenthurm.com/api/user/tokenresetpassword?reset_password_token='+token
      ).then(response => {
        console.log(response);
        this.setState({ hasMounted: true, accountName: response.data.data })
      }).catch(err => {
        console.log(err)
      });
  }

  matchingPasswordValidator = (rule, values) => {
    if(this.state.newPassword == this.state.retypedNewPassword) return Promise.resolve();
    else return Promise.reject();
  }

  resetPassword = (password) => {
    let queryString = window.location.search;
    let parameters = new URLSearchParams(queryString);
    let token = parameters.get('token');
    console.log('called')
    //axios call to reset password endpoint
    this.setState({
      loading: true
    }, () => {
      axios.post('https://owenthurm.com/api/user/tokenresetpassword', {
        'reset_password_token': token,
        'new_password': password
      }).then(response => {
        console.log(response);
        this.setState({ loading: false})
        if(response.data.message == "token doesn't exist or has already been used") {
          message.warning('Reset Password Token Expired!')
        } else {
          message.success('Password Reset!')
        }
      }).catch(err => {
        console.log(err);
      });
    });
  }

  submitChangePassword = (values) => {
    this.formRef.current.validateFields().then(async () => {
      await this.resetPassword(values.newpassword)
      this.setState({newPasswordModalVisible: false}, () => {this.formRef.current.resetFields()});
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      this.state.hasMounted?
        <div className="form" style={{ marginLeft: 80, marginRight: 80, marginTop: 80 }}>
          <h2 className="form-header">Reset password for {this.state.accountName}</h2>
          <Form
            onFinish={this.submitChangePassword}
            ref={this.formRef}
            validateTrigger='onOk'>
            <Form.Item
              name="newpassword"
                  rules={[
                    {
                      required: true,
                      message: 'New password required',
                    },
                  ]}
                >
              <Input.Password placeholder={'New Password'}
                  iconRender={visible => (visible ? <EyeOutlined style={{color: 'white'}}/> : <EyeInvisibleOutlined style={{color:'white'}}/>)}
                  style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}
                  onChange={(event) => {this.setState({newPassword: event.target.value})}}/>
            </Form.Item>
            <Form.Item
              name="retypepassword"
                  rules={[
                    {
                      required: true,
                      message: 'Passwords must match!',
                      validator: this.matchingPasswordValidator
                    },
                  ]}
                >
              <Input.Password placeholder={'Retype Password'}
                  iconRender={visible => (visible ? <EyeOutlined style={{color: 'white'}}/> : <EyeInvisibleOutlined style={{color:'white'}}/>)}
                  style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}
                  onChange={(event) => {this.setState({retypedNewPassword: event.target.value})}}/>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType="submit">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
          {this.state.loading ?
          <div style={{position: 'absolute', top: '50vh', left: 0, right: 0}}>
          <Spin style={{position: 'absolute', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0}}
          size='large'/>
          </div> : ''}
        </div> :
        <div style={{position: 'absolute', top: '50vh', left: 0, right: 0}}>
        <Spin style={{position: 'absolute', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0}}
        size='large'/>
        </div>
    )
  }

}

export default ResetPassword;