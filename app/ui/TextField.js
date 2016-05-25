import React, { Component, PropTypes } from 'react';

import defaultStyles from './TextField.css';

export default class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  static get propTypes() {
    return {
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      styles: PropTypes.object,
    }
  }


  handleFocus(e) {
    this.setState({active: true});
  }


  handleBlur(e) {
    this.setState({active: false});
  }


  handleLabelClick(e) {
    this.refs.field.focus();
    this.refs.field.select();
  }


  handleChange(e) {
    this.props.onChange(e.currentTarget.value);
  }


  render() {
    let {value, label, placeholder, styles} = this.props;

    styles = styles || defaultStyles;

    let active = this.state.active ? styles.active : styles.inactive;

    return (
      <div className={`${styles.input} ${active}`}>
        <input
          ref="field"
          className={styles.field}
          value={value}
          placeholder={placeholder ? placeholder : ''}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
        {label ?
        <div className={styles.label} onClick={this.handleLabelClick.bind(this)}>
          {label}
        </div> : ''}
      </div>
    );
  }
}
