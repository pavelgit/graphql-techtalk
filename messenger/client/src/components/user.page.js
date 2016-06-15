import React from 'react';
import backendApiService from './../sources/backend-api.service';
import { Link } from 'react-router';
import Interpolate from './../sources/interpolate';

class UserPage extends React.Component {

  constructor() {
    super();
    this.state = {
      users: null
    }
  }

  loadData(params) {
    backendApiService.request(Interpolate.json`
      {
        user (id: ${String(params.userId)}) {
          id, name,
          address { street, house },
          contacts { phone, skype, email },
          follows { id, name }
        }
      }
    `)
      .then(response => this.setState({ user: response.data.user }));
  }

  componentWillMount() {
    this.loadData(this.props.params);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.params);
  }

  renderUser(user, index) {
    return (
      <li key={index}>
        <Link to={`/users/${user.id}`}>{ user.name }</Link>
      </li>
    );
  }

  render() {

    if (!this.state.user) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <div>
          <h3>User: { this.state.user.name }</h3>
        </div>
        <table>
          <tbody>
          <tr>
            <th>Address: </th><td>{ this.state.user.address.street }, { this.state.user.address.house }</td>
          </tr>
          <tr>
            <th>Contacts: </th>
            <td>
              <div>Phone: { this.state.user.contacts.phone }</div>
              <div>Skype: { this.state.user.contacts.skype }</div>
              <div>Email: { this.state.user.contacts.email }</div>
            </td>
          </tr>
          </tbody>
        </table>
        <div>
          <h4>This user follows: </h4>
          <div>
            { this.state.user.follows.map((user, index) => this.renderUser(user, index))}
          </div>
        </div>
        <hr/>
        <div>
          <Link to={`/users/${this.state.user.id}/feed`}>View the feed</Link>
        </div>
      </div>
    )
  }
}

export default UserPage;
