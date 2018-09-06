import React, { Component } from 'react'
import Login from '../Register_Login/Login';
import Navbar from './Navbar';
import Footer from './Footer';


class Layout extends Component {
 
  render() {
    return (
      <div>
        <Login  />
        <Navbar  />
        <div>
           {this.props.children}
        </div>
       <Footer />
      </div>
    )
  }
}


export default Layout;
