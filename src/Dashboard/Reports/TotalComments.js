import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

class TotalComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalComments: props.userTotalComments
    }
  }

  render() {
    return(
      <div>
        <Card
        bodyStyle={{color: 'white'}}
        style={{borderRadius: '1.5vh', height: '100%', borderWidth: 1,
        borderColor: 'white', backgroundColor: 'rgb(36, 36, 52)',
        textAlign: 'center', width: '35vh'}}>
          <Title
          level={5}
          style={{color: 'white'}}>
            {'Total Comments Done: '+ this.props.userTotalComments}
          </Title>
        </Card>
      </div>
    )
  }
}

export default TotalComments