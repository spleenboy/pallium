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
      'mdl-list__item',
    ];

    if (this.props.className) {
      cns.push(this.props.className);
    }

    const thirdLine = !!this.props.body;
    const secondLine = thirdLine || !!this.props.action || !!this.props.info || !!this.props.subtitle;

    if (thirdLine) {
      cns.push('mdl-list__item--three-line');
    } else if (secondLine) {
      cns.push('mdl-list__item--two-line');
    }

    const area = (type, children, extras = '') => {
      if (!children) {
        return null;
      }
      let cn = `mdl-list__item-${type} ${styles[type]} ${extras}`;
      return (
        <span className={cn}>{children}</span>
      );
    }

    let secondary = null;
    if (secondLine) {
      secondary = (
        <span className="mdl-list__item-secondary-content">
          {area('secondary-action', this.props.action)}
          {area('secondary-info', this.props.info)}
        </span>
      );
    }

    return (
      <li className={cns.join(' ')} onClick={this.handleClick.bind(this)}>
        <span className="mdl-list__item-primary-content">
          {area('icon', this.props.icon, 'material-icons')}
          {area('avatar', this.props.avatar)}
          {this.props.children}
          {area('sub-title', this.props.subtitle)}
          {area('text-body', this.props.body)}
        </span>
        {secondary}
      </li>
    );
  }
}
