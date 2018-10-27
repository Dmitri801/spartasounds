import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import DrawerToggleButton from "./SideDrawer/DrawerButton.js";
import FlatBtn from "../UI/Buttons/FlatBtn";
import { Link, withRouter } from "react-router-dom";
import { TheLogo } from "../UI/Icon";
import { PopoverMenu } from "../UI/PopoverMenu";
import { Transition } from "react-spring";
import { connect } from "react-redux";
import { openLoginModal } from "../../store/actions/modalActions";
import { logoutUser } from "../../store/actions/userActions";
import {
  openAccountSideDrawer,
  closeAccountSideDrawer
} from "../../store/actions/sideDrawerActions";

class Navbar extends Component {
  state = {
    mobileMode: false,
    scrollTop: true
  };
  componentDidMount() {
    window.addEventListener("scroll", this.onPageScroll);
    if (window.innerWidth <= 856) {
      this.setState({ mobileMode: true });
      window.addEventListener("resize", this.setMobileMode);
    } else {
      window.addEventListener("resize", this.setMobileMode);
    }
  }

  setMobileMode = () => {
    if (window.innerWidth <= 856) {
      this.setState({ mobileMode: true });
    } else {
      this.setState({ mobileMode: false });
    }
  };

  logoutHandler = () => {
    this.props.logoutUser().then(res => {
      if (res.payload.success) {
        this.props.history.push("/");
      } else {
        console.log(res.payload);
      }
    });
  };

  popoverClickedHandler = () => {
    if (this.state.mobileMode) {
      if (this.props.accountDrawerOpen) {
        this.props.closeAccountSideDrawer();
      } else {
        this.props.openAccountSideDrawer();
      }
    }
  };

  closePopoverHandler = () => {
    const popoverMenu = document.querySelector(".popover");
    if (!this.state.mobileMode) {
      popoverMenu.style.pointerEvents = "none";

      setTimeout(() => {
        popoverMenu.style.pointerEvents = "auto";
      }, 300);
    } else {
      this.props.closeAccountSideDrawer();
    }
  };

  renderNavLinks = () => {
    const { user, location, sideDrawerOpen } = this.props;
    if (!sideDrawerOpen) {
      if (user && !user.isAuth) {
        return (
          <div className="navigation_items noauth" style={{ display: "flex" }}>
            <Link style={{ alignSelf: "flex-end" }} to="/">
              <Button
                style={
                  location.pathname === "/"
                    ? { color: "#fff" }
                    : { color: "rgba(255, 255, 255, 0.7)" }
                }
                disableRipple
                color="inherit"
                tabIndex="-1"
              >
                Home
              </Button>
            </Link>
            <Link style={{ alignSelf: "flex-end" }} to="/shop">
              <Button
                style={
                  location.pathname === "/shop"
                    ? { color: "#fff" }
                    : { color: "rgba(255, 255, 255, 0.7)" }
                }
                disableRipple
                color="inherit"
                tabIndex="-1"
              >
                Shop
              </Button>
            </Link>
            <Link
              style={{ alignSelf: "flex-end", marginRight: "20px" }}
              to="/beatstore"
            >
              <Button
                style={
                  location.pathname === "/beatstore"
                    ? { color: "#fff" }
                    : { color: "rgba(255, 255, 255, 0.7)" }
                }
                disableRipple
                color="inherit"
                tabIndex="-1"
              >
                Beat Store
              </Button>
            </Link>
            <Link className="home_register_btn" to="/register">
              <FlatBtn margin="0" title="Register" width="100px" />
            </Link>

            <Button
              disableRipple={true}
              onClick={this.openLoginModal}
              className="login_btn"
              variant="outlined"
              color="inherit"
              tabIndex="0"
            >
              Log In
            </Button>
          </div>
        );
      } else {
        return (
          <div className="navigation_items" style={{ display: "flex" }}>
            <Link
              className="main_link"
              style={{ alignSelf: "flex-end" }}
              to="/"
            >
              <Button
                style={
                  location.pathname === "/"
                    ? { color: "#fff" }
                    : { color: "rgba(255, 255, 255, 0.7)" }
                }
                disableRipple={true}
                color="inherit"
              >
                Home
              </Button>
            </Link>
            <Link
              className="main_link"
              style={{ alignSelf: "flex-end" }}
              to="/shop"
            >
              <Button
                style={
                  location.pathname === "/shop"
                    ? { color: "#fff" }
                    : { color: "rgba(255, 255, 255, 0.7)" }
                }
                disableRipple={true}
                color="inherit"
              >
                Shop
              </Button>
            </Link>
            <Link
              className="main_link"
              style={{ alignSelf: "flex-end", marginRight: "20px" }}
              to="/beatstore"
            >
              <Button
                style={
                  location.pathname === "/beatstore"
                    ? { color: "#fff" }
                    : { color: "rgba(255, 255, 255, 0.7)" }
                }
                disableRipple={true}
                color="inherit"
              >
                Beat Store
              </Button>
            </Link>
            <div className="user_menu">
              <IconButton onClick={this.popoverClickedHandler} color="inherit">
                <AccountCircle
                  className="accountCircle"
                  style={{
                    fontSize: 50,
                    border: "2px solid #4e4e50",
                    borderRadius: "50%"
                  }}
                />
              </IconButton>
              <PopoverMenu
                classes={[
                  user && user.isAdmin ? "admin" : null,
                  this.props.accountDrawerOpen ? "open" : ""
                ].join(" ")}
              >
                <div className="menu">
                  <Link to="/user/dashboard">
                    <MenuItem
                      style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                      disableRipple={true}
                      onClick={this.closePopoverHandler}
                    >
                      My Account
                    </MenuItem>
                  </Link>
                  <Link to="/user/cart">
                    <div className="cart_link">
                      <span>{user && user.cart ? user.cart.length : 0}</span>
                    </div>
                    <MenuItem
                      style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                      disableRipple={true}
                      onClick={this.closePopoverHandler}
                    >
                      My Cart
                    </MenuItem>
                  </Link>
                  <div
                    className="logoutbtn_popover"
                    onClick={() => this.logoutHandler()}
                  >
                    <MenuItem
                      style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                      disableRipple={true}
                      onClick={this.closePopoverHandler}
                    >
                      Log Out
                    </MenuItem>
                  </div>
                  {user && user.isAdmin ? (
                    <div className="admin_popover_menu">
                      <hr />
                      <h1>Admin</h1>
                      <Link to="/admin/add_product">
                        <MenuItem
                          style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                          disableRipple={true}
                          onClick={this.closePopoverHandler}
                        >
                          Add Product
                        </MenuItem>
                      </Link>
                      <Link to="/admin/manage_products">
                        <MenuItem
                          style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                          disableRipple={true}
                          onClick={this.closePopoverHandler}
                        >
                          Manage Products
                        </MenuItem>
                      </Link>
                      <Link to="/admin/upload">
                        <MenuItem
                          style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                          disableRipple={true}
                          onClick={this.closePopoverHandler}
                        >
                          Upload
                        </MenuItem>
                      </Link>
                      <Link to="/admin/site_info">
                        <MenuItem
                          style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                          disableRipple={true}
                          onClick={this.closePopoverHandler}
                        >
                          Site Info
                        </MenuItem>
                      </Link>
                    </div>
                  ) : null}
                </div>
                <TheLogo
                  right="-100px"
                  bottom="10px"
                  position="absolute"
                  link={true}
                  linkTo="/"
                  width="400px"
                  height="170px"
                  classes="img_cover"
                  id="popover_logo"
                />
              </PopoverMenu>
            </div>
          </div>
        );
      }
    }
  };

  openLoginModal = () => {
    this.props.openLoginModal();
  };

  onPageScroll = () => {
    if (window.scrollY > 0) {
      this.setState({
        scrollTop: false
      });
    } else {
      this.setState({
        scrollTop: true
      });
    }
  };
  render() {
    const { scrollTop } = this.state;

    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: this.state.scrollTop
            ? "rgb(0, 0, 0)"
            : "rgba(0, 0, 0, 0.9)",
          padding: this.state.scrollTop ? "10px 0px" : "5px 0px",
          borderBottom: "0.3px solid rgba(202,55,38, 0.9)",
          transition: "all 0.5s ease-out",
          zIndex: "99999999"
        }}
      >
        <Toolbar className="nav" style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header_logo">
              <TheLogo
                classes="img_cover"
                link={true}
                linkTo="/"
                width="100px"
                height="70px"
                id="nav_logo"
              />
              <Link className="header_link" tabIndex="-1" to="/">
                <span className="header_text">Sparta Sounds</span>
              </Link>
              <DrawerToggleButton
                sideDrawerOpen={this.props.sideDrawerOpen}
                click={this.props.drawerClickHandler}
              />
              {scrollTop ? (
                <Transition
                  from={{ opacity: 0 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
                >
                  {styles => (
                    <span style={styles} className="header_second">
                      <span className="glitch" data-text="COLOSSEUM">
                        Colosseum
                      </span>{" "}
                      <span className="subtext">for music producers</span>
                    </span>
                  )}
                </Transition>
              ) : null}
            </div>
          </div>
          {this.renderNavLinks()}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  loginModalOpen: state.loginModalOpen,
  user: state.users.authedUser,
  accountDrawerOpen: state.sideDrawer.accountDrawerOpen
});

export default connect(
  mapStateToProps,
  { openLoginModal, logoutUser, openAccountSideDrawer, closeAccountSideDrawer }
)(withRouter(Navbar));
