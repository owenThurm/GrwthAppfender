import React from 'react';
import { Card, Input, Switch } from 'antd';

class Promo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div style={{marginTop: 30, marginLeft: 40}}>
        <Card style={{height: 340, width: 320, backgroundColor: 'rgb(36, 36, 52)',
         borderColor: 'rgb(190, 190, 194)', borderRadius: '3vh', borderWidth: 2}}
          title='Promo Account #1'
          headStyle={{color: 'white', textAlign: 'center', borderWidth: 2, borderBottomColor: 'rgb(190, 190, 194)'}}>

            <Input />
            <Input />
            <Switch />
        </Card>
      </div>
    )
  }
}

export default Promo;