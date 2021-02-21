import React from 'react';
import { Card, Input, Switch, Row, Col, Button, Typography, message } from 'antd';
import {
  CheckOutlined, CloseOutlined, EyeInvisibleOutlined, EyeOutlined,
  InstagramOutlined, AimOutlined, LockOutlined, UserOutlined, EditOutlined,
  SettingOutlined } from '@ant-design/icons';
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
      configuring: false,
      promoUsingLikes: props.promoUsingLikes,
      editedTargetAccounts: [],
      isDisabled: props.data ? props.data.promo_is_disabled : false
    }
  }

  componentDidMount() {
    axios.get('https://owenthurm.com/api/promo?username=' + this.props.promoUsername)
      .then(response => {
        this.setState({
          promoPassword: response.data.promo_password,
          active: response.data.activated,
          underReview: response.data.under_review,
          targetAccounts: response.data.target_accounts,
          editedPromoPassword: response.data.promo_password,
          editedTargetAccounts: response.data.target_accounts,
          promoUsingLikes: response.data.is_liking,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
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
            targetAccounts: response.data.target_accounts,
            active: response.data.activated,
            underReview: response.data.under_review,
            editedPromoPassword: response.data.promo_password,
            editedTargetAccounts: response.data.target_accounts,
            promoUsingLikes: response.data.is_liking,
          });
        }).catch(err => {
          console.log(err);
        });
    }
  }

  //When adding a promo account for the first time
  onSubmitReview() {
    if (this.state.promoUsername != '' && this.state.promoUsername != undefined
      && this.state.promoPassword != '' && this.state.promoPassword != undefined
      && this.state.targetAccounts != [] && this.state.targetAccounts != undefined
      && this.state.targetAccounts.length > 0) {
      axios.post('https://owenthurm.com/api/promo', {
        "promo_username": this.state.promoUsername,
        "promo_password": this.state.promoPassword,
        "target_accounts": this.state.targetAccounts,
        "user": this.state.userUsername
      }).then(response => {
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
    } else {
      this.warningMessage('Fill in all fields and include target brands!')
    }
  }



  updatePromo = () => {
    if (!(this.state.promoUsername == this.state.editedPromoUsername
      && this.state.promoPassword == this.state.editedPromoPassword
      && this.state.targetAccounts == this.state.editedTargetAccounts)
      && (this.state.editedPromoUsername != '' && this.state.editedPromoUsername != undefined
        && this.state.editedPromoPassword != '' && this.state.editedPromoPassword != undefined
        && this.state.editedTargetAccounts != undefined && this.state.editedTargetAccounts.length > 0)) {
      //axios put to update the account
      //set to underreview and deactivated
      //submitted = true -> should already be true
      axios.put('https://owenthurm.com/api/promo', {
        'old_promo_username': this.state.promoUsername,
        'new_promo_username': this.state.editedPromoUsername,
        'new_promo_password': this.state.editedPromoPassword,
        'new_promo_targets': this.state.editedTargetAccounts
      }).then(response => {
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
    } else {
      this.warningMessage('Make changes to submit for review!')
    }
  }

  updateUsingLikes = usingLikes => {
    //axios put to update using likes
    axios.put('https://owenthurm.com/api/promo/liking', {
      'promo_username': this.state.promoUsername,
      'is_liking': usingLikes,
    }).then(response => {
      this.setState({
        promoUsingLikes: usingLikes,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  warningMessage = warning => {
    message.warning(warning);
  }

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing,
      configuring: false,
    });
  }

  toggleConfigure = () => {
    this.setState({
      configuring: !this.state.configuring,
      editing: false,
    })
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
    });
  }

  setEditedTargetAccounts = targetAccounts => {
    this.setState({
      editedTargetAccounts: targetAccounts
    });
  }

  changeActivation = (event) => {
    if (event) {
      axios.post('https://owenthurm.com/api/activate', {
        "promo_username": this.state.promoUsername
      }).then(response => {
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
        this.setState({
          active: event
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }

  submitForReviewButton = () => {
    if (!this.state.submitted) {
      return <Button
        style={{ backgroundColor: 'rgb(36, 36, 52)', borderRadius: '1.2vh', color: 'white', margin: 'auto', marginTop:10 }}
        onClick={() => this.onSubmitReview()}>
        Submit For Review
      </Button>
    } else if (this.state.underReview && !this.state.editing) {
      return <Button disabled={true}
        style={{ backgroundColor: 'rgb(36, 36, 52)', borderRadius: '1.2vh', color: 'white', margin: 'auto', marginTop:10 }}>
        <strong>Status: Under Review</strong>
      </Button>
    }
  }

  activateSwitch = () => {
    if (this.state.configuring) {
      return
    } else if(this.state.submitted && !this.state.underReview
          && !this.state.editing && this.state.isDisabled) {
        return <Switch
        style={{ width: 200, margin: 'auto', marginTop: 20 }}
        disabled={this.state.isDisabled}
        checked={false}
        unCheckedChildren={
          <div>
            Promo Disabled <CloseOutlined />
          </div>
        }
        />

    } else if (this.state.submitted && !this.state.underReview && !this.state.editing) {
      return <Switch
        style={{ width: 200, margin: 'auto', marginTop: 20 }}
        disabled={this.state.targetAccounts == null || this.state.targetAccounts.length == 0}
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
        }
      />
    }
  }

  usernameField = () => {
    if (this.state.submitted && !this.state.editing) {
      return (<Row>
        <Title level={5} style={{ color: 'white', fontSize: 15 }}><UserOutlined style={{ color: "white", "marginRight": 5 }} />{this.state.promoUsername}</Title>
      </Row>);
    } else if (!this.state.submitted && !this.state.editing) {
      return <Input onChange={event => this.onChangeHandler(event, "promoUsername")}
        prefix={<InstagramOutlined className='site-form-item-icon' />}
        defaultValue={this.state.promoUsername}
        disabled={this.state.underReview}
        placeholder='Username'
        style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
    } else if (this.state.editing) {
      return <Input onChange={event => this.onChangeHandler(event, "editedPromoUsername")}
        prefix={<InstagramOutlined className='site-form-item-icon' />}
        defaultValue={this.state.promoUsername}
        value={this.state.editedPromoUsername}
        placeholder='Username'
        style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />

    }
  }

  passwordField = () => {
    if (!this.state.submitted) {
      return <Input.Password onChange={event => this.onChangeHandler(event, "promoPassword")}
        prefix={<LockOutlined className='site-form-item-icon' />}
        defaultValue={this.state.promoPassword}
        iconRender={visible => (visible ? <EyeOutlined style={{ color: 'white' }} /> : <EyeInvisibleOutlined style={{ color: 'white' }} />)}
        placeholder='Password'
        style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
    } else if (this.state.editing) {
      return <Input.Password onChange={event => this.onChangeHandler(event, "editedPromoPassword")}
        prefix={<LockOutlined className='site-form-item-icon' />}
        defaultValue={this.state.promoPassword}
        value={this.state.editedPromoPassword}
        iconRender={visible => (visible ? <EyeOutlined style={{ color: 'white' }} /> : <EyeInvisibleOutlined style={{ color: 'white' }} />)}
        placeholder='Password'
        style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
    }
  }

  targetAccountsField = () => {
    if (this.state.configuring) {
      return
    } else if (this.state.submitted && this.state.editing) {
      return (<div>
        <Title style={{ color: 'white', fontSize: 14, textDecoration: 'underline' }}
         level={5}><AimOutlined style={{ marginRight: 5 }} /> Target IG Accounts</Title>
      <EditableTagGroup
        isEditing={this.state.editing}
        targetAccountsTags={this.state.editedTargetAccounts}
        setTargetAccounts={this.setEditedTargetAccounts}
      />
      </div>)
    } else if (this.state.submitted && !this.state.editing) {
      return (<div>
        <Title style={{ color: 'white', fontSize: 14, textDecoration: 'underline' }}
         level={5}><AimOutlined style={{ marginRight: 5 }} /> Target IG Accounts</Title>
        <EditableTagGroup
        isEditing={this.state.editing}
        targetAccountsTags={this.state.targetAccounts}
        setTargetAccounts={this.setEditedTargetAccounts}
      />
      </div>)
    } else {
      return (<div>
        <Title style={{ color: 'white', fontSize: 14, textDecoration: 'underline' }}
         level={5}><AimOutlined style={{ marginRight: 5 }} /> Target IG Accounts</Title>
        <EditableTagGroup
        isEditing={true}
        targetAccountsTags={this.state.targetAccounts}
        setTargetAccounts={this.setTargetAccounts}
      />
      </div>)
    }
  }

  editButton = () => {
    if(this.state.submitted && this.state.editing) {
      return <Row>
        <div style={{ margin: 'auto' }}>
          <Button
            style={{ width: 80, marginRight: 5, marginTop: 20 }}
            onClick={this.toggleEdit}>
            Cancel
            </Button>
          <Button
            style={{ width: 80, marginRight: 5, marginTop: 20 }}
            onClick={this.updatePromo}>
            Submit
            </Button>
        </div>
      </Row>
    }
  }

  usingLikesConfig = () => {
    if(this.state.configuring) {
      return (
      <div>
        <Row>
          <Title style={{fontSize: 14, color: 'white'}}>
            Liking Photos:
          </Title>
          <Switch
          style={{position: 'absolute', right: 15}}
          onChange={this.updateUsingLikes}
          checked={this.state.promoUsingLikes}
          checkedChildren={
            <div>
              <CheckOutlined/> (Recommended)
            </div>}
          unCheckedChildren={
            <div>
              <CloseOutlined/> (Discouraged)
            </div>}/>
        </Row>
      </div>)
    }
  }

  render() {
    console.log('Promo Props', this.props)
    console.log('promo state', this.state)
    return (
      <Row type="flex" gutter={[40, 40]}>
        <Col>
          <Card style={{
            height:"100%", width: 300, backgroundColor: 'rgb(36, 36, 52)',
            borderColor: 'rgb(190, 190, 194)', borderRadius: '1.5vh', borderWidth: 2
          }}
          actions={ this.state.submitted ? [
            <SettingOutlined onClick={this.toggleConfigure}/>,
            <EditOutlined onClick={this.toggleEdit}/>
          ] : []}
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

            <Row>
              {this.usingLikesConfig()}
            </Row>

            <Row>
              <div style={{ margin: 'auto', textAlign: 'center' }}>
                {this.targetAccountsField()}
              </div>
            </Row>

            {this.editButton()}

            <Row>
              {this.submitForReviewButton()}
            </Row>

            <Row>
              {this.activateSwitch()}
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default PromoAccount;