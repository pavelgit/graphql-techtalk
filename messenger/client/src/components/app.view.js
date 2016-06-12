import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="column-25">
            Here is the sidepab
          </div>
          <div className="column-75">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
