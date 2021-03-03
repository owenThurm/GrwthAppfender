import React from 'react';
import { Card, Input, Switch, Row, Col, Button, Typography, message, Popover } from 'antd';
import {
  CheckOutlined, CloseOutlined, EyeInvisibleOutlined, EyeOutlined,
  InstagramOutlined, AimOutlined, LockOutlined, UserOutlined, EditOutlined,
  SettingOutlined, CaretRightFilled } from '@ant-design/icons';
import axios from 'axios';
import EditableTagGroup from './EditableTag';

const { Title } = Typography;

class PromoAccount extends React.Component {
  constructor(props) {
    super(props)
    console.log('constructed promo acount', props)
    console.log('targetAccounts', props.promoData.promo_target_accounts)
    this.state = {
      userUsername: props.userUsername,
      promoUsername: props.promoData.promo_username,
      promoPassword: props.promoData.promo_password,
      targetAccounts: props.promoData.promo_target_accounts,
      active: props.promoData.promo_is_activated,
      underReview: props.promoData.promo_under_review,
      isDisabled: props.promoData ? props.promoData.promo_is_disabled : false,
      submitted: props.submitted,
      editing: false,
      editedPromoUsername: props.promoData.promo_username,
      editedPromoPassword: props.promoData.promo_password,
      editedTargetAccounts: props.promoData.promo_target_accounts,
      configuring: false,
      promoUsingLikes: props.promoData.promo_is_liking,
      userIsOnboarding: props.userIsOnboarding,
      onBoardingStep: props.submitted ? 5 : 0,
    }
    console.log('state constructed', this.state)
    console.log('targetAccounts', props.promoData.promo_target_accounts)
  }

  componentDidUpdate(prevProps) {
    /*console.log('called component did update in card', prevProps, this.props)
    console.log(1, prevProps.promoData.promo_username == null)
    console.log(2, this.props.promoData.promo_username != prevProps.promoData.promo_username)
    if(prevProps.promoData.promo_username == null && this.props.promoData.promo_username != prevProps.promoData.promo_username) {
      console.log('resetting props')
      this.setState({
        promoUsername: this.props.promoData.promo_username,
        promoPassword: this.props.promoData.promo_password,
        targetAccounts: this.props.promoData.promo_target_accounts,
        active: this.props.promoData.promo_is_activated,
        underReview: this.props.promoData.promo_under_review,
        isDisabled: this.props.promoData ? this.props.promoData.promo_is_disabled : false,
        submitted: this.props.submitted,
        editedPromoUsername: this.props.promoData.promo_username,
        editedPromoPassword: this.props.promoData.promo_password,
        editedTargetAccounts: this.props.promoData.promo_target_accounts,
        promoUsingLikes: this.props.promoData.promo_is_liking,
        onBoardingStep: this.props.submitted ? 5 : 0,
      });
    }
    */
    if (prevProps.menuIsCollapsed != this.props.menuIsCollapsed && localStorage.getItem('isOnboarding') == 'true') {
      this.setState({
        userIsOnboarding: false
      }, () => this.setState({ userIsOnboarding: true }))
    }
  }

  //When adding a promo account for the first time
  onSubmitReview() {
    console.log('submitted for review')
    if (this.state.promoUsername != '' && this.state.promoUsername != undefined
      && this.state.promoPassword != '' && this.state.promoPassword != undefined
      && this.state.targetAccounts != [] && this.state.targetAccounts != undefined
      && this.state.targetAccounts.length > 0) {
      console.log({
        "promo_username": this.state.promoUsername,
        "promo_password": this.state.promoPassword,
        "target_accounts": this.state.targetAccounts,
        "user": this.state.userUsername
      })
      axios.post('https://owenthurm.com/api/promo', {
        "promo_username": this.state.promoUsername,
        "promo_password": this.state.promoPassword,
        "target_accounts": this.state.targetAccounts,
        "user": this.state.userUsername
      }).then(response => {
        if(response.data.message == 'invalid') {
          message.warning('promo account with username ' + this.state.promoUsername + ' already exists')
        } else {
          this.setState({
            submitted: true,
            underReview: true,
            active: false,
            editedPromoUsername: this.state.promoUsername,
            editedPromoPassword: this.state.promoPassword,
            editedTargetAccounts: this.state.targetAccounts,
            onBoardingStep: 5,
            promoUsingLikes: true
          });
        }
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
      userIsOnboarding: false
    }, () => this.setState({ userIsOnboarding: this.props.userIsOnboarding }));
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
      return (<Popover
        content={this.reviewButtonPopoverContent()}
        title={'Submit for review'}
        visible={this.state.userIsOnboarding && this.state.onBoardingStep == 4 && !this.state.submitted}
        placement='bottom'
        >
        <Button
        style={{ backgroundColor: 'rgb(36, 36, 52)', borderRadius: '1.2vh', color: 'white', margin: 'auto', marginTop:10 }}
        onClick={() => this.onSubmitReview()}>
          Submit For Review
        </Button>
      </Popover>)
    } else if (this.state.underReview && !this.state.editing) {
      return <div
        style={{margin: 'auto'}}
        ><Popover
        content={this.underReviewPopoverContent()}
        title={'Under Review'}
        visible={this.state.userIsOnboarding && this.state.onBoardingStep == 5}
        placement='bottom'
        >
        <Button disabled={true}
        style={{ backgroundColor: 'rgb(36, 36, 52)', borderRadius: '1.2vh', color: 'white', margin: 'auto', marginTop:10 }}>
          <strong>Status: Under Review</strong>
        </Button>
      </Popover>
      </div>
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
      return (
      <Popover
      content={this.usernamePopoverContent()}
      title={'IG Username'}
      visible={this.state.userIsOnboarding && this.state.onBoardingStep == 1}
      placement='bottom'
      >
        <Input onChange={event => this.onChangeHandler(event, "promoUsername")}
        prefix={<InstagramOutlined className='site-form-item-icon' />}
        defaultValue={this.state.promoUsername}
        disabled={this.state.underReview}
        placeholder='Username'
        style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
      </Popover>)
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
      return <Popover
        content={this.passwordPopoverContent()}
        title={'IG Password'}
        visible={this.state.userIsOnboarding && this.state.onBoardingStep == 2}
        placement='bottom'
        >
        <Input.Password onChange={event => this.onChangeHandler(event, "promoPassword")}
        prefix={<LockOutlined className='site-form-item-icon' />}
        defaultValue={this.state.promoPassword}
        iconRender={visible => (visible ? <EyeOutlined style={{ color: 'white' }} /> : <EyeInvisibleOutlined style={{ color: 'white' }} />)}
        placeholder='Password'
        style={{ borderRadius: '1.2vh', color: 'white', backgroundColor: 'rgb(36, 36, 52)', width: 200 }} />
        </Popover>
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
      return (
        <Popover
        content={this.targetAccountPopoverContent()}
        title='Target Accounts'
        visible={this.state.userIsOnboarding && this.state.onBoardingStep == 3}
        placement='bottom'
        ><div>
        <Title style={{ color: 'white', fontSize: 14, textDecoration: 'underline' }}
          level={5}><AimOutlined style={{ marginRight: 5 }} /> Target IG Accounts</Title>
          <EditableTagGroup
          isEditing={true}
          targetAccountsTags={this.state.targetAccounts}
          setTargetAccounts={this.setTargetAccounts}
          />
        </div>
        </Popover>)
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

  welcomePopoverContent = () => {
    return (
      <div style={{width: 300}}>
        This is your promo account, the Instagram account you'll be drawing traffic to!
        <br />
        <br />
        <a onClick={() => this.setState({
          onBoardingStep: 1
        })}>
          Next<CaretRightFilled />
        </a>
      </div>
    )
  }

  usernamePopoverContent = () => {
    return (
      <div style={{width: 300}}>
        Enter the <span style={{fontStyle: 'italic'}}>exact</span> username of the Instagram account you want to grow!
        {
        this.state.promoUsername ?
        <a onClick={() => this.setState({
          onBoardingStep: 2
        })}>
          <br />
          <br />
          Next<CaretRightFilled />
        </a> : ''
        }
      </div>
    )
  }

  passwordPopoverContent = () => {
    return (
      <div style={{width: 300}}>
        Enter the Instagram password for your promo account.
        <br />
        (Your information is PBKDF2 grade encrypted!)
        {
        this.state.promoPassword ?
        <a onClick={() => this.setState({
          onBoardingStep: 3
        })}>
          <br />
          <br />
          Next<CaretRightFilled />
        </a> : ''
        }
      </div>
    )
  }

  targetAccountPopoverContent = () => {
    return (
      <div style={{width: 300}}>
        Add some target IG accounts to draw traffic from!
        <br />
        (8 targets recommended)
        {
        this.state.targetAccounts != undefined && this.state.targetAccounts.length > 0 ?
        <a onClick={() => this.setState({
          onBoardingStep: 4
        })}>
          <br />
          <br />
          Next<CaretRightFilled />
        </a> : ''
        }
      </div>
    )
  }

  reviewButtonPopoverContent = () => {
    return (
      <div style={{width: 300}}>
        That's all!
        <br />
        <br />
        Submit your promo account and targets for review!
      </div>
    )
  }

  underReviewPopoverContent = () => {
    return (
      <div style={{width: 300}}>
        Your account details and targets are being validated...
        <br />
        Once your promo is approved you'll start getting traffic!
        <a onClick={() => this.setState({
          onBoardingStep: 6
        })}>
          <br />
          <br />
          Next<CaretRightFilled />
        </a>
      </div>
    )
  }

  promoConfigPopoverContent = () => {
    return (
      <div style={{width: 300}}>
        Here you can configure the behavior of your promo account.
        {this.state.configuring ? <a onClick={() => this.setState({
          onBoardingStep: 7
        })}>
          <br />
          <br />
          Next<CaretRightFilled />
        </a> : ''}
      </div>
    )
  }

  editPromoPopoverContent = () => {
    return (
      <div style={{width: 300}}>
        You can edit your promo account details and targets here.
        <br />
        That's it! Enjoy your traffic!
        <a onClick={() => this.setState({
          onBoardingStep: 8
        }, () => localStorage.setItem('isOnboarding', false))}>
          <br />
          <br />
          Done!<CaretRightFilled />
        </a>
      </div>
    )
  }

  render() {
    console.log('promo account props', this.props)
    console.log('promo account car state', this.state)
    return (
      <Row type="flex" gutter={[40, 40]}>
        <Col>
          <Popover
          content={this.welcomePopoverContent()}
          title={'Welcome to Growth Automation!'}
          visible={this.state.userIsOnboarding && this.state.onBoardingStep == 0}
          placement='bottom'
          >
            <Card style={{
              height:"100%", width: 300, backgroundColor: 'rgb(36, 36, 52)',
              borderColor: 'rgb(190, 190, 194)', borderRadius: '1.5vh', borderWidth: 2
            }}
            actions={ this.state.submitted ? [
              <Popover
              content={this.promoConfigPopoverContent()}
              title={'Configure promo account'}
              visible={this.state.userIsOnboarding && this.state.onBoardingStep == 6}
              placement='bottom'
              >
                <SettingOutlined onClick={this.toggleConfigure}/>
              </Popover>,
              <Popover
              content={this.editPromoPopoverContent()}
              title={'Edit promo account'}
              visible={this.state.userIsOnboarding && this.state.onBoardingStep == 7}
              placement='bottom'
              >
                <EditOutlined onClick={this.toggleEdit}/>
              </Popover>
            ] : []}
            title={'Promo Account #' + this.props.promoNumber}
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
          </Popover>
        </Col>
      </Row>
    )
  }
}

export default PromoAccount;