import React from "react";
import Button from "@material-ui/core/Button";
import FlatBtn from "../../UI/Buttons/FlatBtn";
import { Link } from "react-router-dom";
const SideDrawer = props => {
  const renderContent = () => {
    let sideDrawerClasses = ["sideDrawer"];
    if (props.open) {
      sideDrawerClasses = ["sideDrawer", "open"];
    }
    if (props.user) {
      if (!props.user.isAuth) {
        return (
          <div className={sideDrawerClasses.join(" ")}>
            {props.open && (
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

                <Link
                  onClick={props.closeSideDrawer}
                  className="home_register_btn"
                  to="/register"
                >
                  <FlatBtn click={props.closeSideDrawer} title="Register" />
                </Link>
                <Link
                  onClick={props.closeSideDrawer}
                  to="/login"
                  className="login_btn"
                >
                  <Button
                    disableRipple={true}
                    className="login_btn"
                    variant="outlined"
                    color="inherit"
                  >
                    Log In
                  </Button>
                </Link>
              </ul>
            )}
          </div>
        );
      } else {
        return (
          <div className={sideDrawerClasses.join(" ")}>
            {props.open && (
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
            )}
          </div>
        );
      }
    }
  };
  return <div>{renderContent()}</div>;
};

export default SideDrawer;
