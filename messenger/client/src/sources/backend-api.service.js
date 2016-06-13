const fetch = require('node-fetch');

class BackendApiService {
  _buildUrl(query) {
    return `http://localhost:5001/graphql?query=${encodeURIComponent(query)}`;
  }

  request(query) {
    return fetch(this._buildUrl(query))
      .then(response => response.json());
  }
}

export default new BackendApiService();
