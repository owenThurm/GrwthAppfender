import React from 'react';
import { Card, InputNumber, Row, Col, Typography } from 'antd';
import PhraseTags from './PhraseTags';

const { Title } = Typography;
const min = Math.min
const max = Math.max

class PostCommentFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <Card
      title='Posts Filter'
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
              Avoid posts that don't satisfy:
            </Title>
            Minimum post likes:
            <InputNumber
            min={0}
            max={min(this.props.postMaxLikes, 200)}
            bordered={false}
            value={this.props.postMinLikes}
            onChange={this.props.setPostMinLikes}/>
            <br />
            Maximum post likes:
            <InputNumber
            min={max(this.props.postMinLikes + 1, 20)}
            max={10000000}
            bordered={false}
            value={this.props.postMaxLikes}
            onChange={this.props.setPostMaxLikes}/>
            <br />
            Minimum post comments:
            <InputNumber
            min={0}
            max={min(this.props.postMaxComments, 20)}
            bordered={false}
            value={this.props.postMinComments}
            onChange={this.props.setPostMinComments}/>
            <br />
            Maximum post comments:
            <InputNumber
            min={max(this.props.postMinComments + 1, 1)}
            max={1000000}
            bordered={false}
            value={this.props.postMaxComments}
            onChange={this.props.setPostMaxComments}/>
            <br />
          </Col>
          <Col>
            <Title level={5} style={{color: 'white'}}>
              Avoid posts with these phrases in caption:
            </Title>
            <PhraseTags
            phrases={this.props.postDescriptionAvoidedPhrases}
            setPhrases={this.props.setPostAvoidedPhrases}/>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default PostCommentFilter;