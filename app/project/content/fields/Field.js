import React, { Component, PropTypes } from 'react';

import Fields from './index';
import Validation from './Validation';

export default class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: new Validation(props.definition.validation, props.value),
    }
  }

  static get PropTypes() {
    return {
      definition: PropTypes.object.isRequired,
      value: PropTypes.object.isRequired,
      onValueChange: PropTypes.func.isRequired,
    }
  }


  handleValueChange(definition, value) {
    const validation = new Validation(definition.validation, value);
    this.setState({validation});
    this.props.onValueChange(definition, value, validation);
  }

  render() {
    const def = this.props.definition;
    let Element = (def.type in Fields) ? Fields[def.type] : Fields['default'];

    return (
      <Element
        definition={def}
        value={this.props.value}
        validation={this.state.validation}
        onValueChange={this.handleValueChange.bind(this)}
      />
    );
  }
}
