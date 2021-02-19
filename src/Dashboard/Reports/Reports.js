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
      totalComments: 0,
      promoCommentLevels: [],
      loading: true,
    }
  }

  componentDidMount() {
    //axios get statistics
    axios.get(
      'https://owenthurm.com/api/user/statistics?user='+this.props.props.userUsername
    ).then(response => {
      this.setState({
        totalComments: response.data.data.all_time_num_comments,
        promoCommentLevels: response.data.data.user_promo_accounts_comment_level,
        loading: false,
      });
    }).catch(err => {
      console.log(err);
    });
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
              <TotalComments totalComments={this.state.totalComments}/>
            </Row>
            <Row type='flex'>
              <PromoAccountStats promoCommentLevels={this.state.promoCommentLevels}/>
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