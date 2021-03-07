import React from 'react';
import { Card, Row, InputNumber, Col, Typography } from 'antd';
import PhraseTags from './PhraseTags';

const { Title } = Typography;
const min = Math.min
const max = Math.max

class AccountCommentFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountMaxFollowers: props.accountMaxFollowers,
      accountMinFollowers: props.accountMinFollowers,
      accountMaxFollowing: props.accountMaxFollowing,
      accountMinFollowing: props.accountMinFollowing,
      accountDescriptionAvoidedPhrases: props.accountBioAvoidedPhrases,
    }
  }

  render() {
    return(
      <Card
      title='Accounts Filter'
      style={{
        'borderRadius': '1.5vh',
        'color': 'white',
        'margin': 15,
        'borderWidth': 2,
        'borderColor': 'rgb(38, 41, 56)',
        'backgroundColor': 'rgb(36, 36, 52)',
      }}>
        <Row>
          <Col style={{marginRight: 50}}>
            <Title level={5} style={{color: 'white'}}>
              Avoid accounts that don't satisfy:
            </Title>
            Minumim account followers:
            <InputNumber
            min={0}
            max={min(this.props.accountMaxFollowers, 1000)}
            bordered={false}
            value={this.props.accountMinFollowers}
            onChange={this.props.setAccountMinFollowers}/>
            <br />
            Maximum account followers:
            <InputNumber
            min={max(this.props.accountMinFollowers + 1, 100)}
            max={10000000}
            bordered={false}
            value={this.props.accountMaxFollowers}
            onChange={this.props.setAccountMaxFollowers}/>
            <br />
            Minimum account following:
            <InputNumber
            min={0}
            max={min(this.props.accountMaxFollowing, 1000)}
            bordered={false}
            value={this.props.accountMinFollowing}
            onChange={this.props.setAccountMinFollowing}/>
            <br />
            Maximum account following:
            <InputNumber
            min={max(this.props.accountMinFollowing + 1, 100)}
            max={10000000}
            bordered={false}
            value={this.props.accountMaxFollowing}
            onChange={this.props.setAccountMaxFollowing}/>
          </Col>
          <Col>
            <Title level={5} style={{color: 'white'}}>
              Avoid accounts with these phrases in bio:
            </Title>
            <PhraseTags
            phrases={this.props.accountBioAvoidedPhrases}
            setPhrases={this.props.setAccountBioAvoidedPhrases}/>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default AccountCommentFilter;