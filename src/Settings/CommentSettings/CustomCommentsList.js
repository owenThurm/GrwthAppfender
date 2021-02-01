import React from 'react'

class CustomCommentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userUsername: props.userUsername
    }
  }


  render() {
    return(
      <div>
        custom comments here
      </div>
    )
  }
}

export default CustomCommentList;