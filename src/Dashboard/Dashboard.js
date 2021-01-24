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
    this.state = {
      userUsername: props.props.userUsername,
      brand: props.props.brand
    }
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
            <Link to='/' />
            Promo
          </Menu.Item>
          <Menu.Item icon={<CopyOutlined />}>
            <Link to='/reports' />
            Reports
          </Menu.Item>
        </Menu>
        <Switch>
          <ProtectedRoute path='/reports' component={Reports} />
          <ProtectedRoute path='/' component={Promo} props={{'userUsername': this.props.props.userUsername}}/>
        </Switch>
      </div>
    )
  }
}

export default Dashboard;
