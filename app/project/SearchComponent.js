import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../ui/Button';
import Icon from '../ui/Icon';

import styles from './SearchComponent.css';

import * as ContentActions from './content/ContentActions';

export class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
    };
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state.searching && !prevState.searching) {
      this.refs.input.focus();
    }
  }


  handleStartSearch() {
    this.setState({searching: true});
  }


  handleQueryChange(e) {
    this.props.searchContent(this.props.project, this.refs.input.value);
  }


  handleQueryBlur(e) {
    if (!this.props.query) {
      this.setState({searching: false});
    }
  }


  handleCancelSearch() {
    this.props.searchContent("");
    this.setState({searching: false});
  }



  render() {
    const {project, query} = this.props;

    if (!project) {
      return null;
    }

    const searching = this.state.searching ? styles.searching : "";
    return (
      <div className={`${styles.search} ${searching}`}>
        <div className={styles.input}>
          <Icon className={styles.icon} name="search"/>
          <input
            ref="input"
            value={query}
            onChange={this.handleQueryChange.bind(this)}
            onBlur={this.handleQueryBlur.bind(this)}
          />
        </div>
        {this.state.searching
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
  return {
    project: project,
    query: project && project.query,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchContent: ContentActions.searchContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
