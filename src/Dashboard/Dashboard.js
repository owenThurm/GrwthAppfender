import React from 'react';
import { Menu } from 'antd';
import { ThunderboltFilled, ThunderboltOutlined, CopyOutlined, CopyFilled } from '@ant-design/icons';
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
    let path = window.location.pathname;
    let subPath = path.split('/')[1]

    return(
      <div>
        <Menu mode='horizontal'
        defaultSelectedKeys={subPath ? subPath : 'promo'}
        style={{
          marginTop: 20,
          borderBottomColor: 'rgb(38, 41, 56)',
          borderBottomWidth: 2}}>
          <Menu.Item key="promo" icon={path == '/' ? <ThunderboltFilled /> : <ThunderboltOutlined />}>
            <Link to='/' />
            Promo
          </Menu.Item>
          <Menu.Item key='reports' icon={path == '/reports' ? <CopyFilled /> : <CopyOutlined />}>
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
            'requeryUser': this.props.props.requeryUser,
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
