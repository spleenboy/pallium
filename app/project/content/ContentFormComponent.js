import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../../ui/Button';
import Fields from './fields';
import * as Actions from './ContentActions.js';
import styles from './ContentFormComponent.css';

export class ContentFormComponent extends Component {
  handleCancel(e) {
    this.props.clearContent();
  }


  handleSave(e) {
    const {project, content} = this.props;
    this.props.saveContent(project, content.values, content._id);
    this.props.clearContent();
  }

  handleFieldValueChange(definition, value, e) {
    this.props.updateContent(definition.name, value);
  }

  render() {
    const {contentType, content} = this.props;

    const fields = contentType.fields.map((def, i) => {
      let Field = (def.type in Fields) ? Fields[def.type] : Fields['default'];
      return (
        <Field
          key={i}
          definition={def}
          value={content.values[def.name]}
          onValueChange={this.handleFieldValueChange.bind(this)}
        />
      );
    });

    return (
      <div className={styles.contentForm}>
        <div className={styles.fields}>
          {fields}
        </div>
        <div className={styles.bottom}>
          <div className={styles.buttons}>
            <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
            <Button primary={true} raised={true} onClick={this.handleSave.bind(this)}>Save</Button>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    project: state.project,
    contentType: state.project && state.project.contentType,
    content: state.project && state.project.contentType && state.project.contentType.content,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveContent: Actions.saveContent,
    updateContent: Actions.updateContent,
    clearContent: Actions.clearContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentFormComponent);
