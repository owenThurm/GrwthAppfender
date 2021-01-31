import React from 'react';
import { Card, Input, Switch, Row, Button, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, EyeInvisibleOutlined, EyeOutlined,
  InstagramOutlined, AimOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

class PromoAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userUsername: props.userUsername,
      promoUsername: props.promoUsername,
      promoPassword: '',
      targetAccount: '',
      active: false,
      underReview: false,
      submitted: props.submitted,
      editing: false,
      editedPromoUsername: props.promoUsername,
      editedPromoPassword: '',
      editedTargetAccount: ''
    }
  }

  componentDidMount() {
    axios.get('https://owenthurm.com/api/promo?username=' + this.props.promoUsername)
      .then(response => {
        this.setState({
          promoPassword: response.data.promo_password,
          active: response.data.activated,
          underReview: response.data.under_review,
          targetAccount: response.data.target_account,
          editedPromoPassword: response.data.promo_password,
          editedTargetAccount: response.data.target_account
        });
      }).catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if(prevProps != this.props) {
      this.setState({
        submitted: this.props.submitted,
        promoUsername: this.props.promoUsername,
        userUsername: this.props.userUsername,
        editedPromoUsername: this.props.promoUsername
      })
      axios.get('https://owenthurm.com/api/promo?username=' + this.props.promoUsername)
      .then(response => {
        this.setState({
          promoPassword: response.data.promo_password,
          targetAccount: response.data.target_account,
          active: response.data.activated,
          underReview: response.data.under_review,
          editedPromoPassword: response.data.promo_password,
          editedTargetAccount: response.data.target_account
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }

  //When adding a promo account for the first time
  onSubmitReview() {
    console.log(this.state)
    if(this.state.promoUsername != '' && this.state.promoUsername != undefined
      && this.state.promoPassword != '' && this.state.promoPassword != undefined
      && this.state.targetAccount != '' && this.state.targetAccount != undefined) {

      axios.post('https://owenthurm.com/api/promo', {
        "promo_username": this.state.promoUsername,
        "promo_password": this.state.promoPassword,
        "target_account": this.state.targetAccount,
        "user": this.state.userUsername
      }).then(response => {
        console.log(response);
        this.setState({
          submitted: true,
          underReview: true,
          active: false,
          editedPromoUsername: this.state.promoUsername,
          editedPromoPassword: this.state.promoPassword,
          editedTargetAccount: this.state.targetAccount
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }

  updatePromo = () => {
    console.log('called update')
    if(!(this.state.promoUsername == this.state.editedPromoUsername
        && this.state.promoPassword == this.state.editedPromoPassword
        && this.state.targetAccount == this.state.editedTargetAccount)) {
          console.log('was a difference')
        //axios put to update the account
        //set to underreview and deactivated
        //submitted = true -> should already be true
        axios.put('https://owenthurm.com/api/promo', {
          'old_promo_username': this.state.promoUsername,
          'new_promo_username': this.state.editedPromoUsername,
          'new_promo_password': this.state.editedPromoPassword,
          'new_promo_target': this.state.editedTargetAccount
        }).then(response => {
          console.log(response);
          console.log('state', this.state)
          this.setState({
            underReview: true,
            activated: false,
            submitted: true,
            editing: false,
            promoUsername: this.state.editedPromoUsername,
            promoPassword: this.state.editedPromoPassword,
            targetAccount: this.state.editedTargetAccount
          })
        }).catch(err => {
          console.log(err);
        });
      }
  }

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    }, () => console.log(this.state));
  }

  onChangeHandler(event, type) {
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
      case "editedPromoUsername":
        this.setState({ editedPromoUsername: event.target.value })
        break;
      case "editedPromoPassword":
        this.setState({ editedPromoPassword: event.target.value })
        break;
      case "editedTargetAccount":
        this.setState({ editedTargetAccount: event.target.value }, () => console.log(this.state))
        break;
    }
  }

  changeActivation = (event) => {
    if(event) {
      axios.post('https://owenthurm.com/api/activate', {
        "promo_username": this.state.promoUsername
      }).then(response => {
        console.log(response);
        this.setState({
          active: event
        });
      }).catch(err => {
        console.log(err);
      });
    } else {
      axios.post('https://owenthurm.com/api/deactivate', {
        "promo_username": this.state.promoUsername
      }).then(response => {
        console.log(response);
        this.setState({
          active: event
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }

  submitForReviewButton = () => {
    if(!this.state.submitted) {
      return <Button
      style={{backgroundColor: 'rgb(36, 36, 52)', borderRadius: '1.2vh', color: 'white', margin: 'auto'}}
      onClick={() => this.onSubmitReview()}>
        Submit For Review
      </Button>
    } else if(this.state.underReview && !this.state.editing) {
      return <Button disabled={true}
      style={{backgroundColor: 'rgb(36, 36, 52)', borderRadius: '1.2vh', color: 'white', margin: 'auto'}}>
        Under Review
      </Button>
    }
  }

  activateSwitch = () => {
    if(this.state.submitted && !this.state.underReview && !this.state.editing) {
      return <Switch style={{ width: 270 }}
      checked={this.state.active}
      onChange={(event) => this.changeActivation(event)}
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
    }
  }

  usernameField = () => {
    if(this.state.submitted && !this.state.editing) {
      return <Title level={5} style={{color: 'white', fontSize: 15}}>{this.state.promoUsername}</Title>
    } else if (!this.state.submitted && !this.state.editing){
      return <Input onChange={event => this.onChangeHandler(event, "promoUsername")}
          prefix={<InstagramOutlined className='site-form-item-icon'/>}
          defaultValue={this.state.promoUsername}
          disabled={this.state.underReview}
          placeholder='Username'
          style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
    } else if(this.state.editing) {
      return <Input onChange={event => this.onChangeHandler(event, "editedPromoUsername")}
          prefix={<InstagramOutlined className='site-form-item-icon'/>}
          defaultValue={this.state.promoUsername}
          value={this.state.editedPromoUsername}
          placeholder='Username'
          style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />

    }
  }

  passwordField = () => {
    if(!this.state.submitted) {
      return <Input.Password onChange={event => this.onChangeHandler(event, "promoPassword")}
          prefix={<LockOutlined className='site-form-item-icon'/>}
          defaultValue={this.state.promoPassword}
          iconRender={visible => (visible ? <EyeOutlined style={{color: 'white'}}/> : <EyeInvisibleOutlined style={{color:'white'}}/>)}
          placeholder='Password'
          style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
    } else if(this.state.editing) {
      return <Input.Password onChange={event => this.onChangeHandler(event, "editedPromoPassword")}
          prefix={<LockOutlined className='site-form-item-icon'/>}
          defaultValue={this.state.promoPassword}
          value={this.state.editedPromoPassword}
          iconRender={visible => (visible ? <EyeOutlined style={{color: 'white'}}/> : <EyeInvisibleOutlined style={{color:'white'}}/>)}
          placeholder='Password'
          style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
    }
  }

  targetAccountField = () => {
    if(this.state.submitted && !this.state.editing) {
      return <Title level={5} style={{fontSize: 14, color: 'white'}}>{'Targeting: ' + this.state.targetAccount }</Title>
    } else if(this.state.submitted && this.state.editing) {
      return <Input onChange={event => this.onChangeHandler(event, "editedTargetAccount")}
          prefix={<AimOutlined className='site-form-item-icon'/>}
          defaultValue={this.state.targetAccount}
          value={this.state.editedTargetAccount}
          placeholder="Target IG Account"
          style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
    } else {
      return <Input onChange={event => this.onChangeHandler(event, "targetAccount")}
          prefix={<AimOutlined className='site-form-item-icon'/>}
          defaultValue={this.state.targetAccount}
          placeholder="Target IG Account"
          style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
    }
  }

  editButton = () => {
    if(this.state.submitted && !this.state.editing) {
      return <Button
              style={{margin: 'auto', width: 80}}
              onClick={this.toggleEdit}>
              Edit
             </Button>
    } else if(this.state.submitted && this.state.editing) {
      return <Row style={{margin: 'auto'}}>
          <Button
              style={{marginRight: 5, width: 80}}
              onClick={this.toggleEdit}>
              Cancel
             </Button>
          <Button
            style={{marginLeft: 5, width: 80}}
            onClick={this.updatePromo}>
            Submit
          </Button>
        </Row>
    }
  }

  render() {
    return(
      <Card style={{
        height: 320, width: 250, backgroundColor: 'rgb(36, 36, 52)',
        borderColor: 'rgb(190, 190, 194)', borderRadius: '1.5vh', borderWidth: 2
      }}
        title='Promo Account #1'
        headStyle={{ color: 'white', textAlign: 'center', borderWidth: 2, borderBottomColor: 'rgb(190, 190, 194)' }}>

        <Row style={{ marginBottom: 5 }}>
          <div style={{margin: 'auto'}}>
            {this.usernameField()}
          </div>
        </Row >
        <Row style={{ marginBottom: 5 }}>
              {this.passwordField()}
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <div style={{margin: 'auto'}}>
            {this.targetAccountField()}
          </div>
        </Row>

        <Row style={{ marginBottom: 40 }}>
          {this.activateSwitch()}
        </Row>

        <Row style={{marginBottom: 15}}>
          {this.editButton()}
        </Row>

        <Row>
          {this.submitForReviewButton()}
        </Row>
      </Card>
    )
  }
}

export default PromoAccount;