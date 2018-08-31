import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Layout/Navbar';
import Home from './components/Home';
class App extends Component {
  componentDidMount() {
    axios.get('/api/products/genres').then(response => console.log(response.data))
  }
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
