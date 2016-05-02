import React, { Component, PropTypes } from 'react';

import styles from './ArrayField.css';
import InputField from './InputField';
import Button from '../../../ui/Button';
import Icon from '../../../ui/Icon';

export default class ArrrayField extends InputField {
  handleAdd() {
    const values = Array.isArray(this.props.value) ? this.props.value : [];
    values.push(this.refs.input.value);
    this.props.onValueChange(this.props.definition, values);
    this.refs.input.value = '';
  }


  handleRemove(index) {
    let values = Array.isArray(this.props.value) ? this.props.value : [];
    values.splice(index, 1);
    this.props.onValueChange(this.props.definition, values);
  }


  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleAdd();
    }
  }


  renderInput() {
    let badges = null;

    if (Array.isArray(this.props.value)) {
      badges = this.props.value.map((item, i) => {
        return (
          <button className={styles.badge} key={i} onClick={this.handleRemove.bind(this, i)} title="Delete">
            <Icon>delete</Icon>
            {item}
          </button>
        );
      });
    }

    return (
      <div className={styles.input}>
        <div className={styles.badges}>{badges}</div>
        <div className={styles.input}>
          <input ref="input" onKeyPress={this.handleKeyPress.bind(this)}/>
          <Button raised={true} onClick={this.handleAdd.bind(this)} title="Add"><Icon>add</Icon></Button>
        </div>
      </div>
    );
  }
}
