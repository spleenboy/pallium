import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Shortcuts from '../../util/Shortcuts';
import Button from '../../ui/Button';
import Field from './fields/Field';
import * as Actions from './ContentActions.js';
import styles from './ContentFormComponent.css';

export class ContentFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validations: {},
    }
    this.shortcuts = new Shortcuts();
    this.shortcuts.register('ctrl s', this.handleSave.bind(this));
    this.shortcuts.register('escape', this.handleCancel.bind(this));
  }


  componentDidMount() {
    this.shortcuts.start();
  }


  componentWillUnmount() {
    this.shortcuts.stop();
  }


  handleCancel(e) {
    this.props.clearContent();
  }


  handleSave(e) {
    const {project, content} = this.props;
    this.props.saveContent(project, content.values, content._id);
    this.props.clearContent();
  }


  handleDelete(e) {
    const {project, content} = this.props;
    this.props.deleteContent(project, content.values, content._id);
  }


  handleFieldValueChange(definition, value, validation) {
    const validations = Object.assign({}, this.state.validations);
    validations[definition.name] = validation.valid;
    this.setState({validations});
    this.props.updateContent(definition.name, value);
  }


  render() {
    const {contentType, content} = this.props;

    let fieldNames = Object.keys(this.state.validations);
    const invalid = fieldNames.some(fieldName => {
      return !this.state.validations[fieldName];
    });

    const fields = contentType.fields.map((def, i) => {
      return (
        <Field
          id={content._id}
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
            <Button mode="warning" className={styles.deleteBtn} onClick={this.handleDelete.bind(this)}>Delete</Button>
            <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
            <Button mode="primary" disabled={invalid} onClick={this.handleSave.bind(this)}>Save</Button>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const project = state.project;
  const contentType = project && project.contentType;
  const content = contentType && contentType.content;
  const contentTitle = content && content.title;
  const contentFilename = content && content.filename;
  return {
    project,
    contentType,
    content,
    contentTitle,
    contentFilename,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveContent: Actions.saveContent,
    updateContent: Actions.updateContent,
    clearContent: Actions.clearContent,
    deleteContent: Actions.deleteContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentFormComponent);
