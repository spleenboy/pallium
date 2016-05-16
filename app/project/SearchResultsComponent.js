import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '../ui/List';
import ListItem from '../ui/ListItem';

import styles from './SearchResultsComponent.css';

import * as ContentActions from './content/ContentActions';

export class SearchResultsComponent extends Component {
  handleOpenContent(result) {
    const {project} = this.props;
    this.props.searchContent(project, "");
    this.props.openContent(project, result.fullpath, result._id);
  }


  render() {
    const {project, query, results} = this.props;

    if (!project || !query) {
      return null;
    }

    if (!results || results.length === 0) {
      return (
        <div className={styles.noresults}>
          <p className={styles.shrug}>¯\_(ツ)_/¯</p>
          <p>No results found for "{query}"</p>
        </div>
      );
    }

    const items = results.map((result, i) => {
      let contentType = project.contentTypes.find(ct => ct.settings.handle === result.contentType);
      let icon = contentType ? contentType.settings.icon : "unarchive";
      return (
        <div className={styles.resultWrapper} key={i}>
          <ListItem
            className={styles.result}
            icon={icon}
            onClick={this.handleOpenContent.bind(this, result)}
          >
          {result.title}
          </ListItem>
        </div>
      );
    });

    return (
      <div className={styles.results}>
        <List>{items}</List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const project = state.project;
  return {
    project: project,
    query: project && project.query,
    results: project && project.queryResults,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchContent: ContentActions.searchContent,
    openContent: ContentActions.openContent,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsComponent);
