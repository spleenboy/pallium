import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../../ui/Button';
import Fields from './fields';
import * as Actions from './ContentActions.js';
import styles from './ContentFormComponent.css';

export class ContentFormComponent extends Component {
  handleSave(e) {

  }

  handleFieldValueChange(definition, value, e) {
    this.props.updateContent(definition.name, value);
  }

  render() {
    const {contentType, content} = this.props;

    const fields = contentType.fields.map((def, i) => {
      const Field = Fields[def.type || 'text'];
      if (!Field) {
        console.error("Invalid field definition", def);
      }
      return <Field key={i} definition={def} value={content.values[def.name]} onValueChange={this.handleFieldValueChange.bind(this)}/>
    });

    return (
      <div className={styles.contentForm}>
        <div className={styles.fields}>
          {fields}
        </div>
        <div className={styles.bottom}>
          <Button onClick={this.handleSave.bind(this)}>Save</Button>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    contentType: state.project.contentType,
    content: state.project.contentType.content,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveContent: Actions.saveContent,
    updateContent: Actions.updateContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentFormComponent);
