import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import ShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PlayButton from "@material-ui/icons/PlayCircleOutline";
import PauseButton from "@material-ui/icons/PauseCircleOutline";
const imageComingSoon = require("../../../resources/Images/coming_soon.png");

class Card extends Component {
  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return imageComingSoon;
    }
  };

  renderPlayerControls = () => {
    if (this.props.demoTrack) {
      if (this.props.playing && this.props.name === this.props.kitPlaying) {
        return (
          <PauseButton
            onClick={this.pauseDemoTrack}
            className="card_pauseBtn"
          />
        );
      } else {
        return (
          <PlayButton onClick={this.playDemoTrack} className="card_playBtn" />
        );
      }
    }
  };

  playDemoTrack = () => {
    if (this.props.name !== this.props.kitPlaying && this.props.playing) {
      console.log("matched");
      this.props.resetAudio();
      this.pauseDemoTrack();
      this.props.audio.currentTime = 0;
      setTimeout(() => {
        this.props.playAudio();
        this.props.audio.play();
        this.props.audio.addEventListener("ended", () => {
          this.props.audio.currentTime = 0;
          this.pauseDemoTrack();
        });
      }, 1000);
    }
    let filename;
    let kitName;
    if (this.props.audioTrackData) {
      this.props.audioTrackData.map(track => {
        if (this.props.demoTrack === track._id) {
          kitName = this.props.name;
          filename = track.filename;
        }
        return {
          filename,
          kitName
        };
      });
      this.props.setKitPlaying(kitName);
      this.props.setAudio(filename);
      this.props.openMusicPlayer();
      this.props.playAudio();
      setTimeout(() => {
        this.props.audio.play();
        this.props.audio.addEventListener("ended", () => {
          this.props.audio.currentTime = 0;
          this.pauseDemoTrack();
        });
      }, 500);
    }
  };

  pauseDemoTrack = () => {
    this.props.pauseAudio();
    this.props.audio.pause();
  };

  render() {
    const props = this.props;

    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          id={props.imageStyling}
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
          }}
        >
          {this.renderPlayerControls()}
        </div>

        <div className="action_container">
          <div className="tags">
            <div className="name">{props.name}</div>
            <div className="genre">{props.genre.name}</div>
            <div className="price">${props.price}</div>
            <hr />
            {!props.isAuth ? (
              <Tooltip
                TransitionComponent={Zoom}
                title="Log in or Register to purchase"
                placement="top-end"
              >
                <Button
                  disableRipple
                  className="add_to_cart_btn_unauth"
                  variant="outlined"
                >
                  <ShoppingCartIcon className="cart_icon" />
                  Add To Cart
                </Button>
              </Tooltip>
            ) : (
              <Button
                disableRipple
                className="add_to_cart_btn"
                color="inherit"
                variant="outlined"
              >
                <ShoppingCartIcon className="cart_icon" />
                Add To Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
