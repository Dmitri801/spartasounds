import React, { Component } from "react";
import PlayButton from "@material-ui/icons/PlayCircleOutline";
import PauseButton from "@material-ui/icons/PauseCircleOutline";
import ViewDetailsBtn from "../Buttons/ViewDetails";
import { addToCart } from "../../../store/actions/userActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
    if (
      this.props.audioTrackData &&
      this.props.kitPlaying !== this.props.name
    ) {
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
      this.props.playAudio();
      setTimeout(() => {
        this.props.openMusicPlayer();
        this.props.audio.play();
        this.props.audio.addEventListener("ended", () => {
          this.props.audio.currentTime = 0;
          this.pauseDemoTrack();
        });
      }, 30);
    } else {
      this.props.audio.play();
      this.props.playAudio();
      this.props.openMusicPlayer();
      this.props.audio.addEventListener("ended", () => {
        this.props.audio.currentTime = 0;
        this.pauseDemoTrack();
      });
    }
  };

  pauseDemoTrack = () => {
    this.props.pauseAudio();
    this.props.audio.pause();
  };

  onViewDetailsClick = id => {
    this.props.history.push(`/thedetails/${id}`);
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
        {props.location === "Shop" ? <hr /> : null}
        <div className="action_container">
          <div className="tags">
            <div className="name">{props.name}</div>
            <div className="genre">{props.genre.name}</div>

            <div className="price">
              {props.price === 0 ? "FREE" : `$${props.price}`}
            </div>

            <ViewDetailsBtn
              viewDetailsClick={() => this.onViewDetailsClick(props._id)}
              runAction={() => {
                props.isAuth
                  ? this.props.dispatch(addToCart(props._id))
                  : console.log("Login First");
              }}
              isAuth={props.isAuth}
              title="View Details"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(withRouter(Card));
