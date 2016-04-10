import React, { Component } from 'react';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import AppBar from 'muicss/lib/react/appbar';
import Icon from './Icon';
import styles from './Header.css';


export default class Container extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  openProject() {

  }

  go(path) {
    this.context.router.push(path);
  }

  render() {
    return (
      <AppBar className={styles.ppBar}>
        <Dropdown color="primary" label={<Icon name="menu"/>}>
          <DropdownItem onClick={this.openProject.bind(this)}>Open Project</DropdownItem>
          <DropdownItem onClick={this.go.bind(this, "/counter")}>to Counter</DropdownItem>
        </Dropdown>
        <h1>Pallium</h1>
      </AppBar>
    );
  }
}
