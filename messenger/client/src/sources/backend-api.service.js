const fetch = require('node-fetch');

class BackendApiService {

  constructor() {
    this.serverEndpoint = 'http://localhost:3000/graphql';
  }

  _buildUrl(query) {
    return `${this.serverEndpoint}?query=${encodeURIComponent(query)}`;
  }

  request(query) {
    return fetch(this._buildUrl(query))
      .then(response => response.json());
  }
}

export default new BackendApiService();
