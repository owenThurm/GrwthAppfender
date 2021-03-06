import React from 'react';
import { List } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const CustomCommentList = props => {

  return(
    <List
      style={{color: 'white', borderRadius: '1.2vh'}}
      dataSource={props.userCustomComments}
      bordered
      renderItem={(customComment, index) => {
        return (
          <List.Item
            style={{color: 'white'}}>
            {index+1 + '. '}
            {customComment}
          <MinusCircleOutlined
            style={{"margin": 10,color:"white"}}
            className="dynamic-delete-button"
            onClick={() => props.deleteCustomComment(customComment)}/>
          </List.Item>)}}
    />
  )

}

export default CustomCommentList;