import React from 'react';
import { Card, List } from 'antd';

class PromoAccountStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPromoAccounts: props.userPromoAccounts
    }
  }

  render() {
    console.log('promo account stats props', this.props)
    return(
      <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={this.props.userPromoAccounts}
      renderItem={promoAccount => {
        return (
          <List.Item>
            <Card
            style={{borderRadius: '1.5vh', height: "100%", borderWidth: 1,
            borderColor: 'white', backgroundColor: 'rgb(36, 36, 52)',
            textAlign: 'center', width: '35vh', color: 'white'}}
            headStyle={{ color: 'white'}}
            title={promoAccount.promo_username}
            >{'Volume: ' + promoAccount.promo_comment_level * 10 + ' comments/day'}</Card>
          </List.Item>
        )}}
      />
    )
  }
}

export default PromoAccountStats;