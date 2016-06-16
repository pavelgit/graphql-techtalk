import React from 'react';
import backendApiService from './../sources/backend-api.service';

class UserPage extends React.Component {

  constructor() {
    super();
    this.state = {
      users: null
    }
  }

  loadData(params) {
    backendApiService.query(`
      query ($id: String!){
        user (id: $id) {
          name,
          feedMessages {
            user { name },
            text,
            date
          }
        }
      }
    `, { id: params.userId })
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
        <h4>{ this.state.user.name } reads: </h4>
        <div>{ this.state.user.feedMessages.map((message, index) => this.renderMessage(message, index)) }</div>
      </div>
    )
  }
}

export default UserPage;
