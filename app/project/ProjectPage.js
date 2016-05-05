import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Container from '../ui/Container';
import Header from '../ui/Header';
import Breadcrumb from './Breadcrumb';
import Toaster from '../toast/Toaster';
import Drawer from '../ui/Drawer';
import Main from '../ui/Main';

import ProjectListComponent from './ProjectListComponent';
import ContentTypeListComponent from './content/ContentTypeListComponent';
import ContentListComponent from './content/ContentListComponent';
import ContentFormComponent from './content/ContentFormComponent';

import * as ToastActions from '../toast/ToastActions';

export class ProjectPage extends Component {
  render() {
    const {project, projectList} = this.props;
    let drawer, main;

    if (project && project.contentType && project.contentType.content) {
      // An item is being edited
      drawer = (
        <Drawer><ContentListComponent/></Drawer>
      );
      main = (
        <Main><ContentFormComponent/></Main>
      );
    } else if (project && project.contentType) {
      // A content type is selected
      drawer = (
        <Drawer>
          <ContentTypeListComponent/>
        </Drawer>
      );
      main = (
        <Main><ContentListComponent/></Main>
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
      drawer = (
        <Drawer />
      );
    }

    return (
      <Container>
        <Header><Breadcrumb/></Header>
        <Toaster
          thinking={this.props.thinking}
          messages={this.props.messages}
          onDismiss={this.props.dismissToast}
        />
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
    thinking: state.toast.thinking,
    messages: state.toast.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dismissToast: ToastActions.dismiss,
    clearToast: ToastActions.clear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
