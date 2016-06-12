'use strict';

const data = require('./data.json');

class DataService {

  getAllUsers() {
    return data.users;
  }

  getUser(id) {
    return data.users.find(user => parseInt(user.id) === parseInt(id));
  }

  getManyUsers(ids) {
    return data.users.filter(user => ids.indexOf(user.id) >= 0);
  }

  getUserMessages(userId) {
    return data.messages.filter(message => parseInt(message.userId) === parseInt(userId));
  }

  getManyMessages(userIds) {
    let feedMessages = [];
    for (const userId of userIds) {
      feedMessages = feedMessages.concat(this.getUserMessages(userId));
    }
    feedMessages = feedMessages.sort((a, b) => a.id - b.id);
    return feedMessages;
  }

}

module.exports = new DataService();