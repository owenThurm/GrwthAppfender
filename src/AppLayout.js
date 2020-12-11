import React from 'react';
import { Layout, Menu, Image } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { NameCard } from './NameCard';

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
              <Menu.Item className='customclass' key="1" icon={<UserOutlined />}>
                nav 1
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
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
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;

