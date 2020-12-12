import React from 'react';
import { Row, Card, Menu } from 'antd';
import { RiseOutlined } from '@ant-design/icons';

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
            Promo
          </Menu.Item>
          <Menu.Item>
            Settings
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Dashboard;
