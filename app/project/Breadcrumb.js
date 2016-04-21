import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from '../ui/Icon';

import styles from './Breadcrumb.css';

import * as ProjectActions from './ProjectActions';
import * as ContentTypeActions from './contentType/ContentTypeActions';

const remote = require('remote');
const dialog = remote.require('dialog');

export class Breadcrumb extends Component {
  handleOpenClick(e) {
    const openProject = this.props.openProject.bind(this);
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


  handleClearProject(e) {
    this.props.clearProject();
  }


  handleClearContentType(e) {
    this.props.clearContentType();
  }


  render() {
    const {project, projectList} = this.props;

    const items = [(
      <div className={styles.item + ' ' + styles.root + ' ' + styles.link} key={0}>
        <span onClick={this.handleClearProject.bind(this)} className={styles.btn}>Projects</span>
      </div>
    )];

    function add(node, type = styles.link) {
      let cn = styles.item + ' ' + type;
      items.push(
        <div className={cn} key={items.length}>
          {node}
        </div>
      );
    }

    if (project && project.title) {
      add(
        <span onClick={this.handleClearContentType.bind(this)} className={styles.btn}>{project.title}</span>
      );

      if (project.contentType) {
        add(
          <span className={styles.btn}>{project.contentType.settings.title}</span>
        );

        if (project.content) {
          add(
            <span className={styles.btn}>{project.content.title}</span>
          );
        }
      }
    } else {
        add(
          <span onClick={this.handleOpenClick.bind(this)} className={styles.btn}>Open a Project +</span>
        );
    }

    return (
      <div className={styles.breadcrumb}>
        {items}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    projectList: state.projectList,
    project: state.project,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openProject: ProjectActions.open,
    clearProject: ProjectActions.clear,
    clearContentType: ContentTypeActions.clearContentType,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
