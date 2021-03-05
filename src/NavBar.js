import React from 'react';
import { Drawer, Menu } from 'antd';
import { DashboardOutlined, DashboardFilled, SettingOutlined, SettingFilled,
  LogoutOutlined, UnorderedListOutlined, FilterOutlined, FilterFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };


  render() {
    let path = window.location.pathname;
    let subPath = path.split('/')[1]
    return(
      <div>
        <a style={{color: 'white'}} onClick={this.showDrawer}>
            <UnorderedListOutlined />
        </a>
        <Drawer
          style={{}}
          title={<div style={{margin: 'auto', textAlign: 'center'}}>
            <img style={{width: 50}} src='http://genuineapparelgrowth.com/Images/WhiteLabel.png' />
          </div>}
          placement="top"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          key="top"
        >
          <Menu
          defaultSelectedKeys={[subPath && subPath != 'reports' ? subPath : 'dashboard']}
          mode="inline">
            <Menu.Item key='dashboard' icon={path == '/' || path == '/reports' ?  <DashboardFilled/> : <DashboardOutlined/>}>
              <Link to='/' onClick={this.onClose}/>
              Dashboard
            </Menu.Item>
            <Menu.Item key='filters' icon={subPath == 'filters' ? <FilterFilled/> : <FilterOutlined/>}>
              <Link to='/filters' onClick={this.onClose}/>
              Action Filters
            </Menu.Item>
            <Menu.Item key='settings' icon={subPath == 'settings' ? <SettingFilled/> :  <SettingOutlined/>}>
              <Link to='/settings' onClick={this.onClose}/>
              Settings
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => this.props.logout()}>
              Log Out
            </Menu.Item>
          </Menu>

        </Drawer>
      </div>
    )
  }
}

export default NavBar;