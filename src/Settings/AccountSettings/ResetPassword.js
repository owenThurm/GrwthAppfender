import { Button, Modal, Form, Input } from 'antd';
import React from 'react'
import axios from 'axios'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

class ResetPassword extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      newPasswordModalVisible: false,
      userUsername: this.props.userUsername,
      newPassword: '',
      retypedNewPassword: ''
    }
  }

  matchingPasswordValidator = (rule, values) => {
    if(this.state.newPassword == this.state.retypedNewPassword) return Promise.resolve();
    else return Promise.reject();
  }

  resetPassword = (password) => {
    //axios call to reset password endpoint
    axios.post('https://owenthurm.com/api/user/resetpassword', {
      'username': this.props.userUsername,
      'new_password': password
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  submitChangePassword = () => {
    this.formRef.current.validateFields().then(async values => {
      await this.resetPassword(values.newPassword)
      console.log('continued')
      this.setState({newPasswordModalVisible: false}, () => {this.formRef.current.resetFields()});
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      <div>
        <Button
          style={{backgroundColor: 'rgb(36, 36, 52)',
          borderRadius: '1.2vh',
          color: 'white'}}
          onClick = {() => {this.setState({newPasswordModalVisible: true})}}>
          Reset Password
        </Button>
        <Modal
        title='Reset Password'
        style={{backgroundColor: 'rgb(36, 36, 52)', color: 'rgb(36, 36, 52)'}}
        visible={this.state.newPasswordModalVisible}
        onOk={this.submitChangePassword}
        onCancel={() => {this.setState({newPasswordModalVisible: false})}}>
          <Form ref={this.formRef} validateTrigger='onOk'
            bodyStyle={{backgroundColor: 'rgb(36, 36, 52)'}}>
            <Form.Item
              name='newPassword'
              rules={[{
                required: true,
                message: 'New Password Required!'
              }]}>
                <Input.Password placeholder={'New Password'}
                iconRender={visible => (visible ? <EyeOutlined style={{color: 'white'}}/> : <EyeInvisibleOutlined style={{color:'white'}}/>)}
                style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}
                onChange={(event) => {this.setState({newPassword: event.target.value})}}/>

            </Form.Item>
            <Form.Item
              name='retypePassword'
              rules={[{
                required: true,
                message: 'Passwords Must Match!',
                validator: this.matchingPasswordValidator
              }]}>
                <Input.Password placeholder={'Retype Password'}
                iconRender={visible => (visible ? <EyeOutlined style={{color: 'white'}}/> : <EyeInvisibleOutlined style={{color:'white'}}/>)}
                style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }}
                onChange={(event) => {this.setState({retypedNewPassword: event.target.value})}}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }


}

export default ResetPassword;