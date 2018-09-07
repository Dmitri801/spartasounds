import React from "react";
import Featured from "./Featured";
import HomeContent from "./HomeContent";
const backgroundImage = require("../../resources/Images/sparta-home-background.jpeg");
const Home = () => {
  return (
    <div className="bck_dark">
      <div
        style={{
          background: `url(${backgroundImage})`,
          backgroundAttachment: "fixed",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.2"
        }}
        className="bck_overlay"
      />
      <Featured />
      <HomeContent />
    </div>
  );
};

export default Home;
