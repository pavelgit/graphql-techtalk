'use strict';

const data = require('./data.json');
var fs = require('fs');

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

  updateMessage(messageInputObject) {
    const originalMessage = data.messages.find(m => m.id === messageInputObject.id);
    if (!originalMessage) {
      throw new Error('Message not found');
    }
    originalMessage.text = messageInputObject.text;
    return originalMessage;
  }

  updateUser(userInputObject) {
    const originalUser = this.getUser(userInputObject.id);
    if (!originalUser) {
      throw new Error('User not found');
    }
    originalUser.name = userInputObject.name;
    const saveResult = this._writeData().then(() => originalUser);
    if (userInputObject.messages) {
      userInputObject.messages.map(messageInputObject => this.updateMessage(messageInputObject));
    }
    return saveResult;
  }

  _writeData() {
    const json = JSON.stringify(data, null, 2);
    return new Promise((resolve, reject) => {
      fs.writeFile("./data.json", json, error => { 
        if (error) {
          console.log('Error during data saving:', error);
          reject(error);
        } else {
          console.log('Data saved successfully');
          resolve();
        }
      }); 
    });
  }

}

module.exports = new DataService();