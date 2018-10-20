import React from "react";
import Button from "@material-ui/core/Button";
import FlatBtn from "../../UI/Buttons/FlatBtn";
import { Link } from "react-router-dom";
const SideDrawer = props => {
  const onLoginBtnClick = () => {
    props.closeSideDrawer();
    setTimeout(() => {
      props.openLoginModal();
    }, 500);
  };
  const renderContent = () => {
    let sideDrawerClasses = ["sideDrawer"];
    if (props.open) {
      sideDrawerClasses = ["sideDrawer", "open"];
    }
    if (props.authedUser) {
      if (!props.authedUser.isAuth) {
        return (
          <div className={sideDrawerClasses.join(" ")}>
            <ul>
              <li onClick={props.closeSideDrawer}>
                <Link to="/">Home</Link>
              </li>
              <hr />
              <li onClick={props.closeSideDrawer}>
                <Link to="/shop">Shop</Link>
              </li>
              <hr />
              <li onClick={props.closeSideDrawer}>
                <Link to="/beatstore">Beat Store</Link>
              </li>
              <hr />

              <Link className="home_register_btn" to="/register">
                <FlatBtn click={props.closeSideDrawer} title="Register" />
              </Link>
              <Button
                disableRipple={true}
                onClick={() => onLoginBtnClick()}
                className="login_btn"
                variant="outlined"
                color="inherit"
              >
                Log In
              </Button>
            </ul>
          </div>
        );
      } else {
        return (
          <div className={sideDrawerClasses.join(" ")}>
            <ul>
              <li onClick={props.closeSideDrawer}>
                <Link to="/">Home</Link>
              </li>
              <hr />
              <li onClick={props.closeSideDrawer}>
                <Link to="/shop">Shop</Link>
              </li>
              <hr />
              <li onClick={props.closeSideDrawer}>
                <Link to="/beatstore">Beat Store</Link>
              </li>
              <hr />
            </ul>
          </div>
        );
      }
    }
  };
  return <div>{renderContent()}</div>;
};

export default SideDrawer;
