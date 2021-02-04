import React from 'react';
import { Menu } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';
import { SettingOutlined, CommentOutlined } from '@ant-design/icons'
import ProtectedRoute from '../ProtectedRoute';
import AccountSettings from './AccountSettings/AccountSettings';
import CommentSettings from './CommentSettings/CommentSettings';

export const Settings = props => (
  <div>
    <Menu mode='horizontal'
    style={{
      marginTop: 20,
       borderBottomColor: 'rgb(38, 41, 56)',
        borderBottomWidth: 2}}>
      <Menu.Item icon={<SettingOutlined />}>
        <Link to='/settings' />
        Account Settings
      </Menu.Item>

      <Menu.Item icon={<CommentOutlined />}>
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