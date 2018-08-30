import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate"; 
import FeaturedKit from '../../../resources/Images/LandingBox.png'
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
class Text extends Component {
  animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity, rotate }) => {
        return (
          <div
            style={{
              opacity,
              transform: `translate(260px, 170px) rotateY(${rotate}deg)`
            }}
            className="featured_number"
          >
            17
          </div>
        );
      }}
    </Animate>
  );

  animateFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 450
      }}
      enter={{
        opacity: [1],
        x: [273],
        y: [450],
        timing: { duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            style={{
              opacity,
              transform: `translate(${x}px, ${y}px)`
            }}
            className="featured_first"
          >
            Free
          </div>
        );
      }}
    </Animate>
  );

  animateSecond = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 586
      }}
      enter={{
        opacity: [1],
        x: [273],
        y: [586],
        timing: { delay: 400, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            style={{
              opacity,
              
              transform: `translate(${x}px, ${y}px)`
            }}
            className="featured_second"
          >
           Sounds
          </div>
        );
      }}
    </Animate>
  );

  animateKit = () => (
    <Animate
      show={true}
      start={{
        opacity: 0
      }}
      enter={{
        opacity: [1],

        timing: { delay: 800, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity }) => {
        return (
          <div
            style={{
              opacity,
              background: `url(${FeaturedKit})`,
              transform: `translate(410px, 120px)`,
              
            }}
            className="featured_kit"
          >
          
          </div>
        );
      }}
    </Animate>
  );

  animateButton = () => (
    <Animate
      show={true}
      start={{
        opacity: 0
      }}
      enter={{
        opacity: [1],

        timing: { delay: 1500, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity }) => {
        return (
          <div
            style={{
              opacity,
              transform: `translate(550px, 520px)`,
            }}
            className="featured_button"
          >
          <Button style={{
            background: '#0e1d24',
            color: '#fff',
            padding: '10px 10px',
            width: '300px'
          }} 
          className="landing_btn"
          size="large"
          variant="contained">
          <CloudDownloadIcon style={{margin: '0px 10px'}} />
          Download Now</Button>
          </div>
        );
      }}
    </Animate>
  )
  render() {
    return (
      <div className="featured_text">
      {this.animateKit()}
        {this.animateNumber()}
        {this.animateFirst()}
        {this.animateSecond()}
        {this.animateButton()}
        
      </div>
    );
  }
}

export default Text;