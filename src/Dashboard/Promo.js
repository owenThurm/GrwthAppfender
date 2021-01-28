import React from 'react';
import axios from 'axios';
import PromoAccount from './PromoAccount';

class Promo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userUsername: props.props.userUsername,
      promoUsernames: []
    }
  }

  componentDidMount() {
    axios.post('https://owenthurm.com/api/user/promoaccounts',
     {
       "username": this.props.props.userUsername
      }).then(response => {
        console.log('promo tab post result: ', response);
        this.setState({
          promoUsernames: response.data.data
        });
      }).catch(err => {
        console.log(err);
      })
  }

  componentDidUpdate(prevProps) {
    if(prevProps != this.props) {
      axios.post('https://owenthurm.com/api/user/promoaccounts',
     {
       "username": this.props.props.userUsername
      }).then(response => {
        console.log('promo tab post result: ', response);
        this.setState({
          promoUsernames: response.data.data
        });
      }).catch(err => {
        console.log(err);
      });

    }
  }

  render() {
    return (
      <div style={{ marginTop: 30, marginLeft: 40 }}>
        <PromoAccount userUsername={this.props.props.userUsername}
        submitted={this.state.promoUsernames.length > 0}
        promoUsername={this.state.promoUsernames.length > 0 ? this.state.promoUsernames[0] : ''}/>
      </div>
    )
  }
}

export default Promo;