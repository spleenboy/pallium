import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Container from '../ui/Container';
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
    const projects = this.props.projectList && this.props.projectList.map((project, i) => {
        return (
          <ListItem key={i}>
            <div className="content">
              <div className="header">{project.title}</div>
              <div className="description">{project.path}</div>
            </div>
          </ListItem>
        );
    });

    return (
      <Container>
        <List>
          {projects}
        </List>
        <Button variant="fab" onClick={this.handleOpenClick.bind(this)}>+</Button>
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
