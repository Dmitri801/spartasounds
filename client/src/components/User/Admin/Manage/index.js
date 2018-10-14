import React, { Component } from "react";
import UserLayout from "../..";
import Spinner from "../../../UI/Spinner";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import ManageGenre from "./ManageGenre";
import ManageCategory from "./ManageCategory";
import DestroyProduct from "./DestroyProduct";
const userDashboardBackground = require("../../../../resources/Images/user-dashboard-background.jpeg");

const customStyles = theme => ({
  containedPrimary: {
    backgroundColor: "#0e1d24",
    "&:hover": {
      backgroundColor: "#0e1d22"
    }
  },
  containedSecondary: {
    backgroundColor: "#ca3726",
    "&:hover": {
      backgroundColor: "#ca3710"
    }
  },
  outlinedSecondary: {
    color: "#b31314",
    borderColor: "#b31314",
    "&:hover": {
      color: "#b31314",
      borderColor: "#b31314",
      backgroundColor: "rgba(179,19,20, 0.2)"
    }
  }
});

const CustomButton = withStyles(customStyles)(Button);

class Manage extends Component {
  state = {
    componentToRender: "index"
  };
  renderManageComponent = () => {
    const { componentToRender } = this.state;
    switch (componentToRender) {
      case "index":
        return (
          <div className="form_container">
            <div className="manage_card">
              <h2>Manage Products</h2>
              <hr />
              <div className="manage_btn_container">
                <CustomButton
                  onClick={() => this.setState({ componentToRender: "Genre" })}
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Genre
                </CustomButton>
                <CustomButton
                  onClick={() =>
                    this.setState({ componentToRender: "Category" })
                  }
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Category
                </CustomButton>
                <CustomButton
                  onClick={() =>
                    this.setState({ componentToRender: "Destroy" })
                  }
                  color="secondary"
                  variant="outlined"
                  size="large"
                >
                  Destroy
                </CustomButton>
              </div>
            </div>
          </div>
        );
      case "Genre":
        return <ManageGenre back={this.backToIndex} />;
      case "Category":
        return <ManageCategory back={this.backToIndex} />;
      case "Destroy":
        return <DestroyProduct back={this.backToIndex} />;
      default:
        return (
          <div>
            <Spinner specialClassName="manage_spinner" />
          </div>
        );
    }
  };

  backToIndex = () => {
    this.setState({
      componentToRender: "index"
    });
  };
  render() {
    return (
      <div style={{ height: "1000px" }}>
        <div
          style={{
            background: `url(${userDashboardBackground})`,
            backgroundAttachment: "fixed",
            position: "absolute",
            backgroundSize: "cover",
            height: "1000px",
            width: "100%",
            zIndex: "1",
            opacity: "0.18"
          }}
          className="bck_overlay"
        />
        <UserLayout>{this.renderManageComponent()}</UserLayout>
      </div>
    );
  }
}

export default Manage;
