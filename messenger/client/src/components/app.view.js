import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div className="container Page">
        <div className="row">
          <div className="column column-10">
            <div>
              <h4>Links</h4>
            </div>
            <div>
              <Link to="/">User list</Link>
            </div>
          </div>
          <div className="column column-10" />
          <div className="column column-80">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
