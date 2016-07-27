import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

const {dialog} = require('electron').remote;

import * as Actions from './ContentActions.js';
import styles from './ContentListComponent.css';

import Button from '../../ui/Button';
import Icon from '../../ui/Icon';
import Shrug from '../../ui/Shrug';
import List from '../../ui/List';
import ListItem from '../../ui/ListItem';

export class ContentListComponent extends Component {

  handleImport() {
    const {project, contentType} = this.props;
    const title = contentType.settings.plural || contentType.settings.title;
    const importContent = this.props.importContent.bind(this);

    dialog.showOpenDialog({
      title: "Import " + title,
      filters: [{name: title, extensions: [contentType.storage.extension]}],
      properties: ['openFile', 'multiSelections'],
    },
    (filenames) => {
      if (filenames) {
        filenames.forEach(filename => {
            importContent(project, filename);
        });
      }
    }
    );
  }

  handleSelect(fullpath, _id, e) {
    this.props.openContent(this.props.project, fullpath, _id);
  }


  render() {
    const {contentType, contentList, content} = this.props;
    const contentTypeTitle = contentType.settings.plural || contentType.settings.title;

    let groupBy = null;
    let sortedList = contentList;
    let importButton = (
      <div className={styles.import}>
        <Button mode="accent" onClick={this.handleImport.bind(this)}>
          <Icon name="library_add"/> Import {contentList && contentList.length ? "More " : ""}{contentTypeTitle}
        </Button>
      </div>
    );

    if (!sortedList) {
      return (
        <div className={styles.contentList}>
          {importButton}
        </div>
      );
    }

    if (contentType.settings.orderBy) {
      sortedList = _.orderBy(
        sortedList,
        contentType.settings.orderBy,
        contentType.settings.orderDirection
      );
    }

    if (contentType.settings.groupBy) {
      groupBy = contentType.settings.groupBy;
      sortedList = _.orderBy(
        sortedList,
        [contentType.settings.groupBy],
        [contentType.settings.groupDirection]
      );
    }

    let lastHeading = null;
    let items = sortedList.map((c, i) => {
      let cn = (content && c._id === content._id) ? styles.active : "";
      let metadata = [];
      for (var key in c.metadata) {
        metadata.push(
          <div className={styles.metadata} key={metadata.length}>
            <span className={styles.term}>{key}</span>
            <span className={styles.definition}>{c.metadata[key]}</span>
          </div>
        );
      }

      let header = null;
      if (groupBy) {
        let heading = _.get(c, groupBy);
        if (lastHeading !== heading) {
          header = (
            <div className={styles.header}>{heading}</div>
          );
        }
        lastHeading = heading;
      }

      return (
        <div key={i} className={styles.itemWrapper}>
          {header}
          <ListItem
            avatar={c.title[0]}
            body={metadata}
            className={`${styles.item} ${cn}`}
            onClick={this.handleSelect.bind(this, c.fullpath, c._id)}>
            {c.title ? c.title : c._id}
          </ListItem>
        </div>
      );
    });

    return (
      <div className={styles.contentList}>
        {items.length
          ? <List>{items}</List>
          : <div className={styles.empty}>
              <Shrug/>
              <p>No {contentTypeTitle} Found</p>
            </div>
        }
        {importButton}
      </div>
    );
  }

}

function mapStateToProps(state) {
  const project = state.project;
  const contentType = project && project.contentType;
  const content = contentType && contentType.content;
  const contentList = contentType && contentType.contentList;
  return {
    project,
    contentType,
    content,
    contentList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openContent: Actions.openContent,
    importContent: Actions.importContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentListComponent);
