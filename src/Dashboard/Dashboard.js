import React from 'react';
import { Menu } from 'antd';
import { RiseOutlined, CopyOutlined } from '@ant-design/icons';
import { Link, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Promo from './Promo/Promo';
import Reports from './Reports/Reports';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userUsername: props.props.userUsername,
      brand: props.props.brand,
      userIsOnboarding: props.props.userIsOnboarding,
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
          <ProtectedRoute path='/reports' component={Reports}
          props={{
            'userUsername': this.props.props.userUsername,
            'userPromoAccounts': this.props.props.userPromoAccounts,
            'userTotalComments': this.props.props.userTotalComments,
          }}/>
          <ProtectedRoute path='/' component={Promo}
          props={{
            'reQueryUserData': this.props.props.reQueryUserData,
            'userIsOnboarding': this.props.props.userIsOnboarding,
            'userUsername': this.props.props.userUsername,
            'userPromoAccounts': this.props.props.userPromoAccounts,
            'menuIsCollapsed': this.props.props.menuIsCollapsed,
          }}/>
        </Switch>
      </div>
    )
  }
}

export default Dashboard;
