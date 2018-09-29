import React, { Component } from "react";
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
import Card from "./Card";
import NoResultsCard from "./NoResultsCard";
class CardBlockShop extends Component {
  renderCards = () => {
    return this.props.list
      ? this.props.list.map(card => (
          <Card
            key={card._id}
            location={"Shop"} 
            isAuth={this.props.users.authedUser.isAuth}
            audio={this.props.musicPlayer.audio}
            audioTrackData={this.props.audioTracks.fileData}
            playAudio={this.props.playAudio}
            pauseAudio={this.props.pauseAudio}
            resetAudio={this.props.resetAudio}
            setKitPlaying={this.props.setKitPlaying} 
            playing={this.props.musicPlayer.playing}
            openMusicPlayer={this.props.openMusicPlayer}
            closeMusicPlayer={this.props.closeMusicPlayer}
            setAudio={this.props.setAudio}
            kitPlaying={this.props.musicPlayer.kitPlaying}
            {...card}
            grid={this.props.grid}
            imageStyling={"shopImage"}
          />
        ))
      : null; 
  };

  render() {
    const { list } = this.props;
    return (
      <div id="card_block_shop" className="card_block_shop">
        <div className="container">
          <div className="cards_wrapper">
            {list ? list.length === 0 ? <NoResultsCard /> : null : null}
            {this.renderCards(list)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, musicPlayer, audioTracks }) => ({
  users,
  musicPlayer,
  audioTracks
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
)(CardBlockShop);
