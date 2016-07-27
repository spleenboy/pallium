import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const {dialog, shell} = require('electron').remote;

import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

import * as Actions from '../../../toast/ToastActions.js';
import Content from '../Content';

import styles from './FileField.css';
import InputField from './InputField';
import Button from '../../../ui/Button';
import Icon from '../../../ui/Icon';
import FilePreview from '../../../ui/FilePreview';

export class FileField extends InputField {
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


  getContent() {
    const {project, contentValues, contentId, definition} = this.props;
    return new Content(project, contentValues, contentId);
  }


  deleteFile(shortpath) {
    const content = this.getContent();
    const rmpath = content.expandAssetShortPath(this.props.definition, shortpath);
    shell.moveItemToTrash(rmpath);
  }


  addFile(fullpath) {
    const content = this.getContent();
    const shortpath = content.calculateAssetShortPath(this.props.definition, fullpath);
    const savepath = content.assetShortPathToFullPath(shortpath);

    fs.copy(fullpath, savepath, err => {
      if (!err) return;
      this.props.popError("Copy Error", `The file ${fullpath} could not copied to ${savepath}`, err);
    });

    return shortpath;
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
      value = mappedPaths.length > 0 ? mappedPaths[0] : null;
    } else {
      value = _.union(oldPaths, mappedPaths);
    }

    this.props.onValueChange(this.props.definition, value);
  }


  handleDelete(shortpath, index, e) {
    this.deleteFile(shortpath);
    let paths = this.filepaths();
    _.remove(paths, p => p === shortpath);

    if (!this.props.definition.multiple) {
        paths = paths.length > 0 ? paths[0] : null;
    }

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
    const definition = this.props.definition;
    const {
      multiple,
      accept,
      directory,
    } = definition;

    const content = this.getContent();
    const filepaths = this.filepaths();
    const actionName = (!multiple && filepaths.length) ? "Replace" : "Upload";

    const fileList = filepaths.map((shortpath, i) => {
      const fullpath = content.expandAssetShortPath(definition, shortpath);

      return (
        <div key={i} className={styles.file}>
          <FilePreview src={fullpath}/>
          <Button mode="warning" className={styles.delete} onClick={this.handleDelete.bind(this, shortpath, i)}>
            <Icon name="delete"/>
            {shortpath}
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

function mapStateToProps(state) {
  const project = state.project;
  const contentType = project.contentType;
  const content = contentType.content;
  return {
    project: project,
    contentType: contentType,
    contentValues: content.values,
    contentId: content._id,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    popError: Actions.error,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileField);
