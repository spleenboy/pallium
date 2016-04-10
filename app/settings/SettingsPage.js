import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from '../ui/Container';

export class SettingsPage extends Component {
  render() {
    return (
      <Container>
        <p>Welcome to your settings page.</p>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
