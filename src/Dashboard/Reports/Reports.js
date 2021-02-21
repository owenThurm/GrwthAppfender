import React from 'react';
import { Card, Row, Spin } from 'antd';
import axios from 'axios';
import TotalComments from './TotalComments';
import PromoAccountStats from './PromoAccountStats';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userUsername: props.props.userUsername,
      totalComments: props.props.userTotalComments,
      promoAccounts: props.props.userPromoAccounts,
    }
  }

  reportsBody = () => {
    if(this.state.loading) {
      return (
        <div style={{position: 'absolute', top: '50vh', left: 0, right: 0}}>
          <Spin style={{position: 'absolute', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0}}
          size='large'/>
        </div>
      )
    } else {
      return (
          <div>
            <Row type='flex' style={{marginBottom: 15}}>
              <TotalComments userTotalComments={this.props.props.userTotalComments}/>
            </Row>
            <Row type='flex'>
              <PromoAccountStats userPromoAccounts={this.props.props.userPromoAccounts}/>
            </Row>
          </div>
        )
    }
  }

  render() {
    return(
      <Card bodyStyle={{color: 'white'}} style={{borderRadius: '1.5vh', height: '100vh', margin: 15, borderWidth: 2, borderColor: 'rgb(38, 41, 56)', backgroundColor: 'rgb(36, 36, 52)'}}>
        {this.reportsBody()}
      </Card>
    )
  }
}

export default Reports;