import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';

import ProjectPage from './project/ProjectPage';
import SettingsPage from './settings/SetingsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectPage} />
    <Route path="/settings" component={SettingsPage} />
  </Route>
);
