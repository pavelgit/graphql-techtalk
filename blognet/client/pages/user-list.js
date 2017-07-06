import React from 'react';
import graphqlService from '../services/graphql.service';
import Link from './../components/link';
import Layout from '../components/layout.js';

export default class UserListPage extends React.Component {

  state = {
    users: null
  };

  async componentDidMount() {
    const response = await graphqlService.query('{ users { id, name } }');
    this.setState({ users: response.data.users });
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>All users</h1>
        </div>
        { this.state.users === null && 'loading users...' }
        { this.state.users !== null && (
          <ul>
            {this.state.users.map((user, index) => (
              <li key={index}>
                <Link href={`/user?userId=${user.id}`}>{ user.name }</Link>
              </li>
            ))}
          </ul>
        )}
      </Layout>
    )
  }
}