import React, { Component } from "react";
import FeaturedKit from "../../../resources/Images/spartaSamplePackNewLarge.png";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { openSampleModal } from "../../../store/actions/modalActions";
import { connect } from "react-redux";
class StaticHero extends Component {
  state = {
    stripes: [
      {
        background: "#0e1d24",
        left: -50,
        rotate: 25,
        top: -260,
        delay: 0
      },
      {
        background: "#f3b169",
        left: 190,
        rotate: 25,
        top: -397,
        delay: 200
      },
      {
        background: "#4e4e50",
        left: 430,
        rotate: 25,
        top: -498,
        delay: 400
      }
    ],
    screenWidth: window.innerWidth
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateState);
  }

  updateState = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  openSampleModal = () => {
    this.props.dispatch(openSampleModal());
  };
  render() {
    const renderStripes = () =>
      this.state.stripes.map((stripe, i) => (
        <div
          key={i}
          style={{
            background: stripe.background,
            transform: `rotate(${stripe.rotate}deg) translate(${
              stripe.left
            }px, ${stripe.top}px)`
          }}
          className="stripe"
        />
      ));
    return (
      <div className="featured_stripes">
        {renderStripes()}
        <div
          style={{
            background: `url(${FeaturedKit})`,
            transform:
              this.state.screenWidth > 556
                ? `translate(110px, 120px)`
                : `translate(-130px, 120px)`,
            transition: "all 0.5s ease-out"
          }}
          className="featured_kit"
        />
        <div>
          <h3 className="mobile_featured_header">
            Colosseum For Music Producers
          </h3>
        </div>
        <hr />
        <div
          style={{
            transform:
              this.state.screenWidth > 556
                ? `translate(250px, 520px)`
                : `translate(-10px, 510px)`,
            transition: "all 0.5s ease-out"
          }}
          className="featured_button"
        >
          {!this.props.navSideDrawerOpen && (
            <Button
              onClick={this.openSampleModal}
              style={{
                background: "#1a1a1d",

                color: "#fff",
                padding: "10px 10px",
                width: "300px"
              }}
              className="landing_btn"
              size="large"
              variant="contained"
            >
              <CloudDownloadIcon style={{ margin: "0px 10px" }} />
              Free Download
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sideDrawer }) => ({
  navSideDrawerOpen: sideDrawer.navDrawerOpen
});

export default connect(mapStateToProps)(StaticHero);
