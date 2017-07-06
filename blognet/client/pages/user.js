import React from 'react';
import graphqlService from '../services/graphql.service';
import Link from './../components/link';
import Layout from '../components/layout.js';

export default class UserPage extends React.Component {

  static getInitialProps({ query }) {
    return { userId: query.userId };
  }

  state = {
    users: null,
    editingMessage: null
  };

  async loadData(userId) {
    const response = await graphqlService.query(`
      query ($id: String!){
        user (id: $id) {
          id, name,
          follows { id, name },
          messages { id, text }
        }
      }
    `, { id: userId });
    this.setState({ user: response.data.user });
  }

  saveUser() {
    const user = this.state.user;

    const userInput = {
      id: user.id,
      name: user.name,
      messages: user.messages
    };
    return graphqlService.mutation(`
      mutation($user: UserInput) {
        updateUser(user: $user) {
          id, name,
          follows { id, name },
          messages { id, text }
        }
      }
    `, { user: userInput });
  }

  componentDidMount() {
    this.loadData(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.userId);
  }

  renderUser(user, index) {
    return (
      <li key={index}>
        <Link href={`/user?userId=${user.id}`}>{ user.name }</Link>
      </li>
    );
  }

  startUserEdit() {
    this.setState({ editingUser: true });
  }

  changeUserName(event) {
    const user = this.state.user;
    this.setState({
      user: {
        ...user,
        name: event.target.value
      }
    });
  }

  async finishUserEdit() {
    this.setState({ editingUser: false });
    const response = await this.saveUser();
    this.setState({ user: response.data.updateUser });
  }

  renderUserName() {
    const user = this.state.user;

    if (!this.state.editingUser) {
      return (
        <div className='UserPage-userName'
             onClick={() => this.startUserEdit()}>{ user.name }</div>
      );
    }

    return (
      <input type="text" className='UserPage-userName UserPage-userName--edit'
        onChange={e => this.changeUserName(e)}
        onBlur={() => this.finishUserEdit()}
        value={ user.name }
      />
    );
  }

  /* ********************************* MESSAGES **************************************************/

  startEditMessage(message) {
    this.setState({
      editingMessage: message.id
    });
  }

  updateMessage(message, event) {
    const user = this.state.user;
    const index = user.messages.findIndex(m => m.id === message.id);
    user.messages[index].text = event.target.value;
    this.setState({
      user: {
        ...user,
        messages: user.messages
      }
    });
  }

  async finishEditMessage() {
    this.setState({ editingMessage: null });
    const response = await this.saveUser();
    this.setState({ user: response.data.updateUser });
  }

  renderMessage(message, index) {
    if (this.state.editingMessage !== message.id) {
      return (
        <div key={index} className="UserPage-message">
          <div key={index}>&mdash; { message.text }</div> &nbsp;
          <a href="#" onClick={ () => this.startEditMessage(message) }>edit</a>
        </div>
      );
    }
    return (
      <div key={index} className="UserPage-message">
        &mdash;&nbsp; <input onChange={ e => this.updateMessage(message, e) } value={ message.text } /> &nbsp;
        <a href="#" onClick={ () => this.finishEditMessage() }>save</a>
      </div>
    );
  }

  /*************************************************************************************************/

  render() {
    const user = this.state.user;

    if (!user) {
      return <Layout>loading...</Layout>;
    }

    return (
      <Layout>
        <div>
          <h3>{this.renderUserName()}</h3>
        </div>
        <div>
          <h5>{ user.name } writes: </h5>
          <div>
            { user.messages.map((message, index) => this.renderMessage(message, index)) }
          </div>
        </div>
        <hr/>
        <div>
          <h5>{ user.name } follows: </h5>
          <div>
            { user.follows.map((user, index) => this.renderUser(user, index))}
          </div>
        </div>
        <hr/>
        <div>
          <Link href={`/feed?userId=${user.id}`}>View the feed</Link>
        </div>
      </Layout>
    )
  }
}