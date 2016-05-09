import React, { Component, PropTypes } from 'react';

const remote = require('remote');
const dialog = remote.require('dialog');

import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

import styles from './FileField.css';
import InputField from './InputField';
import Button from '../../../ui/Button';
import Icon from '../../../ui/Icon';

export default class FileField extends InputField {
  filepaths() {
    const {value} = this.props;
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  }


  deleteFile(filepath) {
    const fullpath = path.join(this.props.assetDirectory, filepath);
    fs.remove(fullpath, (err) => {
      err && console.error("Error removing file", fullpath, err);
    });
  }


  addFile(filepath) {
    const filename = path.basename(filepath);
    const savepath = path.join(this.props.assetDirectory, filename);
    fs.copy(filepath, savepath, (err) => {
      err && console.error("Error copying file", filepath, "to", savepath, err);
    });
    return filename;
  }


  updateFiles(newPaths) {
    if (!newPaths) {
      return;
    }

    let value = [];

    const mappedPaths = newPaths.map(this.addFile.bind(this));
    const oldPaths = this.filepaths();
    const {multiple} = this.props.definition;

    if (!multiple) {
      oldPaths.length && oldPaths.forEach(this.deleteFile.bind(this));
      value = mappedPaths;
    } else {
      value = _.union(oldPaths, mappedPaths);
    }

    this.props.onValueChange(this.props.definition, value);
  }


  handleDelete(filepath, index, e) {
    this.deleteFile(filepath);
    const paths = this.filepaths();
    _.remove(paths, p => p === filepath);
    this.props.onValueChange(this.props.definition, paths);
  }


  handleSelect(e) {
    const {label, accept, multiple} = this.props.definition;
    const updateFiles = this.updateFiles.bind(this);
    const options = {
      title: "Select " + label
    };

    if (accept) {
      options.filters = [{name: "accept", extensions: accept}];
    }

    if (multiple) {
      options.properties = ['openFile', 'multiSelections'];
    } else {
      options.properties = ['openFile'];
    }

    dialog.showOpenDialog(options, updateFiles);
  }


  renderInput() {
    const {
      multiple,
      accept,
      directory,
    } = this.props.definition;

    const filepaths = this.filepaths();
    const actionName = (!multiple && filepaths.length) ? "Replace" : "Upload";

    const fileList = filepaths.map((fp, i) => {
      return (
        <div key={i} className={styles.file}>
          <Button mode="warning" className={styles.delete} onClick={this.handleDelete.bind(this, fp, i)}>
            <Icon name="delete"/>
            {fp}
          </Button>
        </div>
      );
    });

    return (
      <div className={styles.input}>
        <div className={styles.files}>
          {fileList}
        </div>
        <Button onClick={this.handleSelect.bind(this)}>
          {actionName} <Icon name="file_upload"/>
        </Button>
      </div>
    );
  }
}
