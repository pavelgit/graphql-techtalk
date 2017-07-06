const fetch = require('node-fetch');

const graphqlService = new class {

  constructor() {
    this.endpoint = 'http://localhost:3001/graphql';
  }

  _buildUrl(query, variables) {
    return `${this.endpoint}?query=${encodeURIComponent(query)}&`+
      `variables=${encodeURIComponent(JSON.stringify(variables))}`;
  }

  async query(query, variables = {}) {
    const response = await fetch(this._buildUrl(query, variables));
    const json = await response.json();
    return json;
  }

  async mutation(query, variables = {}) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    return json;
  }

};

export default graphqlService;