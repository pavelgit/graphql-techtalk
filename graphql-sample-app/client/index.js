const fetch = require('node-fetch');

const serverEndpoint = "http://localhost:3000/graphql";

function request(query) {
  return fetch(`${serverEndpoint}?query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(json => console.log(JSON.stringify(json)));
}


request(`
  {
    user(id: 1) {
      id,
      name
    }
  }
`);

request(`
  {
    user(id: 1) {
      id,
      name,
      email
    }
  }
`);

request(`
  {
    user(id: 1) {
      id,
      name,
      email,
      friends {
        id
      }
    }
  }
`);

request(`
  {
    user(id: 1) {
      id,
      name,
      email,
      friends {
        id,
        name
      }
    }
  }
`);