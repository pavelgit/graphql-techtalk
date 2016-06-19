import React from 'react';
import backendApiService from './../sources/backend-api.service';
import { Link } from 'react-router';

class UserPage extends React.Component {

  constructor() {
    super();
    this.state = {
      users: null,
      editingMessage: null
    }
  }

  loadData(userId) {
    backendApiService.query(`
      query ($id: String!){
        user (id: $id) {
          id, name,
          follows { id, name },
          messages { id, text }
        }
      }
    `, { id: userId })
      .then(response => this.setState({ user: response.data.user }));
  }

  saveUser() {
    const userInput = {
      id: this.state.user.id,
      name: this.state.user.name,
      messages: this.state.user.messages
    };
    return backendApiService.mutation(`
      mutation($user: UserInput) {
        updateUser(user: $user) {
          id, name,
          follows { id, name },
          messages { id, text }
        }
      }
    `, { user: userInput });
  }

  componentWillMount() {
    this.loadData(this.props.params.userId);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.params.userId);
  }

  renderUser(user, index) {
    return (
      <li key={index}>
        <Link to={`/users/${user.id}`}>{ user.name }</Link>
      </li>
    );
  }

  startUserEdit() {
    this.setState({ editingUser: true });
  }

  changeUserName(event) {
    this.setState({
      user: Object.assign({}, this.state.user,
        { name: event.target.value })
    })
  }

  finishUserEdit() {
    this.setState({ editingUser: false });
    this.saveUser().then(response => this.setState({ user: response.data.updateUser }));
  }

  renderUserName() {
    if (!this.state.editingUser) {
      return (
        <div className='UserPage-userName'
             onClick={() => this.startUserEdit()}>{ this.state.user.name }</div>
      );
    }

    return (
      <input type="text" className='UserPage-userName UserPage-userName--edit'
        onChange={e => this.changeUserName(e)}
        onBlur={() => this.finishUserEdit()}
        value={ this.state.user.name }
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
    const index = this.state.user.messages.findIndex(m => m.id === message.id);
    this.state.user.messages[index].text = event.target.value;
    this.setState({
      user: {
        ...this.state.user,
        messages: this.state.user.messages
      }
    });
  }

  finishEditMessage() {
    this.setState({ editingMessage: null });
    this.saveUser().then(response => this.setState({ user: response.data.updateUser }));
  }

  renderMessage(message, index) {
    if (this.state.editingMessage !== message.id) {
      return (
        <div key={index} className="UserPage-message">
          <div key={index}>&mdash; { message.text }</div>
          <a href="#" onClick={ () => this.startEditMessage(message) }>edit</a>
        </div>
      );
    }
    return (
      <div key={index} className="UserPage-message">
        <input onChange={ e => this.updateMessage(message, e) } value={ message.text } />
        <a href="#" onClick={ () => this.finishEditMessage() }>save</a>
      </div>
    );
  }

  /*************************************************************************************************/

  render() {

    if (!this.state.user) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <div>
          <h3>User: {this.renderUserName()}</h3>
        </div>
        <div>
          <h4>This user writes: </h4>
          <div>
            { this.state.user.messages.map((message, index) => this.renderMessage(message, index)) }
          </div>
        </div>
        <hr/>
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
