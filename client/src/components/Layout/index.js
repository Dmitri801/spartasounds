import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Login from "../Register_Login/Login";
import UserCartModal from "../User/UserCart/UserCartModal";
import Navbar from "./Navbar";
import Footer from "./Footer";

class Layout extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <UserCartModal />
        <Navbar />
        <div>{this.props.children}</div>
        <Footer location={this.props.location.pathname} />
      </div>
    );
  }
}

export default withRouter(Layout);
