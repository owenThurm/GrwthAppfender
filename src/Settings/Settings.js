import React from 'react';
import { Menu } from 'antd';
import { Link, Switch } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons'
import ProtectedRoute from '../ProtectedRoute';
import AccountSettings from './AccountSettings';

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

    </Menu>
    <Switch>
      <ProtectedRoute path='/settings' component={AccountSettings}/>
    </Switch>



  </div>
);