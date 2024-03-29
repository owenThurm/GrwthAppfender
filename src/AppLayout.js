import React from 'react';
import { Layout, Menu, Image, Spin, Typography, Card, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  DashboardFilled,
  SettingOutlined,
  SettingFilled,
  LogoutOutlined,
  FilterOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { NameCard } from './NameCard';
import { Switch, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard/Dashboard';
import { Settings } from './Settings/Settings';
import axios from 'axios';
import NavBar from './NavBar';
import Filters from './Filters/Filters';

const { Header, Sider } = Layout;
const { Title } = Typography;

class AppLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      brand: '',
      userUsername: localStorage.getItem('username'),
      location: '',
      email: localStorage.getItem('email'),
      usingCustomComments: false,
      userPromoAccounts: [],
      userCustomComments: [],
      userTotalComments: 0,
      userIsOnboarding: localStorage.getItem('isOnboarding') == 'true',
      userFilter: {},
      loading: true,
      userValidatedEmail: false,
    }
  }

  componentDidMount() {
    this.getUserData()
  }

  getUserData = () => {
    axios.get(
      'https://owenthurm.com/api/user?email='+this.state.email
      ).then(response => {
        console.log('app layout response', response)
        this.setState({
          brand: response.data.user_data.user_brand_name,
          location: response.data.user_data.user_location,
          usingCustomComments: response.data.user_data.user_using_custom_coments,
          userCustomComments: response.data.user_data.user_custom_comment_pool,
          userPromoAccounts: response.data.user_data.user_promo_accounts,
          userTotalComments: response.data.user_data.user_total_comments,
          userFilter: response.data.user_data.user_comment_filter,
          loading: false,
          userValidatedEmail: response.data.user_data.user_email_validated,
          userIsOnboarding: localStorage.getItem('isOnboarding') == 'true',
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

  resendEmailValidationEmail = () => {
    axios.get(
      'https://owenthurm.com/api/user/authenticateemail?email='+this.state.email
    ).then(response => {
      message.success('email sent to ' + this.state.email+'!')
    }).catch(err => {
      console.log(err);
      message.error('issue sending email!')
    })
  }

  render() {
    console.log('layout state', this.state)
    let path = window.location.pathname;
    let subPath = path.split('/')[1]
    if(!this.state.userValidatedEmail && !this.state.loading) {
      return (
        <Card className='center' title={<Title level={4} style={{color: 'white'}}>Verify your email!</Title>}>
          <div >
            To use GrowthAutomation, click the link in the email we sent to {this.state.email}.
            This helps keep your account secure.
            <br/>
            <br/>
            No email in your inbox or spam folder? <a onClick={this.resendEmailValidationEmail}>Let’s resend it</a>.
            <br/>
            <br/>
            Wrong address? <a onClick={this.logout}>Log out</a> to sign in with a different email.
            If you mistyped your email when signing up, create a new account.
          </div>
        </Card>
      )
    }
    return (
      <div>
        {this.state.loading ?
        <div style={{position: 'absolute', top: '50vh', left: 0, right: 0}}>
        <Spin style={{position: 'absolute', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0}}
        size='large'/>
        </div> : (
        <Layout>
          <div id="AppLayoutDiv" style={{
              height: '100vh',
              borderRightWidth: 2,
              borderRightStyle: 'solid',
              borderRightColor: 'rgb(38, 41, 56)',
            }}>
          <Sider
          trigger={null}
          collapsible
          collapsedWidth={this.state.mobile ? 0 : 75}
          collapsed={this.state.collapsed}>
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

              <Menu mode='inline' defaultSelectedKeys={[subPath && subPath != 'reports' ? subPath : 'dashboard']}>
                <Menu.Item key='dashboard' icon={path == '/' || path == '/reports' ?  <DashboardFilled/> : <DashboardOutlined/>}>
                  <Link to='/' />
                  Dashboard
                </Menu.Item>
                <Menu.Item key='filters' icon={subPath == 'filters' ? <FilterFilled/> : <FilterOutlined/>}>
                <Link to='/filters'/>
                  Action Filters
                </Menu.Item>
                <Menu.Item key="settings" icon={subPath == 'settings' ? <SettingFilled/> :  <SettingOutlined/>}>
                  Settings
                  <Link to='/settings' style={{
                    color: 'white'
                  }} />
                </Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} onClick={() => this.logout()}>
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
                  id: 'AppLayoutSiderButton',
                })}
                <div id="AppLayoutNavBar">
                  <NavBar logout={this.logout}/>
                </div>
              </Header>
            </div>
            <Switch>
                <ProtectedRoute path='/settings' component={Settings}
                props={{
                  'userUsername': this.state.userUsername,
                  'usingCustomComments': this.state.usingCustomComments,
                  'userCustomComments': this.state.userCustomComments,
                  'requeryUser': this.getUserData,
                }}/>
                <ProtectedRoute path='/filters' component={Filters}
                props={{
                  'userFilter': this.state.userFilter,
                  'userUsername': this.state.userUsername,
                  'updateUserData': this.getUserData,
                }}/>
                <ProtectedRoute path='/' component={Dashboard}
                props={{
                  'requeryUser': this.getUserData,
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
        )}
      </div>
    );
  }
}

export default AppLayout;

