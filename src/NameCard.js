import React from 'react';
import { Card, Avatar, Typography, Row, Col } from 'antd';
const { Text } = Typography;
const { Meta } = Card;

export const NameCard = (props) => {
  return(
  <Card style={{height: 100, backgroundColor: 'transparent',
   borderWidth: 0, margin: 0}}>
     <Meta
      avatar={
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      }
      title={<Text style={{color: 'white'}} strong>{props.userUsername}</Text>}
      description={props.brand}
    />
  </Card>)
}
/*
<Meta
      avatar={
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      }
      title="Owen Thurm"
      description="Genuine Aesthetic"
    />


    <Row>
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <div>
        <Text strong style={{padding: 0, margin: 0, color: 'white'}}>Owen Thurm</Text>
        <br/>
        <Text style={{color: 'white', padding: 0, margin: 0}}>Genuine Aesthetic</Text>
      </div>
     </Row>

*/
