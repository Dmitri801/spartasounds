import React from "react";
import Card from "./Card";

const CardBlockFeatured = props => {
  const renderCards = () => {
    return props.list
      ? props.list.map((card, index) => {
          return (
            <div key={index}>
              <Card
                isAuth={props.isAuth}
                audio={props.audio}
                audioTrackData={props.audioTracks}
                playAudio={props.playAudio}
                pauseAudio={props.pauseAudio}
                resetAudio={props.resetAudio}
                setKitPlaying={props.setKitPlaying}
                playing={props.playing}
                openMusicPlayer={props.openMusicPlayer}
                setAudio={props.setAudio}
                kitPlaying={props.kitPlaying}
                {...card}
              />
            </div>
          );
        })
      : null;
  };

  return (
    <div className="card_block_featured">
      <div className="container">
        {props.title ? <div className="title">{props.title}</div> : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap"
          }}
        >
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlockFeatured;
