import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Container from '../ui/Container';
import Drawer from '../ui/Drawer';
import DrawerItem from '../ui/DrawerItem';
import Main from '../ui/Main';

import List from '../ui/List';
import ListItem from '../ui/ListItem';
import Button from '../ui/Button';

import * as ProjectActions from './ProjectActions';
import * as ProjectListActions from './ProjectListActions';

const remote = require('remote');
const dialog = remote.require('dialog');

export class ProjectPage extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentDidMount(props) {
    this.props.loadProjects();
  }

  go(path) {
    this.context.router.push(path);
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
    let drawer, main;

    if (project && project.content) {
      // An item is being edited

    } else if (project && project.contentType) {
      // A content type is selected

    } else if (project && project.contentTypes) {
      // A project is selected
      let navItems = projectList && projectList.map((project, i) => {
        return (
          <DrawerItem key={i}>{project.title}</DrawerItem>
        );
      });

      let contentTypes = project.contentTypes.map((ct, i) => {
        return (
          <ListItem key={i}>{ct.title}</ListItem>
        );
      });

      drawer = (
        <Drawer>{navItems}</Drawer>
      );
      main = (
        <Main>
          <List>{contentTypes}</List>
        </Main>
      );
    } else {
      // Full screen project list
      let links = projectList && projectList.map((project, i) => {
          return (
            <ListItem key={i} subtitle={project.path} icon="assignment">
              {project.title}
            </ListItem>
          );
      });
      main = (
        <Main>
          <List>{links}</List>
          <Button fab={true} onClick={this.handleOpenClick.bind(this)}>+</Button>
        </Main>
      );
    }

    return (
      <Container>
        {drawer}
        {main}
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
