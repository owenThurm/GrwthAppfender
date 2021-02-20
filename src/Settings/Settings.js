import React from 'react';
import { Menu } from 'antd';
import { Link, Switch } from 'react-router-dom';
import { SettingOutlined, HeartFilled, HeartOutlined,
         MessageFilled, MessageOutlined, SettingFilled } from '@ant-design/icons'
import ProtectedRoute from '../ProtectedRoute';
import AccountSettings from './AccountSettings/AccountSettings';
import CommentSettings from './CommentSettings/CommentSettings';
import LikeSettings from './LikeSettings/LikeSettings';

export const Settings = props => {

  let path = window.location.pathname;

  const likeSettingsIcon = () => {
    console.log('path: ', path);
    if(path == '/settings/likes') {
      return <HeartFilled />
    } else {
      return <HeartOutlined />
    }
  }

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
      <Menu mode='horizontal'
      style={{
        marginTop: 20,
        borderBottomColor: 'rgb(38, 41, 56)',
          borderBottomWidth: 2}}>
        <Menu.Item icon={accountSettingsIcon()}>
          <Link to='/settings' />
          Account Settings
        </Menu.Item>

        <Menu.Item icon={commentSettingsIcon()}>
          <Link to='/settings/comments' />
          Comment Settings
        </Menu.Item>

        <Menu.Item icon={likeSettingsIcon()}>
          <Link to='/settings/likes'/>
          Like Settings
        </Menu.Item>

      </Menu>
      <Switch>

        <ProtectedRoute exact path='/settings/comments' component={CommentSettings}
        props={{'userUsername': props.props.userUsername, 'usingCustomComments': props.props.usingCustomComments}}/>

        <ProtectedRoute exact path='/settings/likes' component={LikeSettings}
        props={{'userUsername': props.props.userUsername}}/>

        <ProtectedRoute path='/settings' component={AccountSettings}
        props={{'userUsername': props.props.userUsername}}/>

      </Switch>
    </div>
  );
}