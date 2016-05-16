import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '../ui/List';
import ListItem from '../ui/ListItem';

import styles from './SearchResultsComponent.css';

import * as ContentActions from './content/ContentActions';

export default class SearchResultsComponent extends Component {
  static get propTypes() {
    return {
      project: PropTypes.object.isRequired,
      query: PropTypes.string,
      results: PropTypes.array,
      onOpenContent: PropTypes.func.isRequired,
    }
  }

  render() {
    const {project, query, results} = this.props;

    if (!project || !query) {
      return null;
    }

    if (results.length === 0) {
      return (
        <div className={styles.noresults}>
          <p className={styles.shrug}>¯\_(ツ)_/¯</p>
          <p>No results found for "{query}"</p>
        </div>
      );
    }

    const items = results.map((result, i) => {
      let contentType = project.contentTypes.find(ct => ct.settings.handle === result.contentType);
      let icon = contentType ? contentType.icon : "unarchive";
      return (
        <div className={styles.resultWrapper} key={i}>
          <ListItem
            className={styles.result}
            icon={icon}
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
