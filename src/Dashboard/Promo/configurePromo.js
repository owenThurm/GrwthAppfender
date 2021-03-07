import React from 'react';
import { useState } from 'react';
import { Typography, Row, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

export const ConfigurePromo = ({ promoUsername, promoUsingLikes, promoUsingCommentFilter, requeryUser }) => {

  const updateUsingLikes = usingLikes => {
    axios.put('https://owenthurm.com/api/promo/liking', {
      'promo_username': promoUsername,
      'is_liking': usingLikes,
    }).then(() => {
      requeryUser()
    }).catch(err => {
      console.log(err);
    });
  }

  const updateUsingCommentFilter = usingCommentFilter => {
    axios.put('https://owenthurm.com/api/promo/commentfilter', {
      'promo_username': promoUsername,
      'using_comment_filter': usingCommentFilter,
    }).then((response) => {
      console.log(response)
      requeryUser()
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
      <Row>
        <Title style={{fontSize: 14, color: 'white'}}>
          Liking Photos:
        </Title>
        <Switch
        style={{position: 'absolute', right: 15}}
        onChange={updateUsingLikes}
        checked={promoUsingLikes}
        checkedChildren={
          <div>
            <CheckOutlined/> (Recommended)
          </div>}
        unCheckedChildren={
          <div>
            <CloseOutlined/> (Discouraged)
          </div>}/>
      </Row>
      <Row style={{marginTop: 5}}>
        <Title style={{fontSize: 14, color: 'white'}}>
          Comment Filtering:
        </Title>
        <Switch
        style={{position: 'absolute', right: 15}}
        onChange={updateUsingCommentFilter}
        checked={promoUsingCommentFilter}
        checkedChildren={
          <div>
            <CheckOutlined/> (filtering)
          </div>}
        unCheckedChildren={
          <div>
            <CloseOutlined/> (unfiltered)
          </div>}/>
      </Row>



    </>
  )

}