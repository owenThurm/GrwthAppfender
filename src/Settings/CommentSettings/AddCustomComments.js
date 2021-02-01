import React from 'react';
import {Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const AddCustomComments = props => {
    const onFinish = values => {
      console.log('Received values of form:', values);
      let customCommentsText = values.names;
      //axios post to add list of comment values
      axios.post('https://owenthurm.com/api/user/customcomments', {
        'user_username': props.userUsername,
        'new_custom_comments': customCommentsText
      }).then(response => {
        console.log(response);
        props.addToCommentList(customCommentsText)
      }).catch(err => {
        console.log(err);
      });
    };

    return (
      <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
        <Form.List
          name="names">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? <label style={{ color: "white", fontSize: 18 }}>Comments:</label> : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item

                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input comment (<100 characters)",
                        max: 100
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Dope style! Dm us when you're free!" style={{ width: '60%', "borderRadius":"1.2vh" }} />
                  </Form.Item>
                  {(
                    <MinusCircleOutlined style={{"margin": 10,color:"white"}}
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add Custom Comment
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

export default AddCustomComments;