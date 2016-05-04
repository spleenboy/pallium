import React, { Component, PropTypes } from 'react';
import styles from './Toaster.css';
import Icon from '../ui/Icon';

export default class Toaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static propTypes = {
    thinking: PropTypes.bool,
    messages: PropTypes.array,
    onDismiss: PropTypes.func.isRequired,
  }

  handleDismiss(index, e) {
    this.props.onDismiss(index);
  }

  handleToggle(e) {
    this.setState({open: !this.state.open});
  }

  render() {
    const display = this.state.open ? styles.opened : styles.closed; 
    const thinking = this.props.thinking ? styles.thinking : styles.silent;

    const messages = this.props.messages.map((m, i) => {
      return (
        <div key={i} className={`${styles.message} ${styles[m.type]}`}>
          <div className={styles.title}>{m.title}</div>
          <div className={styles.body}>{m.text}</div>
          <div className={styles.actions}>
            <button onclick={this.handleDismiss.bind(this, i)} className={styles.dismiss}>
                <Icon name="delete_swap"/>
            </button>
          </div>
        </div>
      );
    });

    if (!this.props.messages.length) {
      messages.push(
        <div key={0} className={styles.message}>
          <div className={styles.title}></div>
          <div className={styles.body}>Nothing to see here!</div>
        </div>
      );
    }

    return (
      <div className={`${styles.toaster} ${display} ${thinking}`}>
        <div className={styles.messages}>
          {messages}
        </div>
        <div className={styles.pulltab}>
          <button onClick={this.handleToggle.bind(this)} className={styles.toggle}>
              <Icon name="arrow_downward"/>
          </button>
        </div>
      </div>
    );
  }
}
