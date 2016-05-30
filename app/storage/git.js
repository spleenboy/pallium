import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const remote = require('remote');
const Git = remote.require('simple-git');

import * as ProjectActions from '../project/ProjectActions';
import * as ContentActions from '../project/content/ContentActions';


// Middleware to handle communication with a git repository
export default function git(store) {
  return next => action => {
    const result = next(action);
    const state = store.getState();

    if (!isManaged(state.project)) {
      return result;
    }

    const repo = new Repository(state.project);
    switch (action.type) {
      case ProjectActions.OPENED_PROJECT:
        repo.init();
        break;
      case ContentActions.SAVE_CONTENT:
      case ContentActions.TRASH_CONTENT:
        repo.send();
        break;
    }

    return result;
  };
}


export function isManaged(project) {
  return project && project.git && project.git.url;
}


export class Repository {
  constructor(project) {
    this.localPath  = path.dirname(project.path);
    this.remoteUrl  = project.git.url;
    this.remoteName = project.git.remote || "origin";
    this.branch     = project.git.branch || "master";
    this.repo       = new Git(this.localPath);
  }


  done(what, resolve, reject) {
    return function(err, data) {
      if (err) {
        console.error(what, 'ERROR', err);
        reject(err);
      } else {
        console.info(what, 'SUCCESS', data);
        resolve(data);
      }
    }
  }


  init() {
    return new Promise((resolve, reject) => {
      this.status()
      .then(data => {
        this.stage(data)
          .then(this.pull.bind(this))
          .then(resolve).catch(reject);
      })
      .catch(err => {
        console.error("Error getting status. Attempting clone...");
        this.clone().then(resolve).catch(reject);
      });
    });
  }


  status() {
    return new Promise((resolve, reject) => {
      this.repo.status(
        this.done("Status", resolve, reject)
      );
    });
  }


  // Allows cloning into a non-empty directory
  clone() {
    return new Promise((resolve, reject) => {
      this.repo
        .init(false)
        .addRemote(this.remoteName, this.remoteUrl)
        .reset('hard')
        .pull(this.remoteName, this.branch, this.done("Pull", resolve, reject));
    });
  }


  pull() {
    return new Promise((resolve, reject) => {
      this.repo.pull(
        this.remoteName,
        this.branch,
        this.done("Pull", resolve, reject)
      );
    });
  }


  add(files) {
    if (!files) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      this.repo.add(
        files,
        this.done("Add", resolve, reject)
      );
    });
  }


  remove(files) {
    if (!files || !files.length) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this.repo.rm(
        files,
        this.done("Remove", resolve, reject)
      );
    });
  }


  commit(msg) {
    return new Promise((resolve, reject) => {
      this.repo.commit(msg, this.done("Commit", resolve, reject));
    });
  }


  stage(status) {
    if (status.isClean()) {
      console.info("Working directory clean.");
      return Promise.resolve();
    }

    const msg = [];

    if (status.created && status.created.length) {
      msg.push("Created: " + status.created.join(', '));
    }

    if (status.not_added && status.not_added.length) {
      msg.push("Added: " + status.not_added.join(', '));
    }

    if (status.modified && status.modified.length) {
      msg.push("Updated: " + status.modified.join(', '));
    }

    if (status.deleted && status.deleted.length) {
      msg.push("Deleted: " + status.deleted.join(', '));
    }

    const commitMsg = msg.join('; ');

    return new Promise((resolve, reject) => {
      console.info("Staging files", msg);

      this.add(status.created)
        .then(this.add.bind(this, status.not_added))
        .then(this.add.bind(this, status.modified))
        .then(this.remove.bind(this, status.deleted))
        .then(this.commit.bind(this, commitMsg))
        .then(resolve).catch(reject);
    });
  }
  

  push() {
    return new Promise((resolve, reject) => {
      this.repo.push(
        this.remoteName,
        this.branch,
        this.done("Push", resolve, reject)
      );
    });
  }


  send() {
    return new Promise((resolve, reject) => {
      this.status()
      .then(this.stage.bind(this))
      .then(this.push.bind(this))
      .then(resolve).catch(reject);
    });
  }
}
