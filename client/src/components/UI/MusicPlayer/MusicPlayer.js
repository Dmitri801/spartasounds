import React, { Component } from "react";
import ProgressBar from "./ProgressBar";
import Filler from "./Filler";
import SliderThumb from "./SliderThumb";
import RewindIcon from "@material-ui/icons/FastRewind";
import ForwardIcon from "@material-ui/icons/FastForward";
import PlayIcon from "@material-ui/icons/PlayCircleOutline";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import {
  openMusicPlayer,
  playAudio,
  resetMusicPlayer,
  pauseAudio
} from "../../../store/actions/musicPlayerActions";
import $ from "jquery";
class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: "0:00",
      trackDuration: "NaN:NaN",
      progressBar: 0
    };
    this.activateControls = this.activateControls.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      this.activateControls();
    }, 500);
  }

  componentWillUnmount() {
    this.stopPlayer();
    this.props.resetMusicPlayer();
  }

  stopPlayer = () => {
    if (this.props.musicPlayer.audio) {
      this.props.pauseAudio();
      this.props.closeMusicPlayer();
      this.props.musicPlayer.audio.pause();
      this.props.musicPlayer.audio.currentTime = 0;
    }
  };

  activateControls() {
    if (this.props.musicPlayer.audio) {
      const { audio } = this.props.musicPlayer;
      //  Get seconds and minutes
      // eslint-disable-next-line
      let s = parseInt(audio.currentTime % 60);

      // eslint-disable-next-line
      let m = parseInt(audio.currentTime / 60) % 60;
      // Add 0 if less than 10
      if (s < 10) {
        s = "0" + s;
      }
      this.setState({ currentTime: `${m}:${s}` });
      let value = 0;
      if (audio.currentTime > 0) {
        value = (100 / audio.duration) * audio.currentTime;
      }
      this.setState({ progressBar: value });
      // Get Minutes and seconds for total duration
      let time = audio.duration;

      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      const duration = `${minutes}:${Math.floor(seconds)}`;

      this.setState({
        trackDuration: duration
      });
      $(".progress_bar").mouseup(function(e) {
        var leftOffset = e.pageX - $(this).offset().left;
        var songPercents = leftOffset / $(".progress_bar").width();
        audio.currentTime = songPercents * audio.duration;
      });
      let isDragging = false;
      $(".sliderThumb")
        .mousedown(function(e) {
          isDragging = false;
        })
        .mousemove(function(e) {
          isDragging = true;
        })
        .mouseup(function(e) {
          let wasDragging = isDragging;
          isDragging = false;
          if (!wasDragging) {
            let leftOffset = e.pageX - $(this).offset().left;
            let songPercents = leftOffset / $(".progress_bar").width();
            audio.currentTime = songPercents * audio.duration;
          }
        });
    }
  }

  playTrack = () => {
    this.props.openMusicPlayer();
    this.props.playAudio();
    this.props.musicPlayer.audio.play();
    this.props.musicPlayer.audio.addEventListener("ended", () => {
      this.props.musicPlayer.audio.currentTime = 0;
      this.pauseTrack();
    });
  };

  pauseTrack = () => {
    this.props.pauseAudio();
    this.props.musicPlayer.audio.pause();
  };
  render() {
    const { audio, playing, kitPlaying, playerOpen } = this.props.musicPlayer;
    const { currentTime, trackDuration, progressBar } = this.state;
    let renderPlayer;
    if (audio) {
      renderPlayer = (
        <div
          style={{
            transform: `translateY(${!playerOpen ? 140 : 0}px)`,
            position: "fixed",
            bottom: 0
          }}
          className="the_player"
        >
          {" "}
          {this.state.trackDuration !== "NaN:NaN" && (
            <div className="controls">
              <RewindIcon
                onClick={() => (audio.currentTime -= 10.0)}
                className="rewind"
              />
              {!playing ? (
                <PlayIcon onClick={this.playTrack} className="play" />
              ) : (
                <PauseIcon
                  onClick={() => this.pauseTrack()}
                  className="pause"
                />
              )}
              <ForwardIcon
                onClick={() => (audio.currentTime += 10.0)}
                className="forward"
              />
            </div>
          )}
          {this.state.trackDuration !== "NaN:NaN" && (
            <div className="playerDisplay">
              <span className="currentTime">{currentTime}</span>
              <span className="trackName">{kitPlaying} - Demo</span>
              <ProgressBar>
                <SliderThumb progressBarWidth={progressBar} />
                <Filler progressBarWidth={progressBar} />
              </ProgressBar>
              <span className="duration">
                {trackDuration === "NaN:NaN" ? "Loading.." : trackDuration}
              </span>
            </div>
          )}
          {this.state.trackDuration === "NaN:NaN" && (
            <Spinner specialClassName="musicplayer_spinner" />
          )}
          <span onClick={this.stopPlayer} className="close_icon">
            X
          </span>
        </div>
      );
    }
    return <div>{renderPlayer}</div>;
  }
}

const mapStateToProps = ({ musicPlayer }) => ({
  musicPlayer
});

export default connect(
  mapStateToProps,
  { openMusicPlayer, playAudio, resetMusicPlayer, pauseAudio }
)(MusicPlayer);
