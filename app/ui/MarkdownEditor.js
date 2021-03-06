import React, { Component, PropTypes } from 'react';

import {debounce} from 'lodash';
import Catdown from 'catdown';

import Button from './Button';
import Icon from './Icon';

import globalStyles from './MarkdownEditor.global.css';
import styles from './MarkdownEditor.css';

export default class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'edit',
    };
  }

  static get propTypes() {
    return {
      id: PropTypes.string,
      initialValue: PropTypes.string,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func
    }
  }


  componentDidMount() {
    this.catdown = new Catdown({
      textarea: this.refs.input,
      preview: this.refs.preview,
    });

    this.catdown.editor.on("focus", this.handleFocus.bind(this));
    this.catdown.editor.on("blur", this.handleBlur.bind(this));

    if (this.props.initialValue) {
      this.catdown.set(this.props.initialValue);
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.id === this.props.id) {
        return;
    }

    const catval = this.catdown.value();
    const newval = nextProps.initialValue || "";
    if (newval != catval) {
      this.catdown.set(newval);
    }
  }


  handleFocus() {
    console.log("CatdownEditor focused");
    this.props.onFocus && this.props.onFocus(this.catdown.value());
  }


  handleBlur() {
    console.log("CatdownEditor blurred");
    this.props.onBlur && this.props.onBlur(this.catdown.value());
  }


  selectMode(mode) {
    this.setState({mode});
  }


  render() {
    const modeStyle = styles[this.state.mode];
    const editStyle = this.state.mode === 'edit' ? styles.active : '';
    const viewStyle = this.state.mode === 'view' ? styles.active : '';
    return (
      <div className={modeStyle}>

        <div className={styles.tabs}>
          <div className={`${styles.tab} ${editStyle}`}>
            <Button mode="text" className={styles.tabButton} onClick={this.selectMode.bind(this, "edit")}>
              <Icon name="edit"/>
            </Button>
          </div>
          <div className={`${styles.tab} ${viewStyle}`}>
            <Button mode="text" className={styles.tabButton} onClick={this.selectMode.bind(this, "view")}>
              <Icon name="remove_red_eye"/>
            </Button>
          </div>
        </div>

        <div className={`${styles.editor} ${editStyle}`}>
          <textarea ref="input"/>
        </div>

        <div ref="preview" className={`${styles.preview} ${viewStyle}`}/> 

      </div>
    );
  }
}
