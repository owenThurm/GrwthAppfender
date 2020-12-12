import React from 'react';
import { Row, Card, Menu } from 'antd';
import { RiseOutlined, CopyOutlined } from '@ant-design/icons';
import { Link, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Promo from './Promo';
import Reports from './Reports';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div>
        <Menu mode='horizontal'
        style={{
          marginTop: 20,
           borderBottomColor: 'rgb(38, 41, 56)',
            borderBottomWidth: 2}}>
          <Menu.Item icon={<RiseOutlined />}>
            <Link to='/dashboard' />
            Promo
          </Menu.Item>
          <Menu.Item icon={<CopyOutlined />}>
            <Link to='/dashboard/reports' />
            Reports
          </Menu.Item>
        </Menu>
        <Switch>
          <ProtectedRoute path='/dashboard/reports' component={Reports} />
          <ProtectedRoute path='/dashboard' component={Promo} />
        </Switch>
      </div>
    )
  }
}

export default Dashboard;
