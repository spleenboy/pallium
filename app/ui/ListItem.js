import React, { Component, PropTypes } from 'react';
import styles from './ListItem.css';

export default class ListItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,

    icon: PropTypes.node,
    avatar: PropTypes.node,
    subtitle: PropTypes.node,

    action: PropTypes.node,
    info: PropTypes.node,
    body: PropTypes.node,
  }


  handleClick(e) {
    this.props.onClick && this.props.onClick(e);
  }


  render() {
    const cns = [
      styles.item,
    ];

    if (this.props.className) {
      cns.push(this.props.className);
    }

    const thirdLine = !!this.props.body;
    const secondLine = thirdLine || !!this.props.action || !!this.props.info || !!this.props.subtitle;

    if (thirdLine) {
      cns.push(styles.threeLines);
    } else if (secondLine) {
      cns.push(styles.twoLines);
    }

    const area = (type, children, extras = '') => {
      if (!children) {
        return null;
      }
      let cn = `${styles[type]} ${extras}`;
      return (
        <span className={cn}>{children}</span>
      );
    }

    return (
      <li className={cns.join(' ')}>
        {area('action', this.props.action)}
        <div className={styles.itemBody} onClick={this.handleClick.bind(this)}>
          {area('icon', this.props.icon, 'material-icons')}
          {area('avatar', this.props.avatar)}
          {area('title', this.props.children)}
          {area('sub-title', this.props.subtitle)}
          {area('text-body', this.props.body)}
        </div>
      </li>
    );
  }
}
