import React from 'react';
import { Switch, Typography, Row } from 'antd';
import axios from 'axios';

const { Title } = Typography;

class CommentPoolSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usingCustomComments: props.usingCustomComments,
      userUsername: props.userUsername,
    }
  }

  toggleSwitch = () => {
    //axios post to set the comment pool for the user
    axios.post('https://owenthurm.com/api/user/setcustomcomments', {
      'user_username': this.props.userUsername,
      'using_custom_comments': !this.props.usingCustomComments
    }).then(() => {
      this.props.updateComments()
    }).catch(err => {
      console.log(err);
    });
  }

  customCommentThreshold = () => {
    if(this.props.customCommentCount < 25) {
      return (<Title level={5} style={{color: 'white', marginBottom: 50}}>Must have atleast 25 custom comments!</Title>);
    } else {
      return <div style={{marginBottom: 50}}/>
    }
  }

  render() {
    return(
      <div>
        <Row>
          <Title level={5} style={{color: 'white', marginRight: 5}}>Using: </Title>
          <Switch
          defaultChecked={false}
          checked={this.props.usingCustomComments && this.props.customCommentCount >= 25}
          checkedChildren={"Custom Comments"}
          unCheckedChildren={"Default Comments"}
          onChange={this.toggleSwitch}
          disabled={this.props.customCommentCount < 25}/>
        </Row>
        {this.customCommentThreshold()}
      </div>
    )
  }
}

export default CommentPoolSwitch;