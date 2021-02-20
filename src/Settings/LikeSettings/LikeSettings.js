import React from 'react';
import { Typography, List, Card } from 'antd';

const { Title } = Typography;

class LikeSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usingLikes: true,
      userPromoAccounts: null
    }
  }

  render() {
    return(
      <div>
        <Title>
          Like Status
        </Title>

        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.props.promoCommentLevels}
          renderItem={item => {
            return (
              <List.Item>
                <Card
                style={{borderRadius: '1.5vh', height: "100%", borderWidth: 1,
                borderColor: 'white', backgroundColor: 'rgb(36, 36, 52)',
                textAlign: 'center', width: '35vh', color: 'white'}}
                headStyle={{ color: 'white'}}
                title={'test'}
                >{'body'}</Card>
              </List.Item>
            )}}
        />
      </div>
    )
  }
}

export default LikeSettings;