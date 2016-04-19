import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Container from '../ui/Container';
import Drawer from '../ui/Drawer';
import Main from '../ui/Main';

import ProjectListComponent from './ProjectListComponent';
import ContentTypeListComponent from './contentType/ContentTypeListComponent';

export class ProjectPage extends Component {
  render() {
    const {project, projectList} = this.props;
    let drawer, main;

    if (project && project.content) {
      // An item is being edited

    } else if (project && project.contentType) {
      // A content type is selected

    } else if (project && project.contentTypes) {
      drawer = (
        <Drawer title={project.title}>
          <ProjectListComponent/>
        </Drawer>
      );
      main = (
        <Main>
          <ContentTypeListComponent/>
        </Main>
      );
    } else {
      main = (
        <Main><ProjectListComponent/></Main>
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

export default connect(mapStateToProps)(ProjectPage);
