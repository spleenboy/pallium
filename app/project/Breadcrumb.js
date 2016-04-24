import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from '../ui/Icon';

import styles from './Breadcrumb.css';

import * as ProjectActions from './ProjectActions';
import * as ContentTypeActions from './contentType/ContentTypeActions';
import * as ContentActions from './content/ContentActions';

const remote = require('remote');
const dialog = remote.require('dialog');

export class Breadcrumb extends Component {
  handleNewContentClick(e) {
    this.props.createContent(this.props.project.contentType);
  }

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


  handleClearContent(e) {
    this.props.clearContent();
  }


  render() {
    const {project, projectList} = this.props;
    const contentType = project && project.contentType;
    const content = project && project.content;

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

      if (contentType) {
        add(
          <span className={styles.btn} onClick={this.handleClearContent.bind(this)}>{contentType.settings.plural}</span>
        );

        if (project.content) {
          add(
            <span className={styles.btn}>{project.content.title}</span>
          );
        } else {
          add(
            <span onClick={this.handleNewContentClick.bind(this)} className={styles.btn}>
              New {contentType.settings.title}
              <Icon className={styles.icon}>{contentType.settings.icon ? contentType.settings.icon : "add"}</Icon>
            </span>
          );
        }
      }
    } else {
        add(
          <span onClick={this.handleOpenClick.bind(this)} className={styles.btn}>
            Open a Project
            <Icon className={styles.icon}>add</Icon>
          </span>
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
    clearContent: ContentActions.clear,
    createContent: ContentActions.create,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
