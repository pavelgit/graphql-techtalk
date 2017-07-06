import React from 'react';
import graphqlService from '../services/graphql.service';
import Layout from '../components/layout.js';

export default class FeedPage extends React.Component {

  static getInitialProps({ query }) {
    return { userId: query.userId };
  }

  state = {
    users: null
  };

  async loadData(userId) {
    const response = await graphqlService.query(`
      query ($id: String!){
        user (id: $id) {
          name,
          feedMessages { text, date }
        }
      }
    `, { id: userId });
    this.setState({ user: response.data.user });
  }

  componentWillMount() {
    this.loadData(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.userId);
  }

  renderMessage(message, index) {
    return (
      <div key={index}>{ message.text } ({ message.date })</div>
    );
  }

  render() {

    const user = this.state.user;

    if (!user) {
      return <Layout>loading...</Layout>;
    }

    return (
      <Layout>
        <h4>{ user.name } reads: </h4>
        <div>{ user.feedMessages.map((message, index) => this.renderMessage(message, index)) }</div>
      </Layout>
    )
  }
}
