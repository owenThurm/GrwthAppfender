import React from 'react';
import { List } from 'antd';

const CustomCommentList = props => {



  return(
    <List
      style={{color: 'white', borderRadius: '1.2vh'}}
      dataSource={props.userCustomComments}
      bordered
      renderItem={item => <List.Item style={{color: 'white'}}>{item}</List.Item>}
    />
  )

}

export default CustomCommentList;