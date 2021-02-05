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
          let customCommentTextNumberTuple = [i+1, response.data.data[i].comment_text]
          customComments.push(customCommentTextNumberTuple)
        }
        this.setState({
          userCustomComments: customComments
        }, () => console.log('comment settings state: ', this.state));
    }).catch(err => {
      console.log(err);
    });
  }

  deleteCustomComment = (commentTuple) => {
    //axios delete custom comments
    let commentText = commentTuple[1]
    console.log('Comment text>>' + commentText)
    axios.delete('https://owenthurm.com/api/user/customcomments', {
      data: {
        "user_username": this.props.props.userUsername,
        "custom_comment_text": commentText
      }
    }).then(response => {
      let newCommentList = []
      let counter = 1
      for(let i=0; i<this.state.userCustomComments.length; i++) {
        if(this.state.userCustomComments[i][1] != commentText) {
          let modifiedCounterComment = this.state.userCustomComments[i]
          modifiedCounterComment[0] = counter
          counter++;

          newCommentList.push(modifiedCounterComment)
        }
      }

      // let counter = 1
      // newCommentList.forEach(element => {
      //   element[0] = counter
      //   counter++;
      // });


      this.setState({
        userCustomComments: newCommentList
      }, () => console.log(this.state))
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  addToCommentList = (newComments) => {
    let newCommentsWithNumbers = []
    for(let i=0; i<newComments.length; i++) {
      let customCommentTextNumberTuple = [i+1+this.state.userCustomComments.length, newComments[i]]
      newCommentsWithNumbers.push(customCommentTextNumberTuple)
    }
    let newCommentList = this.state.userCustomComments.concat(newCommentsWithNumbers)
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
        <CommentPoolSwitch usingCustomComments={this.props.props.usingCustomComments} userUsername={this.props.props.userUsername} customCommentCount={this.state.userCustomComments.length}/>
        <AddCustomComments customCommentsTuples={this.state.userCustomComments} userUsername={this.props.props.userUsername} addToCommentList={this.addToCommentList}/>
        <CustomCommentList userCustomComments={this.state.userCustomComments} deleteCustomComment={this.deleteCustomComment}/>
      </Card>
    )
  }
}

export default CommentSettings