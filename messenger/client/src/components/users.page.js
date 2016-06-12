import React from 'react';
import backendApiService from './../sources/backend-api.service';

class UsersPage extends React.Component {

  constructor() {
    super();
    this.state = {
      users: null
    }
  }

  componentWillMount() {
    /*backendApiService.request(`{ user() { id, name } }`)
      .then((users) => {
        this.setState({ users });
      });*/
  }

  renderUser(user, index) {
    return (
      <div key={index}>
        Name: { user.name }
      </div>
    );
  }

  render() {

    return (
      <div>
        { this.state.users === null && 'loading users...' }
        { this.state.users !== null && this.state.users.map((user, index) => this.renderUser(user, index)) }
      </div>
    )
  }
}

export default UsersPage;
