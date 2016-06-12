require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import App from './app.view.js';
import UsersPage from './users.page.js';

class AppComponent extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="users" component={UsersPage} />
        </Route>
      </Router>
    );
  }
}

export default AppComponent;
