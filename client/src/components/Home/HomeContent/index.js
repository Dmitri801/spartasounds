import React, { Component } from "react";
import HomeSignup from "./HomeSignup";
import MusicPlayer from "../../UI/MusicPlayer/MusicPlayer";
import {
  openMusicPlayer,
  closeMusicPlayer,
  setAudio,
  setKitPlaying,
  playAudio,
  resetAudio,
  pauseAudio
} from "../../../store/actions/musicPlayerActions";
import { connect } from "react-redux";
import CardBlockFeatured from "../../UI/Cards/Card_Block_Featured";
class HomeContent extends Component {
  render() {
    return (
      <div>
        <CardBlockFeatured
          title="Best Selling Kits"
          list={this.props.products.bySold}
          audio={this.props.musicPlayer.audio}
          isAuth={this.props.users.authedUser.isAuth}
          audioTracks={this.props.audioTracks.fileData}
          resetAudio={this.props.resetAudio}
          setAudio={this.props.setAudio}
          playAudio={this.props.playAudio}
          pauseAudio={this.props.pauseAudio}
          playing={this.props.musicPlayer.playing}
          kitPlaying={this.props.musicPlayer.kitPlaying}
          setKitPlaying={this.props.setKitPlaying}
          openMusicPlayer={this.props.openMusicPlayer}
        />
        <HomeSignup />
        <CardBlockFeatured
          title="New Arrivals"
          list={this.props.products.byArrival}
          isAuth={this.props.users.authedUser.isAuth}
          audio={this.props.musicPlayer.audio}
          setAudio={this.props.setAudio}
          audioTracks={this.props.audioTracks.fileData}
          resetAudio={this.props.resetAudio}
          playAudio={this.props.playAudio}
          pauseAudio={this.props.pauseAudio}
          playing={this.props.musicPlayer.playing}
          setKitPlaying={this.props.setKitPlaying}
          kitPlaying={this.props.musicPlayer.kitPlaying}
          openMusicPlayer={this.props.openMusicPlayer}
        />
        <MusicPlayer
          closeMusicPlayer={this.props.closeMusicPlayer}
         
        />
      </div>
    );
  }
}

const mapStateToProps = ({ products, users, musicPlayer, audioTracks }) => ({
  users,
  products,
  audioTracks,
  musicPlayer
});

export default connect(
  mapStateToProps,
  {
    openMusicPlayer,
    closeMusicPlayer,
    setAudio,
    setKitPlaying,
    playAudio,
    resetAudio,
    pauseAudio
  }
)(HomeContent);
