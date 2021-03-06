import React, { useState } from 'react';
import {Form, Input, Button, Spin } from 'antd';
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
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = values => {
    setLoading(true);
    if(values.names == null) return
    console.log('Received values of form:', values);
    let customCommentsText = values.names;
    //axios post to add list of comment values
    axios.post('https://owenthurm.com/api/user/customcomments', {
      'user_username': props.userUsername,
      'new_custom_comments': customCommentsText,
    }).then(response => {
      console.log(response);
      setLoading(false);
      if(response.data.message != "Comments are not unique") {
        props.updateCommentList()
        form.resetFields();
      } else {
        form.setFields([
          {
            name: 'button',
            errors: ['Custom comments must be unique!'],
          },
       ]);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const uniqueValidator = (rule, value) => {
    value = value ? value.replaceAll(" ", "").toLowerCase() : ""
    let newComments = []
    form.getFieldsValue().names.forEach(element => {
      if(element) newComments.push(element.replaceAll(" ", "").toLowerCase())
    });
    let existingComments = []
    props.customComments.forEach(customComment => {
      existingComments.push(customComment.replaceAll(" ", "").toLowerCase())
    })
    let valueOccurences = 0
    for(let i=0; i<newComments.length; i++) {
      if(value == newComments[i] && valueOccurences == 0) valueOccurences++;
      else if(value == newComments[i]) return Promise.reject();
    }
    for(let i=0; i<existingComments.length; i++) {
      if(value == existingComments[i]) {
        return Promise.reject()
      }
    }
    return Promise.resolve()
  }

  return (
    <Form form={form} name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
      {loading ? (
      <div style={{position: 'absolute', top: '50vh', left: 0, right: 0}}>
        <Spin style={{position: 'absolute', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0}}
        size='large'/>
      </div>
      ) : ""}
      <Form.List
        name="names">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? <label style={{ color: "white", fontSize: 18 }}>Comments</label> : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input comment (<100 characters)",
                      max: 100,
                    },
                    {
                      validator: uniqueValidator,
                      message: "Comments must be unique!"
                    }
                  ]}
                  noStyle
                >
                  <Input placeholder="Dope style! Dm us when you're free!" style={{ width: '60%', borderRadius: '1.2vh' }} />
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
                style={{ width: '60%', overflow: 'hidden' }}
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