import React from "react";
import AddToCartBtn from "../UI/Buttons/AddToCart";
import PlayButtonFilled from "@material-ui/icons/PlayCircleFilled";
import PauseIcon from "@material-ui/icons/Pause";
const soundWaveImg = require("../../resources/Images/SoundWave.png");
const imageComingSoon = require("../../resources/Images/coming_soon_detail.png");
const ProductDetailHead = ({
  kit,
  users,
  playDemoTrack,
  pauseDemoTrack,
  playing,
  route,
  addToCart
}) => {
  const loadProductImage = () => {
    if (kit.images.length > 0) {
      return <img src={kit.images[1].url} alt="mainImg" />;
    } else {
      return <img src={imageComingSoon} alt="mainImg" />;
    }
  }; 
  return (
    <div className="header_container">
      <div className="header_pic">{loadProductImage()}</div>
      <div className="details_header">
        <h1>{kit.name}</h1>
        <hr />
        <div className="details_badges">
          <p>
            <span>Genre: </span> {kit.genre.name}
          </p>
          <p>
            <span>Format: </span> {kit.category.name}
          </p>
          <p>
            <span>Label: </span>
            Sparta Sounds
          </p>
          <p>
            <span>Price: </span>
            {kit.price === 0 ? "FREE" : `$${kit.price}`}
          </p>
        </div>
        <div className="wave_container">
          <img src={soundWaveImg} alt="" />
        </div>
        <div className="btn_container">
          {kit.demoTrack &&
            (!playing ? (
              <div onClick={() => playDemoTrack()} className="playdemo_btn">
                <span>
                  <PlayButtonFilled />
                </span>
                Play Demo
              </div>
            ) : (
              <div onClick={() => pauseDemoTrack()} className="playdemo_btn">
                <PauseIcon />
              </div>
            ))}
          <AddToCartBtn
            addToCart={addToCart}
            user={users.authedUser}
            route={route}
            isAuth={users.authedUser.isAuth}
            kitId={kit._id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHead;
