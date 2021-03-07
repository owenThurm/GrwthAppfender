import React from 'react';
import PromoAccount from './PromoAccount';
import { List } from 'antd';

class Promo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userUsername: props.props.userUsername,
      userPromoAccounts: props.props.userPromoAccounts,
    }
  }

  render() {
    let userPromoAccountList = this.props.props.userPromoAccounts ?
     JSON.parse(JSON.stringify(this.props.props.userPromoAccounts))
     : [];

    if(userPromoAccountList.length < 1) {
      userPromoAccountList.push({
        newPromo: true
      })
    }
    console.log(this.props.props.requeryUser)

    return (
      <div style={{ marginTop: 30, marginLeft: 20 }}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={userPromoAccountList}
          renderItem={(promoAccount, index) => {
            return (
            <List.Item>
              <PromoAccount
              promoNumber={index+1}
              userUsername={this.props.props.userUsername}
              userIsOnboarding={this.props.props.userIsOnboarding}
              promoData={promoAccount}
              menuIsCollapsed={this.props.props.menuIsCollapsed}
              submitted={!promoAccount.newPromo}
              requeryUser={this.props.props.requeryUser}
              />
            </List.Item>
          )}}
        />
      </div>
    )
  }
}

export default Promo;