import React from 'react';
import AccountCommentFilter from './AccountCommentFilter';
import PostCommentFilter from './PostCommentFilter';
import axios from 'axios';
import { Button, Spin, message } from 'antd';
import { ForwardOutlined } from '@ant-design/icons';

class CommentFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountMinFollowers: props.props.userFilter.account_min_followers,
      accountMaxFollowers: props.props.userFilter.account_max_followers,
      accountMinFollowing: props.props.userFilter.account_min_number_following,
      accountMaxFollowing: props.props.userFilter.account_max_number_following,
      accountBioAvoidedPhrases: props.props.userFilter.account_description_avoided_key_phrases,
      postMinComments: props.props.userFilter.post_min_number_of_comments,
      postMaxComments: props.props.userFilter.post_max_number_of_comments,
      postMinLikes: props.props.userFilter.post_min_number_of_likes,
      postMaxLikes: props.props.userFilter.post_max_number_of_likes,
      postDescriptionAvoidedPhrases: props.props.userFilter.post_description_avoided_key_phrases,
      isLoading: false,
    }
  }

  saveFilter = () => {
    let commentFilterObject = this.getCommentFilterObject()
    this.setState({isLoading: true})
    //axios put to update user's filter
    axios.put('https://owenthurm.com/api/user/commentfilter', {
      user_username: this.props.props.userUsername,
      comment_filter: commentFilterObject,
    }).then(response => {
      this.props.props.updateUserData()
      this.setState({
        isLoading: false
      })
      message.success('Updated Comment Filter')
    }).catch(err => {
      console.log(err);
      message.error('Issue Updating Comment Filter!')
    })
  }

  getCommentFilterObject = () => {
    return {
      account_min_followers: this.state.accountMinFollowers,
      account_max_followers: this.state.accountMaxFollowers,
      account_min_number_following: this.state.accountMinFollowing,
      account_max_number_following: this.state.accountMaxFollowing,
      account_description_avoided_key_phrases: this.state.accountBioAvoidedPhrases,
      post_min_number_of_comments: this.state.postMinComments,
      post_max_number_of_comments: this.state.postMaxComments,
      post_min_number_of_likes: this.state.postMinLikes,
      post_max_number_of_likes: this.state.postMaxLikes,
      post_description_avoided_key_phrases: this.state.postDescriptionAvoidedPhrases,
    }
  }

  updateMinComments = (minComments) => {
    if(minComments !== "" && minComments != null && !isNaN(minComments)) {
      this.setState({
        postMinComments: minComments,
      })
    }
  }

  updateMaxComments = (maxComments) => {
    if(maxComments !== "" && maxComments != null && !isNaN(maxComments)) {
      this.setState({
        postMaxComments: maxComments,
      })
    }
  }

  updateMinLikes = (minLikes) => {
    if(minLikes !== "" && minLikes != null && !isNaN(minLikes)) {
      this.setState({
        postMinLikes: minLikes,
      })
    }
  }

  updateMaxLikes = (maxLikes) => {
    if(maxLikes !== "" && maxLikes != null && !isNaN(maxLikes)) {
      this.setState({
        postMaxLikes: maxLikes,
      })
    }
  }

  updateAvoidedDescriptionPhrases = (avoidedPhrases) => {
    if(avoidedPhrases !== "" && avoidedPhrases !== null) {
      this.setState({
        postDescriptionAvoidedPhrases: avoidedPhrases,
      })
    }
  }

  updateMinFollowers = (minFollowers) => {
    if(minFollowers !== "" && minFollowers != null && isNaN(minFollowers)) {
      this.setState({
        accountMinFollowers: minFollowers,
      })
    }
  }

  updateMaxFollowers = (maxFollowers) => {
    if(maxFollowers !== "" && maxFollowers != null && isNaN(maxFollowers)) {
      this.setState({
        accountMaxFollowers: maxFollowers,
      })
    }
  }

  updateMinFollowing = (minFollowing) => {
    if(minFollowing !== "" && minFollowing != null && isNaN(minFollowing)) {
      this.setState({
        accountMinFollowing: minFollowing,
      })
    }
  }

  updateMaxFollowing = (maxFollowing) => {
    if(maxFollowing !== "" && maxFollowing != null && isNaN(maxFollowing)) {
      this.setState({
        accountMaxFollowing: maxFollowing,
      })
    }
  }

  updateAvoidedBioPhrases = (avoidedPhrases) => {
    if(avoidedPhrases !== "" && avoidedPhrases !== null) {
      this.setState({
        accountBioAvoidedPhrases: avoidedPhrases,
      })
    }
  }

  filterDidChange = () => {
    let changed = (
      this.state.accountMinFollowers != this.props.props.userFilter.account_min_followers
      || this.state.accountMaxFollowers != this.props.props.userFilter.account_max_followers
      || this.state.accountMinFollowing != this.props.props.userFilter.account_min_number_following
      || this.state.accountMaxFollowing != this.props.props.userFilter.account_max_number_following
      || JSON.stringify(this.state.accountBioAvoidedPhrases) != JSON.stringify(this.props.props.userFilter.account_description_avoided_key_phrases)
      || this.state.postMinLikes != this.props.props.userFilter.post_min_number_of_likes
      || this.state.postMaxLikes != this.props.props.userFilter.post_max_number_of_likes
      || this.state.postMinComments != this.props.props.userFilter.post_min_number_of_comments
      || this.state.postMaxComments != this.props.props.userFilter.post_max_number_of_comments
      || JSON.stringify(this.state.postDescriptionAvoidedPhrases) !== JSON.stringify(this.props.props.userFilter.post_description_avoided_key_phrases)
    )
    return changed
  }

  render() {
    return(
      <div>
        {this.state.isLoading ?
        <div style={{position: 'absolute', top: '50vh', left: 0, right: 0}}>
        <Spin style={{position: 'absolute', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0, zIndex: 5}}
        size='large'/>
        </div> : ''}
        <AccountCommentFilter
        accountMinFollowers={this.state.accountMinFollowers}
        setAccountMinFollowers={this.updateMinFollowers}
        accountMaxFollowers={this.state.accountMaxFollowers}
        setAccountMaxFollowers={this.updateMaxFollowers}
        accountMinFollowing={this.state.accountMinFollowing}
        setAccountMinFollowing={this.updateMinFollowing}
        accountMaxFollowing={this.state.accountMaxFollowing}
        setAccountMaxFollowing={this.updateMaxFollowing}
        accountBioAvoidedPhrases={this.state.accountBioAvoidedPhrases}
        setAccountBioAvoidedPhrases={this.updateAvoidedBioPhrases}/>
        <PostCommentFilter
        postMinComments={this.state.postMinComments}
        setPostMinComments={this.updateMinComments}
        postMaxComments={this.state.postMaxComments}
        setPostMaxComments={this.updateMaxComments}
        postMinLikes={this.state.postMinLikes}
        setPostMinLikes={this.updateMinLikes}
        postMaxLikes={this.state.postMaxLikes}
        setPostMaxLikes={this.updateMaxLikes}
        postDescriptionAvoidedPhrases={this.state.postDescriptionAvoidedPhrases}
        setPostAvoidedPhrases={this.updateAvoidedDescriptionPhrases}/>
        <Button
        style={this.filterDidChange() ?
          {margin: 15, marginTop: 0, right: 0, position: 'absolute', backgroundColor: 'rgb(36, 36, 52)'}
          : {margin: 15, marginTop: 0, right: 0, position: 'absolute', backgroundColor: 'rgb(36, 36, 52)', color: '#bfbfbfb0'}}
        onClick={this.saveFilter}
        disabled={!this.filterDidChange()}>
          Save Filters<ForwardOutlined />
        </Button>
      </div>
    )
  }
}

export default CommentFilter;