import React from 'react';
import backendApiService from './../sources/backend-api.service';
import { Link } from 'react-router';

class UsersPage extends React.Component {

  constructor() {
    super();
    this.state = {
      users: null
    }
  }

  componentWillMount() {
    backendApiService.query('{ users { id, name } }')
      .then(response => this.setState({ users: response.data.users }));
  }

  render() {
    return (
      <div>
        <div>
          <h1>All users</h1>
        </div>
        { this.state.users === null && 'loading users...' }
        { this.state.users !== null && (
          <ul>
            {this.state.users.map((user, index) => (
              <li key={index}>
                <Link to={`/users/${user.id}`}>{ user.name }</Link>
              </li>
            ))}
          </ul>
        ) }
      </div>
    )
  }
}

export default UsersPage;
