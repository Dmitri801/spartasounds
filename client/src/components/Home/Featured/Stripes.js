import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";
class Stripes extends Component {
  state = {
    stripes: [
      {
        background: "#b31314",
        left: 120,
        rotate: 25,
        top: -260,
        delay: 0
      },
      {
        background: "#f3b169",
        left: 360,
        rotate: 25,
        top: -397,
        delay: 200
      },
      {
        background: "#ca3726",
        left: 600,
        rotate: 25,
        top: -498,
        delay: 400
      }
    ]
  };
  showStripes = () => {
    const { stripes } = this.state;
    return stripes.map((stripe, index) => (
      <Animate
        key={index}
        show={true}
        start={{
          background: "#fff",
          opacity: 0,
          left: 0,
          rotate: 0,
          top: 0
        }}
        enter={{
          background: [stripe.background],
          opacity: [1],
          left: [stripe.left],
          rotate: [stripe.rotate],
          top: [stripe.top],
          timing: { delay: stripe.delay, duration: 400, ease: easePolyOut }
        }}
      >
        {({ background, opacity, left, rotate, top }) => {
          return (
            <div
              style={{
                background,
                opacity,
                transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
              }}
              className="stripe"
            />
          );
        }}
      </Animate>
    ));
  };
  render() {
    return <div className="featured_stripes">{this.showStripes()}</div>;
  }
}

export default Stripes;
