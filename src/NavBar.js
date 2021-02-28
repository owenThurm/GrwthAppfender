import React from 'react';
import { Drawer, Button, Menu } from 'antd';
import { DownOutlined, DashboardOutlined, SettingOutlined, LogoutOutlined, CaretDownFilled, OrderedListOutlined, UnorderedListOutlined, BarsOutlined } from '@ant-design/icons'
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
    return(
      <div>
        <a style={{color: 'white'}} onClick={this.showDrawer}>
            <UnorderedListOutlined />
        </a>
        <Drawer
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
          mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to='/' onClick={this.onClose}/>
                Dashboard
              </Menu.Item>
              <Menu.Item key="2" icon={<SettingOutlined />}>
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