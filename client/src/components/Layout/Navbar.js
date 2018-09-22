import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { TheLogo } from "../UI/Icon";
import { PopoverMenu } from "../UI/PopoverMenu";
import { Transition } from "react-spring";
import { connect } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { logoutUser } from "../../store/actions/userActions";

class Navbar extends Component {
  state = {
    scrollTop: true
  };
  componentDidMount() {
    window.addEventListener("scroll", this.onPageScroll);
  }

  logoutHandler = () => {
    this.props.logoutUser().then(res => {
      if (res.payload.success) {
        this.props.history.push("/");
      } else {
        console.log(res.payload);
      }
    });
  };

  renderNavLinks = () => {
    const { users } = this.props;
    if (users && !users.isAuth) {
      return (
        <div style={{ display: "flex" }}>
          <Link style={{ alignSelf: "flex-end" }} to="/">
            <Button disableRipple color="inherit">Home</Button>
          </Link>
          <Link style={{ alignSelf: "flex-end" }} to="/shop">
            <Button disableRipple  color="inherit">Shop</Button>
          </Link>
          <Link
            style={{ alignSelf: "flex-end", marginRight: "20px" }}
            to="/beatstore"
          >
            <Button disableRipple  color="inherit">Beat Store</Button>
          </Link>
          <Link className="home_register_btn" to="/register">
            <Button disableRipple variant="contained">
              Register
            </Button>
          </Link>
          <Button
            disableRipple={true}
            onClick={this.openLoginModal}
            className="login_btn"
            variant="outlined"
            color="inherit"
          >
            Log In
          </Button>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex" }}>
          <Link style={{ alignSelf: "flex-end" }} to="/">
            <Button disableRipple={true}  color="inherit">Home</Button>
          </Link>
          <Link style={{ alignSelf: "flex-end" }} to="/shop">
            <Button disableRipple={true}  color="inherit">Shop</Button>
          </Link>
          <Link style={{ alignSelf: "flex-end" }} to="/free_kits">
            <Button disableRipple={true}  color="inherit">Free Kits</Button>
          </Link>
          <Link
            style={{ alignSelf: "flex-end", marginRight: "20px" }}
            to="/beatstore"
          >
            <Button disableRipple={true}  color="inherit">Beat Store</Button>
          </Link>
          <div className="user_menu">
            <IconButton
              onMouseEnter={this.handleMenuOpen}
              onClick={this.handleMenuOpen}
              color="inherit"
            >
              <AccountCircle
                style={{
                  fontSize: 50,
                  border: "2px solid #4e4e50",
                  borderRadius: "50%"
                }}
              />
            </IconButton>
            <PopoverMenu>
              <div className="menu">
                <Link to="/user/dashboard">
                  <MenuItem
                    style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                    disableRipple={true}
                  >
                    My Account
                  </MenuItem>
                </Link>
                <Link to="/user/cart">
                  <div className="cart_link">
                    <span>{users ? users.cart.length : 0}</span>
                  </div>
                  <MenuItem
                    style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                    disableRipple={true}
                  >
                    My Cart
                  </MenuItem>
                </Link>
                <div onClick={() => this.logoutHandler()}>
                  <MenuItem
                    style={{ color: "#fff", fontFamily: "Cinzel, serif" }}
                    disableRipple={true}
                  >
                    Log Out
                  </MenuItem>
                </div>
              </div>
              <TheLogo
                right="-100px"
                bottom="10px"
                position="absolute"
                link={true}
                linkTo="/"
                width="400px"
                height="170px"
              />
            </PopoverMenu>
          </div>
        </div>
      );
    }
  };

  openLoginModal = () => {
    this.props.openModal();
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
            ? "rgb(17, 17, 17)"
            : "rgba(17, 17, 17, 0.8)",
          padding: this.state.scrollTop ? "10px 0px" : "0px 0px",
          borderBottom: "2px solid #ca3726",
          transition: "all 0.5s ease-out"
        }}
      >
        <Toolbar className="nav" style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header_logo">
              <TheLogo link={true} linkTo="/" width="100px" height="70px" />

              <Link to="/">
                <span className="header_text">Sparta Sounds</span>
              </Link>

              {scrollTop ? (
                <Transition
                  from={{ opacity: 0 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
                >
                  {styles => (
                    <span style={styles} className="header_second">
                      Colosseum for music producers
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
  users: state.users.authedUser
});

export default connect(
  mapStateToProps,
  { openModal, logoutUser }
)(withRouter(Navbar));
