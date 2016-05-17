import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '../../ui/List';
import ListItem from '../../ui/ListItem';

import styles from './SearchResultsComponent.css';

import * as ContentActions from './ContentActions';

export class SearchResultsComponent extends Component {
  handleOpenContent(result) {
    const {project} = this.props;
    this.props.clearSearch();
    this.props.selectContentType(project, result.contentType);
    this.props.openContent(project, result.fullpath, result._id);
  }


  render() {
    const {project, searching, query, results} = this.props;

    if (!searching || !query || query.length === 0) {
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
      let metadata = [];
      let metakeys = Object.keys(result.metadata || {});

      metakeys.forEach((mk, i) => {
        metadata.push(
          <div className={styles.metadata} key={i}>
            <div className={styles.label}>{mk}</div>
            <div className={styles.value}>{result.metadata[mk]}</div>
          </div>
        );
      });

      return (
        <div className={styles.resultWrapper} key={i}>
          <ListItem
            className={styles.result}
            icon={icon}
            onClick={this.handleOpenContent.bind(this, result)}
            subtitle={metadata}
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
  const search = project && project.search;
  return {
    project: project,
    query: search && search.query,
    searching: search && search.searching,
    results: search && search.results,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectContentType: ContentActions.selectContentType,
    clearSearch: ContentActions.clearSearch,
    openContent: ContentActions.openContent,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsComponent);
