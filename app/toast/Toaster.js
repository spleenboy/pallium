import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ToastActions from '../toast/ToastActions';

import styles from './Toaster.css';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

export class Toaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageIndex: 0,
      open: false,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.count === 0) {
      this.setState({open: false});
    } else if (this.props.count !== nextProps.count) {
      this.setState({open: true});
    }
  }


  handleAction(action, index, e) {
    action();
    this.props.dismissToast(index);
  }


  handleDismiss(index, e) {
    this.props.dismissToast(index);
  }


  handleClear(e) {
    this.props.clearToast();
  }


  handleToggle(e) {
    this.setState({open: !this.state.open});
  }


  render() {
    const {messages} = this.props;
    let {open, messageIndex} = this.state;

    const display = open ? styles.opened : styles.closed;
    const mode    = this.props.count > 0 ? styles.active : styles.inactive;
    const message = messages[messageIndex] || messages[0] || false;

    let notice, footer;
    if (message) {
      let actions = [];
      if (message.actions) {
        for (var label in message.actions) {
          let action = message.actions[label];
          actions.push(
            <Button key={actions.length} mode="text" onClick={this.handleAction.bind(this, action, messageIndex)}>{label}</Button>
          );
        }
      }
      actions.push(
        <Button key={actions.length} mode="text" onClick={this.handleDismiss.bind(this, messageIndex)}>
          Dismiss
        </Button>
      );
      notice = (
        <div key={messageIndex} className={`${styles.message} ${styles[message.type]}`}>
          <div className={styles.title}>{message.title}</div>
          <div className={styles.body}>{message.text}</div>
          <div className={styles.actions}>{actions}</div>
        </div>
      );
      footer = (
        <div className={styles.footer} onClick={this.handleToggle.bind(this)}>
          <div className={styles.toastTitle}>{this.props.title}</div>
          <div className={styles.pulltab}>
            <button className={styles.toggle}>
              <Icon name="arrow_downward"/>
            </button>
          </div>
        </div>
      );
    } else {
      footer = (
        <div className={styles.footer}>
          <div className={styles.toastTitle}>{this.props.title}</div>
        </div>
      );
    }

    return (
      <div className={`${styles.toaster} ${display} ${mode}`}>
        {notice}
        {footer}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.toast.messages.length,
    messages: state.toast.messages,
    title: state.toast.title,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dismissToast: ToastActions.dismiss,
    clearToast: ToastActions.clear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
