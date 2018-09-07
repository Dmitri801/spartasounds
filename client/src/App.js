import React, { Component } from 'react';
import Layout from './components/Layout';
import Auth from './components/HOC/Auth';
import { Switch, Route } from 'react-router-dom';
import Register from './components/Register_Login/Register'
import UserDashboard from './components/User/UserDashboard';
import BeatStore from './components/BeatStore';
import Home from './components/Home';
class App extends Component {
  
  render() {
    return (
      <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/beatstore" exact component={Auth(BeatStore, null)} />
        <Route path="/register" exact component={Auth(Register, false)} />
      </Switch>
      </Layout>
    );
  }
}

export default App;
