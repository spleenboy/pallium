import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Container from '../ui/Container';
import Header from '../ui/Header';
import Breadcrumb from './Breadcrumb';
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
      drawer = (
        <Drawer>
          <ContentTypeListComponent/>
        </Drawer>
      );
    } else if (project && project.contentTypes) {
      // A project is selected
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
        <Header><Breadcrumb/></Header>
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
