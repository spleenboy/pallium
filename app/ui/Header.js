import React, { Component } from 'react';
import Icon from './Icon';
import styles from './Header.css';


export default class Container extends Component {
  render() {
    const cns = [
      styles.header,
      'mdl-layout__header',
    ];
    return (
      <header className={cns.join(' ')}>
        <div className="mdl-layout__header-row">
          <div className="mdl-layout-title">Pallium</div>
        </div>
      </header>
    );
  }
}
