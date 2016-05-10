import React, { Component, PropTypes } from 'react';
import path from 'path';

const {shell} = require('electron');

import styles from './FilePreview.css';
import Icon from './Icon';
import Modal from './Modal';

const imageExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.svg'];
const assetIcons = {
  'default': 'attachment',
  '.pdf': 'picture_as_pdf',
  '.txt': 'text_fields',
  '.xls': 'grid_on',
};

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zooming: false,
    };
  }


  static get propTypes() {
    return {
      src: PropTypes.string.isRequired,
    }
  }


  handleOpen(e) {
    const ext = path.extname(this.props.src);
    if (imageExtensions.indexOf(ext) >= 0) {
      this.setState({zooming: true});
    } else {
      shell.openItem(this.props.src);
    }
  }


  handleModalClose(e) {
    this.setState({zooming: false});
  }


  render() {
    const {src} = this.props;
    
    if (!src) {
      return null;
    }

    const filename = path.basename(src);
    const extension = path.extname(src);

    let image, modal;

    if (imageExtensions.indexOf(extension) >= 0) {
      image = (
        <img src={src} className={styles.image} alt={filename}/>
      );
      modal = (
        <Modal
          title={filename}
          open={this.state.zooming}
          onClose={this.handleModalClose.bind(this)}
        >
          <div className={styles.full}>
            {image}
          </div>
        </Modal>
      );
    } else {
      const iconName = assetIcons[extension] || assetIcons['default'];
      image = (
        <Icon className={styles.icon} name={iconName}/>
      );
    }

    return (
      <div className={styles.filePreview}>
        <div className={styles.thumbnail} onClick={this.handleOpen.bind(this)}>
          {image}
        </div>
        {modal}
      </div>
    );
  }
}
