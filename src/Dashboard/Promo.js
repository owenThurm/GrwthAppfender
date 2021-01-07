import React from 'react';
import { Card, Input, Switch, Row } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

class Promo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div style={{marginTop: 30, marginLeft: 40}}>
        <Card style={{height: 320, width: 270, backgroundColor: 'rgb(36, 36, 52)',
         borderColor: 'rgb(190, 190, 194)', borderRadius: '1.5vh', borderWidth: 2}}
          title='Promo Account #1'
          headStyle={{color: 'white', textAlign: 'center', borderWidth: 2, borderBottomColor: 'rgb(190, 190, 194)'}}>

            <Row style={{marginBottom: 5}}>
              <Input placeholder='username' style={{borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)'}}/>
            </Row >
            <Row style={{marginBottom: 10}}>
              <Input placeholder='password' style={{borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)'}}/>
            </Row>

            <Row style={{marginBottom: 75}}>
              <Switch style={{width: 270}}
                      checkedChildren={
                      <div>
                        Active <CheckOutlined />
                      </div>}
                      unCheckedChildren={
                        <div>
                          Inactive <CloseOutlined />
                        </div>
                      } defaultUnchecked
                      />
            </Row>

            <Row>
              <Input placeholder="target audience account" style={{borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)'}}/>
            </Row>


        </Card>
      </div>
    )
  }
}

export default Promo;