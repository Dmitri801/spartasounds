import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Login from "../Register_Login/Login";
import UserCartModal from "../User/UserCart/UserCartModal";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UI/Backdrop/Backdrop";
import { openLoginModal } from "../../store/actions/modalActions";
import { connect } from "react-redux";
class Layout extends Component {
  state = {
    sideDrawerOpen: false
  };
  drawerToggleClickHandler = () => {
    this.setState(prevState => ({
      sideDrawerOpen: !prevState.sideDrawerOpen
    }));
  };

  backDropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  closeSideDrawer = () => {
    this.setState({ sideDrawerOpen: false });
  };
  render() {
    let backDrop;
    if (this.state.sideDrawerOpen) {
      backDrop = <Backdrop click={this.backDropClickHandler} />;
    }
    return (
      <div className="App">
        {backDrop}
        <SideDrawer
          closeSideDrawer={this.closeSideDrawer}
          open={this.state.sideDrawerOpen}
          authedUser={this.props.authedUser}
          openLoginModal={this.props.openLoginModal}
        />
        <Login />
        <UserCartModal />
        <Navbar
          sideDrawerOpen={this.state.sideDrawerOpen}
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <div>{this.props.children}</div>
        <Footer location={this.props.location.pathname} />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  authedUser: users.authedUser
});

export default connect(
  mapStateToProps,
  { openLoginModal }
)(withRouter(Layout));
