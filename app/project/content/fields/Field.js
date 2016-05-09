import React, { Component, PropTypes } from 'react';

import Fields from './index';

export default class Field extends Component {
  static get PropTypes() {
    return {
      definition: PropTypes.object.isRequired,
      value: PropTypes.object.isRequired,
      onValueChange: PropTypes.func.isRequired,
      assetDirectory: PropTypes.string.isRequired,
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
        assetDirectory={this.props.assetDirectory}
        definition={def}
        value={this.props.value}
        onValueChange={this.handleValueChange.bind(this)}
      />
    );
  }
}
