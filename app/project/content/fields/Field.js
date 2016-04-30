import React, { Component, PropTypes } from 'react';

import Fields from './index';

export default class Field extends Component {
  static get PropTypes() {
    return {
      definition: PropTypes.object.isRequired,
      value: PropTypes.object.isRequired,
      onValueChange: PropTypes.func.isRequired,
    }
  }


  handleValueChange(definition, value, e) {
    this.props.onValueChange(definition, value, e);
  }

  render() {
    const def = this.props.definition;
    let Element = (def.type in Fields) ? Fields[def.type] : Fields['default'];

    return (
      <Element
        definition={def}
        value={this.props.value}
        onValueChange={this.handleValueChange.bind(this)}
      />
    );
  }
}
