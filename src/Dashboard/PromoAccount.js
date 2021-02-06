import React from 'react';
import { Card, Input, Switch, Row, Button, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, EyeInvisibleOutlined, EyeOutlined,
  InstagramOutlined, AimOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import EditableTagGroup from './EditableTag';

const { Title } = Typography;

class PromoAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userUsername: props.userUsername,
      promoUsername: props.promoUsername,
      promoPassword: '',
      targetAccounts: [],
      active: false,
      underReview: false,
      submitted: props.submitted,
      editing: false,
      editedPromoUsername: props.promoUsername,
      editedPromoPassword: '',
      editedTargetAccounts: []
    }
  }

  componentDidMount() {
    axios.get('https://owenthurm.com/api/promo?username=' + this.props.promoUsername)
      .then(response => {
        this.setState({
          promoPassword: response.data.promo_password,
          active: response.data.activated,
          underReview: response.data.under_review,
          targetAccounts: response.data.target_account,
          editedPromoPassword: response.data.promo_password,
          editedTargetAccounts: response.data.target_account
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
          targetAccounts: response.data.target_account,
          active: response.data.activated,
          underReview: response.data.under_review,
          editedPromoPassword: response.data.promo_password,
          editedTargetAccounts: response.data.target_account
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
      && this.state.targetAccounts != '' && this.state.targetAccounts != undefined) {

      axios.post('https://owenthurm.com/api/promo', {
        "promo_username": this.state.promoUsername,
        "promo_password": this.state.promoPassword,
        "target_account": this.state.targetAccounts,
        "user": this.state.userUsername
      }).then(response => {
        console.log(response);
        this.setState({
          submitted: true,
          underReview: true,
          active: false,
          editedPromoUsername: this.state.promoUsername,
          editedPromoPassword: this.state.promoPassword,
          editedTargetAccounts: this.state.targetAccounts
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }

  updatePromo = () => {
    if(!(this.state.promoUsername == this.state.editedPromoUsername
        && this.state.promoPassword == this.state.editedPromoPassword
        && this.state.targetAccounts == this.state.editedTargetAccounts)) {
          console.log('was a difference')
        //axios put to update the account
        //set to underreview and deactivated
        //submitted = true -> should already be true
        axios.put('https://owenthurm.com/api/promo', {
          'old_promo_username': this.state.promoUsername,
          'new_promo_username': this.state.editedPromoUsername,
          'new_promo_password': this.state.editedPromoPassword,
          'new_promo_target': this.state.editedTargetAccounts
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
            targetAccounts: this.state.editedTargetAccounts
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
      case "editedPromoUsername":
        this.setState({ editedPromoUsername: event.target.value })
        break;
      case "editedPromoPassword":
        this.setState({ editedPromoPassword: event.target.value })
        break;
    }
  }

  setTargetAccounts = targetAccounts => {
    this.setState({
      targetAccounts: targetAccounts
    }, () => console.log('UPDATED STATE>>>', this.state));
  }

  setEditedTargetAccounts = targetAccounts => {
    this.setState({
      editedTargetAccounts: targetAccounts
    }, () => console.log("UPDATED STATE2>>>", this.state))
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
      return <Switch style={{ width: 200, margin: 'auto' }}
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

  targetAccountsField = () => {

    if(this.state.submitted) {
      return (<EditableTagGroup
        isEditing={this.state.editing}
        targetAccountsTags={this.state.editedTargetAccounts}
        setTargetAccounts={this.setEditedTargetAccounts}
        />)
    } else {
      return (<EditableTagGroup
        isEditing={true}
        targetAccountsTags={this.state.targetAccounts}
        setTargetAccounts={this.setTargetAccounts}
        />)
    }
  }

  editButton = () => {
    if(this.state.submitted && !this.state.editing) {
      return (
        <Row style={{position: 'absolute', bottom: 55, margin: 'auto', left: 0, right: 0}}>
          <Button
            style={{margin: 'auto', width: 80}}
            onClick={this.toggleEdit}>
            Edit
          </Button>
        </Row>)
    } else if(this.state.submitted && this.state.editing) {
      return <Row style={{position: 'absolute', margin: 'auto', left: 0, right: 0, bottom: 20 }}>
          <div style={{margin: 'auto'}}>
            <Button
              style={{ width: 80, marginRight: 5 }}
              onClick={this.toggleEdit}>
              Cancel
            </Button>
            <Button
              style={{ width: 80, marginRight: 5 }}
              onClick={this.updatePromo}>
              Submit
            </Button>
          </div>
        </Row>
    }
  }

  render() {
    return(
      <Card style={{
        height: 350, width: 280, backgroundColor: 'rgb(36, 36, 52)',
        borderColor: 'rgb(190, 190, 194)', borderRadius: '1.5vh', borderWidth: 2
      }}
        title='Promo Account #1'
        headStyle={{ color: 'white', textAlign: 'center', borderWidth: 2, borderBottomColor: 'rgb(190, 190, 194)' }}>

        <Row style={{ marginBottom: 5 }}>
          <div style={{ margin: 'auto' }}>
            {this.usernameField()}
          </div>
        </Row >
        <Row style={{ marginBottom: 5 }}>
          <div style={{ margin: 'auto' }}>
            {this.passwordField()}
          </div>
        </Row>

        <Row style={{  }}>
          <div style={{margin: 'auto', textAlign: 'center'}}>
            <Title style={{color: 'white', fontSize: 12, textDecoration: 'underline'}} level={5}><AimOutlined /> Target IG Accounts</Title>
            {this.targetAccountsField()}
          </div>
        </Row>

        {this.editButton()}

        <Row style={{bottom: 15, position: 'absolute', margin: 'auto', left: 0, right: 0}}>
          {this.submitForReviewButton()}
        </Row>

        <Row style={{ position: 'absolute', bottom: 20, margin: 'auto', left: 0, right: 0 }}>
          {this.activateSwitch()}
        </Row>


      </Card>
    )
  }
}

export default PromoAccount;