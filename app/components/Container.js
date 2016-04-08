import React, { Component } from 'react';
import MuiContainer from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import AppBar from 'muicss/lib/react/appbar';
import Icon from './Icon';
import styles from './Container.css';


export default class Container extends Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  openProject() {

  }

  go(path) {
    this.context.router.push(path);
  }

  render() {
    return (
      <MuiContainer fluid={true} className={styles.container}>
          <AppBar className={styles.appBar}>
            <Dropdown color="primary" label={<Icon name="menu"/>}>
              <DropdownItem onClick={this.openProject.bind(this)}>Open Project</DropdownItem>
              <DropdownItem onClick={this.go.bind(this, "/counter")}>to Counter</DropdownItem>
            </Dropdown>
            <h1>Pallium</h1>
          </AppBar>
          <MuiContainer className={styles.body}>
            {this.props.children}
          </MuiContainer>
      </MuiContainer>
    );
  }
}
