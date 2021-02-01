import React from 'react';
import AddCustomComments from './AddCustomComments';
import CustomCommentList from './CustomCommentsList';
import { Card } from 'antd';

class CommentSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userCustomComments: []
    }
  }

  render() {
    return(
      <Card style={{
        borderRadius: '1.5vh',
        height: '100vh', margin: 15,
        borderWidth: 2,
        borderColor: 'rgb(38, 41, 56)',
        backgroundColor: 'rgb(36, 36, 52)'}
      }>
        <AddCustomComments />
        <CustomCommentList />
      </Card>
    )
  }
}

export default CommentSettings