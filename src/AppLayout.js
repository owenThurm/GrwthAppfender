import React from 'react';
import { Layout, Menu, Image } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { NameCard } from './NameCard';
import { Switch, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard/Dashboard';
import { Settings } from './Settings/Settings';
import axios from 'axios';

const { Header, Sider, Content } = Layout;

class AppLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      brand: '',
      userUsername: localStorage.getItem('username'),
      location: '',
      email: localStorage.getItem('email'),
      usingCustomComments: false,
      userPromoAccounts: [],
      userTotalComments: 0,
      userIsOnboarding: localStorage.getItem('isOnboarding') == 'true',
    }
  }

  componentDidMount() {
    axios.get(
      'https://owenthurm.com/api/user?email='+this.state.email
      ).then(response => {
        console.log('app layout response', response)
        this.setState({
          brand: response.data.user_data.user_brand_name,
          location: response.data.user_data.user_location,
          usingCustomComments: response.data.user_data.user_using_custom_coments,
          userPromoAccounts: response.data.user_data.user_promo_accounts,
          userTotalComments: response.data.user_data.user_total_comments,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    localStorage.setItem("token", "")
    window.location.replace("/login");
  }

  render() {
    return (
      <Layout>
        <div style={{
            height: '100vh',
            borderRightWidth: 2,
            borderRightStyle: 'solid',
            borderRightColor: 'rgb(38, 41, 56)',
          }}>
        <Sider style={{height: 500}} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div style={{
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
            borderBottomColor: 'rgb(38, 41, 56)',}}>
            <div style={{
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 60,
              marginRight: 70,
              }}>
              <Image src='http://genuineapparelgrowth.com/Images/WhiteLabel.png' />
            </div>
          </div>

          <NameCard userUsername={this.state.userUsername} brand={this.state.brand} />

            <Menu mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to='/' />
                Dashboard
              </Menu.Item>
              <Menu.Item key="2" icon={<SettingOutlined />}>
                Settings
                <Link to='/settings' style={{
                  color: 'white'
                }} />
              </Menu.Item>
              <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => this.logout()}>
                Log Out
              </Menu.Item>
            </Menu>
        </Sider>
        </div>
        <Layout className="site-layout">
          <div style={{
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
            borderBottomColor: 'rgb(38, 41, 56)',
            height: 73,
          }}>
            <Header className="site-layout-background" style={{ paddingLeft: 40 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
            </Header>
          </div>
          <Switch>

              <ProtectedRoute path='/settings' component={Settings}
              props={{
                'userUsername': this.state.userUsername,
                'usingCustomComments': this.state.usingCustomComments,
              }}/>

              <ProtectedRoute path='/' component={Dashboard}
              props={{
                'userUsername': this.state.userUsername,
                'brand': this.state.brand,
                'userPromoAccounts': this.state.userPromoAccounts,
                'userTotalComments': this.state.userTotalComments,
                'userIsOnboarding': this.state.userIsOnboarding,
                'menuIsCollapsed': this.state.collapsed,
              }}/>
          </Switch>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;

