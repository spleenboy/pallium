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
  }

  handleToggle(e) {
    this.setState({open: !this.state.open});
  }

  render() {
    const display = this.state.open ? styles.opened : styles.closed; 
    const thinking = this.props.thinking ? styles.thinking : styles.silent;

    return (
      <div className={`${styles.toaster} ${display}`}>
        <div className={styles.messages}>
            <p>Hello</p>
            <em className="material-icons">arrow downward</em>
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
