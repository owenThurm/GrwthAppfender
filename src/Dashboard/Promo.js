import React from 'react';
import { Card, Input, Switch, Row, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

class Promo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username'),
      promoUsername: "",
      promoPassword: "",
      targetAccount: "",
      inactive: true, // Describes toggle state
      underReview: false,

    }
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('onbeforeunload', this.getInfo())
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.getInfo())
  }

  getInfo() {
    axios.get(`https://cors-anywhere.herokuapp.com/34.226.214.56/api/promo?username=${this.state.promoUsername}`)
      .then(response => {
        console.log(response);
        // If account is not under review
        if (!response.data.data.under_review) {
          // Handles case where account has been previously submitted
          this.setState({
            inactive: response.data.is_active,
            promoUsername: response.data.promoUsername,
            promoPassword: response.data.promoPassword,
            targetAccount: response.data.targetAccount,
            username: response.data.accountUsername,
            underReview: false
          }) // allow activation
        }
        else { // Else, account is under review
          this.setState({
            inactive: true,
            promoUsername: response.data.promoUsername,
            promoPassword: response.data.promoPassword,
            targetAccount: response.data.targetAccount,
            username: response.data.accountUsername,
            underReview: true
          }) // allow activation
        }


      })
      .catch(error => {
        console.log(error);
        console.log("Account may not have been submitted for review yet.")
      });
  }

  onClickHandler() {
    console.log("I was clicked!");
    axios.post("https://cors-anywhere.herokuapp.com/34.226.214.56/api/promo", {
      "promo_username": this.state.promoUsername,
      "promo_password": this.state.promoPassword,
      "target_account": this.state.targetAccount,
      "user": this.state.username
    })
      .then(response => {
        console.log(response);
        this.setState({
          promoUsername: response.data.data.promo_username,
          targetAccount: response.data.data.target_account
        })
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  onChangeHandler(event, type) {
    console.log(event.target.value);
    console.log(type);
    switch (type) {
      case "promoUsername":
        this.setState({ promoUsername: event.target.value })
        break;
      case "promoPassword":
        this.setState({ promoPassword: event.target.value })
        break;
      case "targetAccount":
        this.setState({ targetAccount: event.target.value })
        break;
    }
  }

  render() {
    return (
      <div style={{ marginTop: 30, marginLeft: 40 }}>
        <Card style={{
          height: 320, width: 250, backgroundColor: 'rgb(36, 36, 52)',
          borderColor: 'rgb(190, 190, 194)', borderRadius: '1.5vh', borderWidth: 2
        }}
          title='Promo Account #1'
          headStyle={{ color: 'white', textAlign: 'center', borderWidth: 2, borderBottomColor: 'rgb(190, 190, 194)' }}>

          <Row style={{ marginBottom: 5 }}>
            <Input onChange={event => this.onChangeHandler(event, "promoUsername")} defaultValue={this.state.promoUsername} disabled={this.state.underReview} placeholder='Username' style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }} />
          </Row >
          <Row style={{ marginBottom: 10 }}>
            <Input onChange={event => this.onChangeHandler(event, "promoPassword")} defaultValue={this.state.promoPassword} disabled={this.state.underReview} placeholder='Password' style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }} />
          </Row>

          <Row style={{ marginBottom: 30 }}>
            <Input onChange={event => this.onChangeHandler(event, "targetAccount")} defaultValue={this.state.targetAccount} disabled={this.state.underReview} placeholder="Target Audience Account" style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)' }} />
          </Row>

          <Row style={{ marginBottom: 30 }}>
            <Switch disabled={this.state.underReview} style={{ width: 270 }}
              checkedChildren={
                <div>
                  Active <CheckOutlined />
                </div>}
              unCheckedChildren={
                <div>
                  Inactive <CloseOutlined />
                </div>
              } defaultUnchecked
            />
          </Row>


          <Row>
            <Button disabled={this.state.underReview} type="primary" block onClick={this.onClickHandler}>
              Submit Account For Review
              </Button>
          </Row>




        </Card>
      </div>
    )
  }
}

export default Promo;