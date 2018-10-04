import React, { Component } from "react";
import Stripes from "./Stripes";
import TextAndModal from "./TextAndModal";
import StaticHero from "./StaticHero";

class Featured extends Component {
  state = {
    screenSize: window.innerWidth
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateState);
  }

  updateState = () => {
    this.setState({ screenSize: window.innerWidth });
  };

  renderFeaturedComponent = () => {
    const { screenSize } = this.state;
    if (screenSize < 856) {
      return <StaticHero />;
    } else {
      return (
        <div>
          <Stripes />
          <TextAndModal />
        </div>
      );
    }
  };
  render() {
    return (
      <div className="featured_wrapper">{this.renderFeaturedComponent()}</div>
    );
  }
}

export default Featured;
