import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './ContentActions.js';
import styles from './ContentListComponent.css';

import List from '../../ui/List';
import ListItem from '../../ui/ListItem';
import Button from '../../ui/Button';

export class ContentListComponent extends Component {
  handleSelect(fullpath, _id, e) {
    this.props.openContent(this.props.project, fullpath, _id);
  }


  render() {
    const {contentType, contentList, content} = this.props;

    if (!contentList) {
      return null;
    }

    let items = contentList.map((c, i) => {
      let cn = c._id === content && content._id ? styles.active : "";
      let metadata = [];
      for (var key in c.metadata) {
        metadata.push(
          <div className={styles.metadata} key={metadata.length}>
            <span className={styles.term}>{key}</span>
            <span className={styles.definition}>{c.metadata[key]}</span>
          </div>
        );
      }
      return (
        <ListItem
          key={i}
          className={cn}
          avatar={c.title[0]}
          body={metadata}
          className={styles.item}
          onClick={this.handleSelect.bind(this, c.fullpath, c._id)}>
          {c.title}
        </ListItem>
      );
    });

    return (
      <div className={styles.contentList}>
        <List>{items}</List>
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentListComponent);
