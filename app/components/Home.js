import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import styles from './Home.css';


export default class Home extends Component {
  goTo(path, e) {
    this.context.router.push(path);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Pallium"
          onLeftIconButtonTouchTap={this.goTo.bind(this, "/counter")}
        />
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object,
};

