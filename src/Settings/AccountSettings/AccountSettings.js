import React from 'react';
import { Card, Input, Button } from 'antd';
import ResetPassword from './ResetPassword'

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <Card
      style={{
        borderRadius: '1.5vh',
        height: '100vh', margin: 15,
        borderWidth: 2,
        borderColor: 'rgb(38, 41, 56)',
        backgroundColor: 'rgb(36, 36, 52)'}
      }>
        <ResetPassword userUsername={this.props.props.userUsername}/>
      </Card>
    )
  }
}

export default AccountSettings;