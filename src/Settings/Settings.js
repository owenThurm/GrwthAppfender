import React from 'react';
import { Menu } from 'antd';
import { Link, Switch } from 'react-router-dom';
import { SettingOutlined, MessageFilled, MessageOutlined, SettingFilled } from '@ant-design/icons'
import ProtectedRoute from '../ProtectedRoute';
import AccountSettings from './AccountSettings/AccountSettings';
import CommentSettings from './CommentSettings/CommentSettings';

export const Settings = props => {

  let path = window.location.pathname;
  let subPath = path.split('/')[2]

  const commentSettingsIcon = () => {
    if(path == '/settings/comments') {
      return <MessageFilled />
    } else {
      return <MessageOutlined />
    }
  }

  const accountSettingsIcon = () => {
    if(path == '/settings') {
      return <SettingFilled />
    } else {
      return <SettingOutlined />
    }
  }

  return(
    <div>
      <Menu
      defaultSelectedKeys={subPath ? subPath : 'account'}
      mode='horizontal'
      style={{
        marginTop: 20,
        borderBottomColor: 'rgb(38, 41, 56)',
          borderBottomWidth: 2}}>
        <Menu.Item key='account' icon={accountSettingsIcon()}>
          <Link to='/settings' />
          Account Settings
        </Menu.Item>

        <Menu.Item key='comments' icon={commentSettingsIcon()}>
          <Link to='/settings/comments' />
          Comment Settings
        </Menu.Item>
      </Menu>
      <Switch>

        <ProtectedRoute exact path='/settings/comments' component={CommentSettings}
        props={{'userUsername': props.props.userUsername, 'usingCustomComments': props.props.usingCustomComments}}/>

        <ProtectedRoute path='/settings' component={AccountSettings}
        props={{'userUsername': props.props.userUsername}}/>

      </Switch>
    </div>
  );
}