import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './ContentTypeListComponent.css';

import List from '../../ui/List';
import ListItem from '../../ui/ListItem';
import Button from '../../ui/Button';

export class ContentTypeListComponent extends Component {
  render() {
    const {project} = this.props;

    if (!project || !project.contentTypes) {
      return null;
    }

    let contentTypes = project.contentTypes.map((ct, i) => {
      return (
        <ListItem key={i} icon={ct.settings.icon ? ct.settings.icon : "view list"}>
          {ct.settings.title}
        </ListItem>
      );
    });

    return (
      <div className={styles.contentTypeList}>
        <List>{contentTypes}</List>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    project: state.project,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentTypeListComponent);
