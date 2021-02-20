import React from 'react';
import {  Tag, Input, Tooltip  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.targetAccountsTags || [],
      inputVisible: false,
      inputValue: '',
      editInputIndex: -1,
      editInputValue: '',
      isEditing: this.props.isEditing,
      canAdd: !props.targetAccountsTags || props.targetAccountsTags.length <= 8
    };
  }

  componentDidUpdate(prevProps) {if(prevProps != this.props) {
      this.setState({
        isEditing: this.props.isEditing,
        canAdd: !this.props.targetAccountsTags || this.props.targetAccountsTags.length < 8,
        tags: this.props.targetAccountsTags || []
      })
    }
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.props.setTargetAccounts(tags)
    this.setState({ tags, canAdd: tags.length < 8 });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.props.setTargetAccounts(tags)
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
      canAdd: tags.length < 8
    });
  };

  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  saveEditInputRef = input => {
    this.editInput = input;
  };

  render() {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
    return (
      <>
        {tags.map((tag, index) => {

          const isLongTag = tag.length > 10;

          const tagElem = (
            <Tag
              style={{
                background: 'rgb(36, 36, 52)',
                borderColor: 'white',
                color: 'white',
                borderRadius: '1.1vh',
                marginBottom: 5,
              }}
              className="edit-tag"
              key={tag}
              closable={this.state.isEditing}
              onClose={() => this.handleClose(tag)}
            >
              <span style={{fontSize: 14}}>
                {isLongTag ? `${tag.slice(0, 10)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
          style={{
            background: 'rgb(36, 36, 52)',
            borderColor: 'white',
            color: 'white',
            borderRadius: '1.1vh'
          }}
          visible={this.state.canAdd && this.state.isEditing} className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Target
          </Tag>
        )}
      </>
    );
  }
}

export default EditableTagGroup;