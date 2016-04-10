import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from '../ui/Container';
import * ProjectActions from './ProjectActions';

export class ProjectPage extends Component {
  render() {
    <Container>
      <p>Welcome to your project page.</p>
    </Container>
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
