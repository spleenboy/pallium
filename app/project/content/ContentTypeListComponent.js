import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './ContentActions.js';
import styles from './ContentTypeListComponent.css';

import List from '../../ui/List';
import ListItem from '../../ui/ListItem';

export class ContentTypeListComponent extends Component {
  componentDidMount() {
    this.autoSelect();
  }


  componentDidUpdate(prevProps, nextState) {
    this.autoSelect(prevProps);
  }


  autoSelect(prevProps = false) {
    const {project} = this.props;
    const contentTypes = project.contentTypes;

    if (!contentTypes || contentTypes.length !== 1 || project.contentType) {
      return;
    }

    this.props.selectContentType(project, contentTypes[0].settings.handle);
  }


  handleSelect(contentType, e) {
    this.props.selectContentType(this.props.project, contentType.settings.handle);
  }


  render() {
    const {project} = this.props;

    if (!project || !project.contentTypes) {
      return null;
    }

    let contentTypes = project.contentTypes.map((ct, i) => {
      let cn = project.contentType && project.contentType.settings.handle === ct.settings.handle ? styles.active : "";
      return (
        <ListItem
          key={i}
          className={cn}
          onClick={this.handleSelect.bind(this, ct)}
          icon={ct.settings.icon ? ct.settings.icon : "view list"}
        >
          {ct.settings.plural ? ct.settings.plural : ct.settings.title}
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
    selectContentType: Actions.selectContentType
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentTypeListComponent);
