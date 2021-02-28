import React from 'react';
import { Menu } from 'antd';
import { Link, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { MessageOutlined } from '@ant-design/icons';
import CommentFilter from './CommentFilter';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userUsername: this.props.props.userUsername
    }
  }

  render() {
    return(
      <div>
        <Menu mode='horizontal'>
          <Menu.Item icon={<MessageOutlined />}>
            <Link to='/filters'/>
            Comment Filters
          </Menu.Item>
        </Menu>
        <Switch>
          <ProtectedRoute path='/filters' component={CommentFilter}
          props={{
            updateUserData: this.props.props.updateUserData,
            userFilter: this.props.props.userFilter,
            userUsername: this.props.props.userUsername,
          }}/>
        </Switch>
      </div>
    )
  }
}

export default Filter;