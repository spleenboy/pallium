import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from '../ui/Container';
import * as ProjectActions from './ProjectActions';

export class ProjectPage extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  go(path) {
    this.context.router.push(path);
  }

  render() {
    return (
      <Container>
        <p>Welcome to your project page.</p>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...ProjectActions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
