import React, { Component, PropTypes } from 'react';

import styles from './Modal.css';
import Button from './Button';
import Icon from './Icon';

export default class Modal extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string,
      hideHeader: PropTypes.bool,
      hideFooter: PropTypes.bool,
      footer: PropTypes.node,
      open: PropTypes.bool,
      onClose: PropTypes.func.isRequired,
    }
  }


  handleClose(e) {
    this.props.onClose && this.props.onClose();
  }


  render() {
    let header, footer;

    if (!this.props.hideHeader) {
      header = (
        <div className={styles.header}>
          <Button className={styles.close} onClick={this.handleClose.bind(this)}>
            <Icon name="close"/>
          </Button>
          <div className={styles.title}>{this.props.title}</div>
        </div>
      );
    }

    if (!this.props.hideFooter) {
      footer = (
        <div className={styles.footer}>
          {this.props.footer}
        </div>
      );
    }

    const display = this.props.open ? styles.shown : styles.hidden;
    return (
      <div className={`${styles.modal} ${display}`}>
        {header}
        <div className={styles.main}>
          {this.props.children}
        </div>
        {footer}
      </div>
    );
  }
}
