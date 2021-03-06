import React from 'react';
import AddCustomComments from './AddCustomComments';
import CustomCommentList from './CustomCommentsList';
import CommentPoolSwitch from './CommentPoolSwitch';
import { Card } from 'antd';
import axios from 'axios';

class CommentSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userUsername: props.props.userUsername,
      userCustomComments: props.props.userCustomComments,
      usingCustomComments: props.props.usingCustomComments,
    }
  }

  deleteCustomComment = (commentText) => {
    //axios delete custom comments
    console.log('Comment text>>' + commentText)
    axios.delete('https://owenthurm.com/api/user/customcomments', {
      data: {
        "user_username": this.props.props.userUsername,
        "custom_comment_text": commentText
      }
    }).then(() => {
      this.updateComments()
    }).catch(err => {
      console.log(err);
    });
  }

  updateComments = () => {
    this.props.props.requeryUser()
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
        <CommentPoolSwitch updateComments={this.updateComments} usingCustomComments={this.props.props.usingCustomComments} userUsername={this.props.props.userUsername} customCommentCount={this.props.props.userCustomComments.length}/>
        <AddCustomComments customComments={this.props.props.userCustomComments} userUsername={this.props.props.userUsername} updateCommentList={this.updateComments}/>
        <CustomCommentList userCustomComments={this.props.props.userCustomComments} deleteCustomComment={this.deleteCustomComment}/>
      </Card>
    )
  }
}

export default CommentSettings