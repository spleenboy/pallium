import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Shortcuts from '../util/Shortcuts';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

import styles from './SearchComponent.css';

import * as ContentActions from './content/ContentActions';

export class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.shortcuts = new Shortcuts();
    this.shortcuts.register('meta /', this.handleStartSearch.bind(this));
  }


  componentDidMount() {
    this.shortcuts.start();
  }


  componentWillUnmount() {
    this.shortcuts.stop();
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.searching && !prevProps.searching) {
      ReactDOM.findDOMNode(this.input).focus();
    }
  }


  handleStartSearch() {
    this.props.searchContent(this.props.project, this.props.query);
  }


  handleQueryChange(e) {
    this.props.searchContent(this.props.project, e.target.value);
  }


  handleQueryBlur(e) {
    if (!this.props.query || this.props.query.length === 0) {
      this.props.clearSearch();
    }
  }


  handleCancelSearch() {
    this.props.clearSearch();
  }



  render() {
    const {project, query, searching} = this.props;

    if (!project) {
      return null;
    }

    const visible = searching ? styles.searching : "";
    return (
      <div className={`${styles.search} ${visible}`}>
        <div className={styles.input}>
          <Icon className={styles.icon} name="search"/>
          <input
            type="text"
            ref={input => this.input = input}
            value={query}
            onChange={this.handleQueryChange.bind(this)}
            onBlur={this.handleQueryBlur.bind(this)}
          />
        </div>
        {searching
          ? <Button className={styles.button} mode="text" onClick={this.handleCancelSearch.bind(this)}>
            <Icon name="close"/>
          </Button>
          : <Button className={styles.button} mode="text" onClick={this.handleStartSearch.bind(this)}>
            <Icon name="search"/>
          </Button>
        }
      </div>
    );
  }

}

function mapStateToProps(state) {
  const project = state.project;
  const search = project && project.search;
  return {
    project: project,
    searching: search && search.searching,
    query: search && search.query,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchContent: ContentActions.searchContent,
    clearSearch: ContentActions.clearSearch,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
