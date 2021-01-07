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

            <Row>
              <Input placeholder='username'/>
            </Row>

            <br />
            <Row>
              <Input placeholder='password' />
            </Row>

            <br />

            <Row>
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

            <br />
            <br />

            <Row>
              <Input placeholder="target audience account" />
            </Row>


        </Card>
      </div>
    )
  }
}

export default Promo;