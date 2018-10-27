import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Login from "../Register_Login/Login";
import UserCartModal from "../User/UserCart/UserCartModal";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UI/Backdrop/Backdrop";
import { openLoginModal } from "../../store/actions/modalActions";
import {
  openNavSideDrawer,
  closeNavSideDrawer,
  closeAccountSideDrawer
} from "../../store/actions/sideDrawerActions";
import { connect } from "react-redux";
class Layout extends Component {
  drawerToggleClickHandler = () => {
    if (!this.props.navSideDrawerOpen) {
      this.props.openNavSideDrawer();
    } else {
      this.props.closeNavSideDrawer();
    }
  };

  backDropClickHandler = () => {
    this.props.closeAccountSideDrawer();
  };
  closeSideDrawer = () => {
    this.props.closeNavSideDrawer();
  };
  render() {
    let backDrop;
    if (this.props.accountDrawerOpen) {
      backDrop = <Backdrop click={this.backDropClickHandler} />;
    }
    return (
      <div className="App">
        {backDrop}
        <SideDrawer
          closeSideDrawer={this.closeSideDrawer}
          open={this.props.navSideDrawerOpen}
          user={this.props.authedUser}
          openLoginModal={this.props.openLoginModal}
        />
        <Login />
        <UserCartModal />
        <Navbar
          sideDrawerOpen={this.props.navSideDrawerOpen}
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <div>{this.props.children}</div>
        <Footer location={this.props.location.pathname} />
      </div>
    );
  }
}

const mapStateToProps = ({ users, sideDrawer }) => ({
  authedUser: users.authedUser,
  navSideDrawerOpen: sideDrawer.navDrawerOpen,
  accountDrawerOpen: sideDrawer.accountDrawerOpen
});

export default connect(
  mapStateToProps,
  {
    openLoginModal,
    openNavSideDrawer,
    closeNavSideDrawer,
    closeAccountSideDrawer
  }
)(withRouter(Layout));
