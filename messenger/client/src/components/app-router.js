require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './app.view.js';
import UsersPage from './users.page.js';
import UserPage from './user.page.js';
import FeedPage from './feed.page.js';

class AppComponent extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={UsersPage} />
          <Route path="users/:userId" component={UserPage} />
          <Route path="users/:userId/feed" component={FeedPage} />
        </Route>
      </Router>
    );
  }
}

export default AppComponent;
