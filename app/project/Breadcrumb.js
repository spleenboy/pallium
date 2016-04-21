import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Breadcrumb.css';

import * as ProjectActions from './ProjectActions';
import * as ContentTypeActions from './contentType/ContentTypeActions';

export class Breadcrumb extends Component {
  handleClearContentType(e) {
    this.props.clearContentType();
  }


  render() {
    const {project, projectList} = this.props;
    const items = [(
      <li key={0}>
        <span className={styles.root}>Projects</span>
      </li>
    )];

    if (project && project.title) {
      items.push((
        <li key={items.length}>
          <span onClick={this.handleClearContentType.bind(this)} className={styles.link}>{project.title}</span>
        </li>
      ));

      if (project.contentType) {
        items.push((
          <li key={items.length}>
            <span className={styles.link}>{project.contentType.settings.title}</span>
          </li>
        ));

        if (project.content) {
          items.push((
            <li key={items.length}>
              <span className={styles.link}>{project.content.title}</span>
            </li>
          ));
        }
      }
    }

    return (
      <ul className={styles.breadcrumb}>
        {items}
      </ul>
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
    clearContentType: ContentTypeActions.clearContentType,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
