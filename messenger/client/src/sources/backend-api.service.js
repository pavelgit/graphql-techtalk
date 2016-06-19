const fetch = require('node-fetch');

class BackendApiService {
  constructor() {
    this.endpoint = 'http://localhost:5000/graphql';
  }

  _buildUrl(query, variables) {
    return `${this.endpoint}?query=${encodeURIComponent(query)}&`+
      `variables=${encodeURIComponent(JSON.stringify(variables))}`;
  }

  query(query, variables = {}) {
    return fetch(this._buildUrl(query, variables))
      .then(response => response.json());
  }

  mutation(query, variables = {}) {
    return fetch(this.endpoint, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  }

}

export default new BackendApiService();
