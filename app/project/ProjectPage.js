import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from './content/ContentActions';

import Container from '../ui/Container';
import Header from '../ui/Header';
import Breadcrumb from './Breadcrumb';
import Search from './SearchComponent';
import Toaster from '../toast/Toaster';
import Drawer from '../ui/Drawer';
import Main from '../ui/Main';

import SearchResultsComponent from './SearchResultsComponent';
import ProjectListComponent from './ProjectListComponent';
import ContentTypeListComponent from './content/ContentTypeListComponent';
import ContentListComponent from './content/ContentListComponent';
import ContentFormComponent from './content/ContentFormComponent';

export class ProjectPage extends Component {
  render() {
    const {
      project,
      projectList,
      query,
      results
    } = this.props;

    let drawer, main;

    if (query && query.length) {
      main = (
        <Main>
          <SearchResultsComponent
            project={project}
            query={query}
            results={results}
            onOpenContent={this.props.openContent}
          />
        </Main>
      );
    }

    if (project && project.contentType && project.contentType.content) {
      // An item is being edited
      drawer = (
        <Drawer><ContentListComponent/></Drawer>
      );
      main = main || (
        <Main><ContentFormComponent/></Main>
      );
    } else if (project && project.contentType) {
      // A content type is selected
      drawer = (
        <Drawer>
          <ContentTypeListComponent/>
        </Drawer>
      );
      main = main || (
        <Main><ContentListComponent/></Main>
      );
    } else if (project && project.contentTypes) {
      // A project is selected
      drawer = (
        <Drawer title={project.title}>
          <ProjectListComponent/>
        </Drawer>
      );
      main = main || (
        <Main>
          <ContentTypeListComponent/>
        </Main>
      );
    } else {
      drawer = (
        <Drawer />
      );
      main = (
        <Main><ProjectListComponent/></Main>
      );
    }

    return (
      <Container>
        <Header>
          <Breadcrumb/>
          <Search/>
        </Header>
        <Toaster/>
        {drawer}
        {main}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const project = state.project;
  return {
    projectList: state.projectList,
    project: project,
    query: project && project.query,
    results: project && project.queryResults,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openContent: ContentActions.openContent,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
