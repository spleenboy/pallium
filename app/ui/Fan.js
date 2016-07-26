import React, { Component } from 'react';
import styles from './Fan.css';


export default class Fan extends Component {
  static propTypes = {
    style: React.PropTypes.object,
    trigger: React.PropTypes.element.isRequired,
  }


  constructor(props) {
    super(props);
    this.nodes = {};
    this.state = {
      visible: false,
    };
  }


  hide() {
    this.setState({visible: false});
  }


  toggle(e) {
    this.setState((prevState, prevProps) => {
        return {visible: !prevState.visible};
    });
  }


  render() {
    const style = this.props.style || {};
    const shown = this.state.visible ? styles.show : styles.hide;
    return (
      <div className={styles.fan}>
        <div className={styles.tray + ' ' + shown} style={style}>{this.props.children}</div>
        <div className={styles.trigger} onClick={this.toggle.bind(this)}>{this.props.trigger}</div>
      </div>
    );
  }
}
