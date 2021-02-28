import React from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class PhraseTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.phrases,
      inputVisible: false,
      inputValue: '',
      editInputIndex: -1,
      editInputValue: '',
      canAdd: props.phrases.length <= 12
    };
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
    this.props.setPhrases(tags)
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
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    this.props.setPhrases(tags)
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
      <div style={{width: 335}}>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

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
              closable={true}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                    this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                      this.editInput.focus();
                    });
                    e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
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
          className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Avoided Phrase
          </Tag>
        )}
      </div>
    );
  }
}

export default PhraseTags;