import React from 'react';
import backendApiService from './../sources/backend-api.service';

class UserPage extends React.Component {

  constructor() {
    super();
    this.state = {
      users: null
    }
  }

  loadData(userId) {
    backendApiService.query(`
      query ($id: String!){
        user (id: $id) {
          name,
          feedMessages { text, date }
        }
      }
    `, { id: userId })
      .then(response => this.setState({ user: response.data.user }));
  }

  componentWillMount() {
    this.loadData(this.props.params.userId);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.params.userId);
  }

  renderMessage(message, index) {
    return (
      <div key={index}>{ message.text } ({ message.date })</div>
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
