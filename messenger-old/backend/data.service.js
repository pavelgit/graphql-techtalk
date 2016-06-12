const data = require('./data.json');

class DataService {

  getUser(id) {
    return data.users.find(user => parseInt(user.id) === parseInt(id));
  }

  getUserMessages(userId) {
    return data.messages.find(message => parseInt(message.userId) === parseInt(userId));
  }

}

module.exports = new DataService();