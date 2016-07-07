import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from '../ui/Icon';

import styles from './Breadcrumb.css';

import * as ProjectActions from './ProjectActions';
import * as ContentActions from './content/ContentActions';

const remote = require('remote');
const dialog = remote.require('dialog');

export class Breadcrumb extends Component {
  handleOpenProject() {
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


  handleNewContentClick(e) {
    this.props.createContent(this.props.project);
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
    const {
      project,
      projectList,
      contentType,
      content
    } = this.props;

    const title = [];
    const single = contentType && !contentType.settings.plural;

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
      title.push(project.title);

      if (project.contentTypes.length !== 1) {
        add(
          <span onClick={this.handleClearContentType.bind(this)} className={styles.btn}>{project.title}</span>
        );
      }

      if (contentType) {
        title.push(single ? contentType.settings.title : contentType.settings.plural);
        add(
          <span className={styles.btn} onClick={this.handleClearContent.bind(this)}>
            {single ? contentType.settings.title : contentType.settings.plural}
          </span>
        );

        if (content) {
          title.push(content.title);
          add(
            <span className={styles.btn}>{content.title}</span>
          );
        } else if (!single) {
          add(
            <span onClick={this.handleNewContentClick.bind(this)} className={styles.btn} title={`Add a new ${contentType.settings.title}`}>
              <Icon className={styles.icon} name="add"/>
            </span>
          );
        }
      }
    } else {
        title.push("Pallium");
        add(
          <span onClick={this.handleOpenProject.bind(this)} className={styles.btn} title="Open a Project">
            <Icon className={styles.icon} name="folder_open"/>
          </span>
        );
    }

    document.title = title.join(' / ');

    return (
      <div className={styles.breadcrumb}>
        {items}
      </div>
    );
  }

}

function mapStateToProps(state) {
  const project = state.project;
  const contentType = project && project.contentType;
  const content = contentType && contentType.content;
  const contentFilename = content && content.filename;
  return {
    projectList: state.projectList,
    project,
    contentType,
    content,
    contentFilename,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openProject: ProjectActions.open,
    clearProject: ProjectActions.clear,
    clearContentType: ContentActions.clearContentType,
    clearContent: ContentActions.clearContent,
    createContent: ContentActions.createContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
