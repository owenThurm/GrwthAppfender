import React from 'react';
import { Layout, Menu, Image } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { NameCard } from './NameCard';
import { Switch, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard/Dashboard';
import { Settings } from './Settings/Settings';

const { Header, Sider, Content } = Layout;

class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

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
              <Image src='https://genuineapparelgrowth.com/Images/WhiteLabel.png' />
            </div>
          </div>

          <NameCard />

            <Menu mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to='/' >

                </Link>
                Dashboard
              </Menu.Item>
              <Menu.Item key="2" icon={<SettingOutlined />}>
                Settings
                <Link to='/settings' style={{
                  color: 'white'
                }}>

                </Link>
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
              <ProtectedRoute path='/settings' component={Settings} />
              <ProtectedRoute path='/' component={Dashboard} />
          </Switch>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;

