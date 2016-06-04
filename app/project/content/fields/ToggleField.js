import React, { Component, PropTypes } from 'react';

import InputField from './InputField';
import Icon from '../../../ui/Icon';
import styles from './ToggleField.css';

export default class ToggleField extends InputField {
  onValue() {
    const {on} = this.props.definition;
    return on ? on.value : true;
  }


  offValue() {
    const {off} = this.props.definition;
    return off ? off.value : false;
  }

  isOn() {
    return this.props.value === this.onValue();
  }


  handleToggle(selected) {
    const {on, off} = this.props.definition;
    const value = this.isOn() ? this.offValue() : this.onValue();
    this.props.onValueChange(this.props.definition, value);
  }


  renderInput() {
    const {name, label, on, off} = this.props.definition;
    const value = this.props.value;

    let mode = this.isOn() ? styles.on : styles.off;
    let state = this.isOn() ? on && on.label : off && off.label;

    return (
      <div className={`${styles.toggle} ${mode}`}>
        <span className={styles.state}>{state}</span>
        <span className={styles.panel} onClick={this.handleToggle.bind(this)}>
            <span className={styles.button}></span>
        </span>
      </div>
    );
  }
}
