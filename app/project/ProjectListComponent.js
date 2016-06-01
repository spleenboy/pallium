import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './ProjectListComponent.css';
import List from '../ui/List';
import ListItem from '../ui/ListItem';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

import * as ProjectActions from './ProjectActions';
import * as ProjectListActions from './ProjectListActions';

export class ProjectListComponent extends Component {
  handleSelectClick(path, e) {
    this.props.openProject(path);
  }


  handleRemoveClick(project, path, e) {
    this.props.removeProject(project, path);
  }


  render() {
    const {project, projectList} = this.props;

    let links = projectList && projectList.map((p, i) => {
      let cn = project.title === p.title ? styles.active : "";
      const rmBtn = this.props.mode === 'main' ? (
        <Button className={styles.removeButton} onClick={this.handleRemoveClick.bind(this, p, p.path)}>
          <Icon name="delete"/>
        </Button>
      ) : null;
      return (
        <ListItem
          key={i}
          onClick={this.handleSelectClick.bind(this, p.path)}
          className={cn}
          subtitle={p.path}
          body={p.description}
          icon={p.icon ? p.icon : "assignment"}
          action={rmBtn}
        >
          {p.title}
          {p.git ? <Icon className={styles.linked} name="autorenew"/> : ""}
        </ListItem>
      );
    });

    return (
      <div className={styles.projectList}>
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
    openProject: ProjectActions.open,
    removeProject: ProjectListActions.remove,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListComponent);
