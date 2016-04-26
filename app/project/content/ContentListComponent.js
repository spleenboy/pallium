import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './ContentActions.js';
import styles from './ContentListComponent.css';

import List from '../../ui/List';
import ListItem from '../../ui/ListItem';

export class ContentListComponent extends Component {
  handleSelect(path, e) {
    this.props.openContent(this.props.contentType, path);
  }


  render() {
    const {contentType, content} = this.props;

    if (!content || !contentType) {
      return null;
    }

    let items = contentType.contentList.map((c, i) => {
      let cn = c.id === content.id ? styles.active : "";
      return (
        <ListItem
          key={i}
          className={cn}
          onClick={this.handleSelect.bind(this, c.path)}
          icon={c.settings.icon ? ct.settings.icon : "view list"}
        >
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
  return {
    contentType: state.project.contentType,
    content: state.project.contentType.content,
    contentList: state.project.contentType.contentList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openContent: Actions.open,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentListComponent);
