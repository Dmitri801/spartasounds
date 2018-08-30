import React, { Component } from 'react';
import Navbar from './components/Layout/Navbar';
import Home from './components/Home';
class App extends Component {
  render() {
    return (
      <div style={{height: '2000px'}} className="App">
       <Navbar />
       <Home />
      </div>
    );
  }
}

export default App;
