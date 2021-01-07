import React from 'react';
import { Card, Input, Button } from 'antd';

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <Card style={{borderRadius: '1.5vh', height: '100vh', margin: 15, borderWidth: 2, borderColor: 'rgb(38, 41, 56)', backgroundColor: 'rgb(36, 36, 52)'}}
      >
        <Input placeholder='New Password' style={{width: 200, marginRight: 10,
        backgroundColor: 'rgb(36, 36, 52)', borderRadius: '1.2vh', color: 'white'}}/>

        <Button style={{backgroundColor: 'rgb(36, 36, 52)', borderRadius: '1.2vh', color: 'white'}}>Reset Password</Button>

      </Card>
    )
  }
}

export default AccountSettings;