import React from 'react';
import { List } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const CustomCommentList = props => {

  return(
    <List
      style={{color: 'white', borderRadius: '1.2vh'}}
      dataSource={props.userCustomComments}
      bordered
      renderItem={item => <List.Item style={{color: 'white'}}>{item} <MinusCircleOutlined style={{"margin": 10,color:"white"}}
      className="dynamic-delete-button"
      onClick={() => props.deleteCustomComment(item)}
    /></List.Item>}
    />
  )

}

export default CustomCommentList;