const fetch = require('node-fetch');

class BackendApiService {
  constructor() {
    this.endpoint = 'http://localhost:5001/graphql';
  }

  _buildUrl(query) {
    return `${this.endpoint}?query=${encodeURIComponent(query)}`;
  }

  query(query) {
    return fetch(this._buildUrl(query))
      .then(response => response.json());
  }

  mutation(query) {
    return fetch(this.endpoint, { 
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  }

}

export default new BackendApiService();
