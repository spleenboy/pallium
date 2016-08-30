import React, { Component, PropTypes } from 'react';

import semver from 'semver';
import {shell} from 'electron';
import Modal from './Modal';
import Button from './Button';
import * as config from '../../package.json';
import styles from './VersionCheck.css';

export default class VersionCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      master: null,
    };
  }

  componentDidMount() {
    const setState = this.setState.bind(this);
    fetch(config.masterUrl)
    .then(response => {
      response.json().then(function(master) {
        console.log("Got master file", master);
        setState({master});
      });
    });
  }


  handleClose(e) {
    this.setState({master: null});
  }


  handleUpdate() {
    shell.openExternal(config.releaseUrl);
    this.setState({master: null});
  }


  render() {
    if (!this.state.master) {
      return null;
    }

    if (!semver.gt(this.state.master.version, config.version)) {
      return null;
    }

    return (
      <Modal
        open={true}
        title="Update Available"
        onClose={this.handleClose.bind(this)}>
        <div className={styles.body}>
          <p>Hey! You're using version {config.version} of Pallium. Version {this.state.master.version} is available.</p>
          <Button mode="primary" onClick={this.handleUpdate.bind(this)}>Get the new version here</Button>
        </div>
      </Modal>
    );
  }
}
