import React from 'react';
import AddCustomComments from './AddCustomComments';
import CustomCommentList from './CustomCommentsList';
import { Card } from 'antd';
import axios from 'axios';

class CommentSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userUsername: props.props.userUsername,
      userCustomComments: []
    }
  }

  componentDidMount() {
    //axios get to get user's custom comments
    console.log(this.props.props.userUsername)
    axios.get(
      'https://owenthurm.com/api/user/customcomments?user=' + this.props.props.userUsername
      ).then(response => {
        let customComments = []
        for(let i=0; i<response.data.data.length; i++) {
          customComments.push(response.data.data[i].comment_text)
        }
        this.setState({
          userCustomComments: customComments
        }, () => console.log('comment settings state: ', this.state));
    }).catch(err => {
      console.log(err);
    });
  }

  deleteCustomComment = (commentText) => {
    //axios delete custom comments
    console.log(this.props.props.userUsername)
    console.log('Comment text>>' + commentText)
    axios.delete('https://owenthurm.com/api/user/customcomments', {
      data: {
        "user_username": this.props.props.userUsername,
        "custom_comment_text": commentText
      }
    }).then(response => {
      let newCommentList = []
      for(let i=0; i<this.state.userCustomComments.length; i++) {
        if(this.state.userCustomComments[i] != commentText) {
          newCommentList.push(this.state.userCustomComments[i])
        }
      }
      this.setState({
        userCustomComments: newCommentList
      }, () => console.log(this.state))
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  addToCommentList = (newComments) => {
    console.log(newComments)
    let newCommentList = this.state.userCustomComments.concat(newComments)
    console.log(newCommentList)
    console.log(typeof(newCommentList))
    this.setState({
      userCustomComments: newCommentList
    }, () => console.log(this.state));
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
        <AddCustomComments userUsername={this.props.props.userUsername} addToCommentList={this.addToCommentList}/>
        <CustomCommentList userCustomComments={this.state.userCustomComments} deleteCustomComment={this.deleteCustomComment}/>
      </Card>
    )
  }
}

export default CommentSettings