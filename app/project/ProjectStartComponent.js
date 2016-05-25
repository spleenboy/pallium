import React, { Component, PropTypes } from 'react';

import Icon from '../ui/Icon';
import Button from '../ui/Button';
import TextField from '../ui/TextField';
import Modal from '../ui/Modal';

import styles from './ProjectStartComponent.css';

const remote = require('remote');
const dialog = remote.require('dialog');

export default class ProjectStartComponent extends Component {
  static get propTypes() {
    return {
      active: PropTypes.bool,
      onCancel: PropTypes.func.isRequired,
      onOpen: PropTypes.func.isRequired,
      onClone: PropTypes.func.isRequired,
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      repo: '',
      branch: 'master',
    };
  }


  handleCancel(e) {
    this.props.onCancel();
  }


  handleOpenClick(e) {
    const openProject = this.props.onOpen.bind(this);
    dialog.showOpenDialog({
      title: "Select a project file",
      filters: [{name: "JSON", extensions: ['json']}],
      properties: ['openFile'],
    },
    (filenames) => {
      if (filenames) {
        openProject(filenames[0]);
      }
    }
    );
  }


  render() {
    return (
      <Modal
        title="Start a Project"
        open={this.props.active}
        onClose={this.handleCancel.bind(this)}
      >
        <div className={styles.content}>
          <div className={styles.local}>
            <h2>Load a local project</h2>
            <Button onClick={this.handleOpenClick.bind(this)}>
              <Icon name="folder_open"/> Open a Local Project File
            </Button>
          </div>
          <div className={styles.remote}>
            <h2>Download a remote git project</h2>
            <TextField
              label="Repository URL"
              value={this.state.repo}
              placeholder="https://github.com/spleenboy/pallium"
            />
            <TextField
              label="Branch"
              value={this.state.branch}
            />
          </div>
        </div>
      </Modal>
    );
  }
}
