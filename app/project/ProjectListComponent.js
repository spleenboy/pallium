import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './ProjectListComponent.css';
import List from '../ui/List';
import ListItem from '../ui/ListItem';
import Button from '../ui/Button';

import * as ProjectActions from './ProjectActions';
import * as ProjectListActions from './ProjectListActions';

const remote = require('remote');
const dialog = remote.require('dialog');

export class ProjectListComponent extends Component {
  componentDidMount(props) {
    this.props.loadProjects();
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

  render() {
    const {project, projectList} = this.props;

    let links = projectList && projectList.map((project, i) => {
      return (
        <ListItem key={i} subtitle={project.description} icon={project.icon ? project.icon : "assignment"}>
          {project.title}
        </ListItem>
      );
    });

    return (
      <div className="styles.projectList">
          <Button onClick={this.handleOpenClick.bind(this)}>Open Project</Button>
          <List>{links}</List>
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
    loadProjects: ProjectListActions.load,
    openProject: ProjectActions.open,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListComponent);
