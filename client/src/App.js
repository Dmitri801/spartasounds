import React, { Component } from 'react';
import Layout from './components/Layout';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
class App extends Component {
  
  render() {
    return (
      <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      </Layout>
    );
  }
}

export default App;
