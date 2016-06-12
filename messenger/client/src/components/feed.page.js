import React from 'react';
import backendApiService from './../sources/backend-api.service';
import { Link } from 'react-router';

class UserPage extends React.Component {

  constructor() {
    super();
    this.state = {
      users: null
    }
  }

  loadData(params) {
    backendApiService.request(`
      {
        user (id: "${params.userId}") {
          name,
          feedMessages {
            user { name },
            text,
            date
          }
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

  renderMessage(message, index) {
    return (
      <div key={index}>{ message.user.name } says: { message.text } ({ message.date })</div>
    );
  }

  render() {

    if (!this.state.user) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <h4>The user { this.state.user.name } reads: </h4>
        <div>{ this.state.user.feedMessages.map((message, index) => this.renderMessage(message, index)) }</div>
      </div>
    )
  }
}

export default UserPage;